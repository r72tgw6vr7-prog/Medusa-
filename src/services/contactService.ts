export interface ContactRequest {
  name: string;
  email: string;
  serviceId: 'tattoo' | 'piercing' | 'general';
  message: string;
}

const mapContactServiceLabel = (serviceId: ContactRequest['serviceId']): string => {
  if (serviceId === 'tattoo') return 'Tattoo';
  if (serviceId === 'piercing') return 'Piercing';
  return 'Allgemein';
};

export const contactSubmit = async (data: ContactRequest): Promise<void> => {
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!web3FormsKey) {
    throw new Error('Das Kontaktformular ist derzeit nicht konfiguriert.');
  }

  const serviceLabel = mapContactServiceLabel(data.serviceId);

  const formData = new FormData();
  formData.append('access_key', web3FormsKey);
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('service', serviceLabel);

  formData.append('subject', `📧 Neue Kontaktanfrage - ${data.name} ${serviceLabel}`);
  formData.append(
    'message',
    `
📧 KONTAKTFORMULAR - MEDUSA TATTOO

👤 Name: ${data.name}
📧 Antwort an: ${data.email}
✨ Leistung: ${serviceLabel}
💬 Nachricht: ${data.message}

Medusa Team
  `,
  );

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'Übermittlung der Kontaktanfrage fehlgeschlagen');
  }
};
