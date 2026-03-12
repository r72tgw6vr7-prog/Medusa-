import { v4 as uuidv4 } from 'uuid';

const _BOOKING_API_URL =
  'https://script.google.com/macros/s/AKfycbxV1TCVR-lZK4HjHA5aTQxkhUPVkDb76TUX95SV_AgSs-pIJlpcCscy20DbGvno_cjoiw/exec';

const BOOKING_SUBMIT_TIMEOUT_MS = 15000;

export type BookingSubmitErrorCode =
  | 'missing_config'
  | 'network'
  | 'timeout'
  | 'invalid_response'
  | 'submission_rejected';

export class BookingSubmitError extends Error {
  code: BookingSubmitErrorCode;
  details?: string;

  constructor(code: BookingSubmitErrorCode, details?: string) {
    super(details ?? code);
    this.name = 'BookingSubmitError';
    this.code = code;
    this.details = details;
  }
}

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
  return 'Tattoo';
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
    'custom': 'Individuelles Design',
  };

  return labels[specificService] || specificService;
};

const mapPaymentLabel = (paymentMethod?: BookingRequest['paymentMethod']): string => {
  if (paymentMethod === 'cash') return 'Bar';
  if (paymentMethod === 'card') return 'Karte';
  if (paymentMethod === 'bank_transfer') return 'Überweisung';
  return '';
};

const parseWeb3FormsResponse = async (
  response: Response,
): Promise<{ success?: boolean; message?: string }> => {
  const rawBody = await response.text();

  if (!rawBody.trim()) {
    throw new BookingSubmitError('invalid_response');
  }

  try {
    return JSON.parse(rawBody) as { success?: boolean; message?: string };
  } catch {
    throw new BookingSubmitError('invalid_response');
  }
};

const classifyRejectedResponse = (message?: string): BookingSubmitErrorCode => {
  const normalized = message?.toLowerCase() ?? '';
  if (
    normalized.includes('access key') ||
    normalized.includes('api key') ||
    normalized.includes('invalid key') ||
    normalized.includes('unauthorized') ||
    normalized.includes('forbidden')
  ) {
    return 'missing_config';
  }

  return 'submission_rejected';
};

export const submitBooking = async (data: BookingRequest): Promise<BookingResponse> => {
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!web3FormsKey) {
    throw new BookingSubmitError('missing_config');
  }

  const formData = new FormData();
  formData.append('access_key', web3FormsKey);
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
    `🆕 Neue Buchung: ${data.name} - ${serviceDisplay} - ${formatDateToGerman(data.date)}`,
  );
  formData.append(
    'message',
    `
🎯 NEUE BUCHUNGSANFRAGE - MEDUSA TATTOO

👤 Name: ${data.name}
📧 E-Mail: ${data.email}
📞 Telefon: ${data.phone}
✨ Leistung: ${serviceDisplay}
📅 Datum: ${formatDateToGerman(data.date)}
💳 Zahlung: ${mapPaymentLabel(data.paymentMethod) || 'Nicht angegeben'}
📝 Details: ${data.projectDetails || 'Keine'}

━━━━━━━━━━━━━━━━━━━
🔥 SCHNELL ZUM KALENDER (EIN KLICK):
━━━━━━━━━━━━━━━━━━━

👩 Angie: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Telefon: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nE-Mail: ' + data.email)}

👩 Vivi: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Telefon: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nE-Mail: ' + data.email)}

👩 Debi: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Telefon: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nE-Mail: ' + data.email)}

👨 Loui: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Telefon: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nE-Mail: ' + data.email)}

👩 Luz: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Telefon: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nE-Mail: ' + data.email)}

👨 Aaron: https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.name + ' - ' + mapServiceLabel(data.serviceId))}&dates=20260215T1400/20260215T1600&details=${encodeURIComponent('Telefon: ' + data.phone + '\\nDetails: ' + data.projectDetails + '\\nE-Mail: ' + data.email)}

━━━━━━━━━━━━━━━━━━━
AN KUNDEN ANTWORTEN: ${data.email}?subject=✅%20Ihre%20Medusa%20Tattoo%20Buchung%20ist%20best%C3%A4tigt!

Medusa Tattoo Team
  `,
  );

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), BOOKING_SUBMIT_TIMEOUT_MS);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    const result = await parseWeb3FormsResponse(response);
    console.log('✅ Booking response:', {
      ok: response.ok,
      status: response.status,
      result,
    });

    if (!response.ok || !result.success) {
      throw new BookingSubmitError(
        classifyRejectedResponse(result?.message),
        result?.message || undefined,
      );
    }

    return {
      id: uuidv4(),
      status: 'pending',
      bookingNumber: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof BookingSubmitError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new BookingSubmitError('timeout');
    }

    if (error instanceof TypeError) {
      throw new BookingSubmitError('network');
    }

    console.error('❌ Error:', error);
    throw new BookingSubmitError('submission_rejected');
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const validateBookingData = (data: Partial<BookingRequest>): string | null => {
  if (!data.serviceId) return 'Bitte wählen Sie eine Leistung aus';
  if (!data.paymentMethod) return 'Bitte wählen Sie eine Zahlungsart aus';
  if (!data.name?.trim()) return 'Name ist erforderlich';
  if (!data.email?.trim()) return 'E-Mail ist erforderlich';
  if (!/\S+@\S+\.\S+/.test(data.email)) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
  if (!data.date) return 'Bitte wählen Sie ein Datum aus';
  return null;
};
