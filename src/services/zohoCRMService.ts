/**
 * ZOHO CRM Integration Service
 * Complete implementation ready for client credentials
 */

export interface ZohoConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  domain: 'com' | 'eu' | 'in' | 'com.au'; // ZOHO data center
  sandbox: boolean;
}

export interface ZohoContact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  leadSource: 'Website' | 'Social Media' | 'Referral' | 'Other';
  tags: string[];
  customFields?: Record<string, any>;
}

export interface ZohoBooking {
  id?: string;
  contactId: string;
  subject: string;
  artistName: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  status: 'New' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  amount?: number;
  currency: string;
  notes?: string;
  customFields?: Record<string, any>;
}

export interface ZohoResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

/**
 * ZOHO CRM API Client
 */
export class ZohoCRMService {
  private config: ZohoConfig;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: ZohoConfig) {
    this.config = config;
  }

  /**
   * Get API base URL based on data center
   */
  private getApiUrl(): string {
    const domain = this.config.domain;
    const subdomain = this.config.sandbox ? 'sandbox' : 'www';
    return `https://${subdomain}.zohoapis.${domain}/crm/v2`;
  }

  /**
   * Get OAuth URL for authorization
   */
  public getAuthUrl(redirectUri: string, scopes: string[] = ['ZohoCRM.modules.ALL']): string {
    const domain = this.config.domain;
    const baseUrl = `https://accounts.zoho.${domain}/oauth/v2/auth`;
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.clientId,
      scope: scopes.join(','),
      redirect_uri: redirectUri,
      access_type: 'offline',
    });
    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Get access token using refresh token
   */
  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const domain = this.config.domain;
    const tokenUrl = `https://accounts.zoho.${domain}/oauth/v2/token`;

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: this.config.refreshToken,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error(`ZOHO auth failed: ${response.statusText}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + data.expires_in * 1000 - 60000; // 1 minute buffer

    return this.accessToken!;
  }

  /**
   * Make authenticated API request
   */
  private async apiRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
  ): Promise<ZohoResponse<T>> {
    try {
      const token = await this.getAccessToken();
      const url = `${this.getApiUrl()}${endpoint}`;

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: responseData.message || 'ZOHO API error',
          code: responseData.code,
        };
      }

      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * Create or update contact
   */
  public async upsertContact(contact: ZohoContact): Promise<ZohoResponse<any>> {
    const contactData = {
      First_Name: contact.firstName,
      Last_Name: contact.lastName,
      Email: contact.email,
      Phone: contact.phone,
      Lead_Source: contact.leadSource,
      Tag: contact.tags,
      ...contact.customFields,
    };

    // Check if contact exists by email
    const existingContact = await this.findContactByEmail(contact.email);

    if (existingContact.success && existingContact.data?.data?.length > 0) {
      // Update existing contact
      const contactId = existingContact.data.data[0].id;
      return await this.apiRequest(`/Contacts/${contactId}`, 'PUT', { data: [contactData] });
    } else {
      // Create new contact
      return await this.apiRequest('/Contacts', 'POST', { data: [contactData] });
    }
  }

  /**
   * Find contact by email
   */
  public async findContactByEmail(email: string): Promise<ZohoResponse<any>> {
    return await this.apiRequest(
      `/Contacts/search?criteria=Email:equals:${encodeURIComponent(email)}`,
    );
  }

  /**
   * Create booking (as Deal in ZOHO)
   */
  public async createBooking(booking: ZohoBooking): Promise<ZohoResponse<any>> {
    const dealData = {
      Deal_Name: booking.subject,
      Stage: 'New Booking',
      Contact_Name: booking.contactId,
      Artist_Name: booking.artistName,
      Service_Type: booking.serviceName,
      Preferred_Date: booking.preferredDate,
      Preferred_Time: booking.preferredTime,
      Amount: booking.amount,
      Currency: booking.currency,
      Description: booking.notes,
      Booking_Status: booking.status,
      ...booking.customFields,
    };

    return await this.apiRequest('/Deals', 'POST', { data: [dealData] });
  }

  /**
   * Update booking status
   */
  public async updateBookingStatus(
    bookingId: string,
    status: ZohoBooking['status'],
    notes?: string,
  ): Promise<ZohoResponse<any>> {
    const updateData: any = {
      Booking_Status: status,
      Stage: this.mapStatusToStage(status),
    };

    if (notes) {
      updateData.Description = notes;
    }

    return await this.apiRequest(`/Deals/${bookingId}`, 'PUT', { data: [updateData] });
  }

  /**
   * Map booking status to ZOHO deal stage
   */
  private mapStatusToStage(status: ZohoBooking['status']): string {
    const stageMap = {
      New: 'New Booking',
      Confirmed: 'Appointment Scheduled',
      'In Progress': 'Service in Progress',
      Completed: 'Closed Won',
      Cancelled: 'Closed Lost',
    };
    return stageMap[status] || 'New Booking';
  }

  /**
   * Get booking by ID
   */
  public async getBooking(bookingId: string): Promise<ZohoResponse<any>> {
    return await this.apiRequest(`/Deals/${bookingId}`);
  }

  /**
   * List bookings with filters
   */
  public async listBookings(filters?: {
    status?: ZohoBooking['status'];
    artist?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ZohoResponse<any>> {
    let endpoint = '/Deals';

    if (filters) {
      const criteria: string[] = [];

      if (filters.status) {
        criteria.push(`Booking_Status:equals:${filters.status}`);
      }

      if (filters.artist) {
        criteria.push(`Artist_Name:equals:${encodeURIComponent(filters.artist)}`);
      }

      if (filters.dateFrom) {
        criteria.push(`Preferred_Date:greater_equal:${filters.dateFrom}`);
      }

      if (filters.dateTo) {
        criteria.push(`Preferred_Date:less_equal:${filters.dateTo}`);
      }

      if (criteria.length > 0) {
        endpoint += `?criteria=${criteria.join(' and ')}`;
      }
    }

    return await this.apiRequest(endpoint);
  }

  /**
   * Add note to booking
   */
  public async addBookingNote(
    bookingId: string,
    note: string,
    noteOwner?: string,
  ): Promise<ZohoResponse<any>> {
    const noteData: any = {
      Note_Title: 'Booking Update',
      Note_Content: note,
      Parent_Id: bookingId,
      se_module: 'Deals',
    };

    if (noteOwner) {
      noteData.Note_Owner = noteOwner;
    }

    return await this.apiRequest('/Notes', 'POST', { data: [noteData] });
  }

  /**
   * Create task/reminder for booking
   */
  public async createBookingTask(
    bookingId: string,
    subject: string,
    dueDate: string,
    priority: 'High' | 'Normal' | 'Low' = 'Normal',
  ): Promise<ZohoResponse<any>> {
    const taskData = {
      Subject: subject,
      Due_Date: dueDate,
      Priority: priority,
      Status: 'Not Started',
      What_Id: bookingId,
      se_module: 'Deals',
    };

    return await this.apiRequest('/Tasks', 'POST', { data: [taskData] });
  }

  /**
   * Test connection and permissions
   */
  public async testConnection(): Promise<ZohoResponse<any>> {
    return await this.apiRequest('/org');
  }
}

/**
 * Initialize ZOHO CRM service
 */
export const initializeZohoCRM = (): ZohoCRMService | null => {
  const env = import.meta.env;

  const config: ZohoConfig = {
    clientId: env.VITE_ZOHO_CLIENT_ID || '',
    clientSecret: env.VITE_ZOHO_CLIENT_SECRET || '',
    refreshToken: env.VITE_ZOHO_REFRESH_TOKEN || '',
    domain: (env.VITE_ZOHO_DOMAIN as ZohoConfig['domain']) || 'eu',
    sandbox: env.VITE_ZOHO_SANDBOX === 'true',
  };

  // Validate configuration
  if (!config.clientId || !config.clientSecret || !config.refreshToken) {
    console.warn('ZOHO CRM configuration incomplete');
    return null;
  }

  return new ZohoCRMService(config);
};

/**
 * Helper function to create contact from booking form
 */
export const createContactFromBooking = (bookingData: any): ZohoContact => {
  return {
    firstName: bookingData.firstName || bookingData.name?.split(' ')[0] || 'Unknown',
    lastName: bookingData.lastName || bookingData.name?.split(' ').slice(1).join(' ') || 'Customer',
    email: bookingData.email,
    phone: bookingData.phone,
    leadSource: 'Website',
    tags: ['Website Lead', 'Tattoo Interest'],
    customFields: {
      Preferred_Service: bookingData.serviceName,
      Preferred_Artist: bookingData.artistName,
      Initial_Message: bookingData.message || bookingData.details,
    },
  };
};

/**
 * Helper function to create booking from form data
 */
export const createBookingFromForm = (bookingData: any, contactId: string): ZohoBooking => {
  return {
    contactId,
    subject: `Tattoo Booking - ${bookingData.serviceName}`,
    artistName: bookingData.artistName,
    serviceName: bookingData.serviceName,
    preferredDate: bookingData.preferredDate,
    preferredTime: bookingData.preferredTime,
    status: 'New',
    currency: 'EUR',
    notes: bookingData.message || bookingData.details,
    customFields: {
      Tattoo_Size: bookingData.tattooSize,
      Body_Area: bookingData.bodyArea,
      Design_Style: bookingData.designStyle,
      Budget_Range: bookingData.budgetRange,
    },
  };
};
