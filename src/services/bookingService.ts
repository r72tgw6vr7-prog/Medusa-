import { v4 as uuidv4 } from 'uuid';

const _BOOKING_API_URL =
  'https://script.google.com/macros/s/AKfycbxV1TCVR-lZK4HjHA5aTQxkhUPVkDb76TUX95SV_AgSs-pIJlpcCscy20DbGvno_cjoiw/exec';

export interface BookingRequest {
  serviceId: string;
  specificService?: string; // The specific service selected (e.g., "ohr", "ohrlochzauberer")
  artistId?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  message?: string;
  projectDetails?: string;
  paymentMethod?: 'cash' | 'card' | 'bank_transfer';
  gdprConsent: boolean;
}

export interface BookingResponse {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingNumber: string;
  createdAt: string;
}

const formatDateToGerman = (value: string): string => {
  if (!value) return '';

  if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return value;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [yyyy, mm, dd] = value.split('-');
    return `${dd}.${mm}.${yyyy}`;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  const dd = String(parsed.getDate()).padStart(2, '0');
  const mm = String(parsed.getMonth() + 1).padStart(2, '0');
  const yyyy = String(parsed.getFullYear());
  return `${dd}.${mm}.${yyyy}`;
};

const mapServiceLabel = (serviceId: string): string => {
  if (serviceId === 'piercing') return 'Piercing';
  return 'Tattoo Artistry';
};

// Map specific service IDs to human-readable German labels
const mapSpecificServiceLabel = (specificService?: string): string => {
  if (!specificService) return '';

  const labels: Record<string, string> = {
    // Piercing services
    'ohr': 'Ohr-Piercing',
    'mund': 'Mund-Piercing',
    'gesicht': 'Gesicht-Piercing',
    'koerper': 'Körper-Piercing',
    'intim': 'Intim-Piercing',
    'ohrlochzauberer': 'Ohrlochzauberer (Kinder)',
    // Tattoo services
    'small': 'Klein (bis 5cm)',
    'medium': 'Mittel (5-15cm)',
    'large': 'Groß (15cm+)',
    'coverup': 'Cover-Up',
    'custom': 'Custom Design',
  };

  return labels[specificService] || specificService;
};

const mapPaymentLabel = (paymentMethod?: BookingRequest['paymentMethod']): string => {
  if (paymentMethod === 'cash') return 'Bar';
  if (paymentMethod === 'card') return 'Karte';
  if (paymentMethod === 'bank_transfer') return 'Überweisung';
  return '';
};

export const submitBooking = async (data: BookingRequest): Promise<BookingResponse> => {
  const formData = new FormData();
  formData.append('access_key', 'f1b55e90-ca0c-4b1d-b2e4-1d1c9b35a252');
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  const specificLabel = mapSpecificServiceLabel(data.specificService);
  const serviceDisplay = specificLabel
    ? `${mapServiceLabel(data.serviceId)} → ${specificLabel}`
    : mapServiceLabel(data.serviceId);

  formData.append('service', serviceDisplay);
  formData.append('date', formatDateToGerman(data.date));
  formData.append('details', data.projectDetails || '');
  formData.append('payment', mapPaymentLabel(data.paymentMethod));

  // MAGIC EMAIL with 1-click calendar buttons
  formData.append(
    'subject',
    `🆕 New Booking: ${data.name} - ${serviceDisplay} - ${formatDateToGerman(data.date)}`,
  );
  formData.append(
    'message',
    `
🎯 NEW BOOKING REQUEST - MEDUSA TATTOO

👤 Name: ${data.name}
📧 Email: ${data.email}
📞 Phone: ${data.phone}
✨ Service: ${serviceDisplay}
📅 Date: ${formatDateToGerman(data.date)}
💳 Payment: ${mapPaymentLabel(data.paymentMethod) || 'Not specified'}
📝 Details: ${data.projectDetails || 'None'}

━━━━━━━━━━━━━━━━━━━
🔥 QUICK ADD TO CALENDAR (ONE CLICK):
━━━━━━━━━━━━━━━━━━━

👩 Angie: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Phone: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nEmail: ' + data.email)}

👩 Vivi: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Phone: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nEmail: ' + data.email)}

👩 Debi: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Phone: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nEmail: ' + data.email)}

👨 Loui: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Phone: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nEmail: ' + data.email)}

👩 Luz: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Phone: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nEmail: ' + data.email)}

👨 Aaron: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Phone: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nEmail: ' + data.email)}

━━━━━━━━━━━━━━━━━━━
REPLY TO CLIENT: ${data.email}?subject=✅%20Your%20Medusa%20Tattoo%20booking%20confirmed!

Medusa Tattoo Team
  `,
  );

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    console.log('✅ Booking response:', {
      ok: response.ok,
      status: response.status,
      result,
    });

    if (!response.ok || !result.success) {
      throw new Error(result?.message || 'Submission failed');
    }

    return {
      id: uuidv4(),
      status: 'pending',
      bookingNumber: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
};

export const validateBookingData = (data: Partial<BookingRequest>): string | null => {
  if (!data.serviceId) return 'Please select a service';
  if (!data.paymentMethod) return 'Please select a payment method';
  if (!data.name?.trim()) return 'Name is required';
  if (!data.email?.trim()) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(data.email)) return 'Please enter a valid email';
  if (!data.date) return 'Please select a date';
  return null;
};
