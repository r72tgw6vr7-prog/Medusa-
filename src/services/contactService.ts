export interface ContactRequest {
  name: string;
  email: string;
  serviceId: 'tattoo' | 'piercing' | 'general';
  message: string;
}

const mapContactServiceLabel = (serviceId: ContactRequest['serviceId']): string => {
  if (serviceId === 'tattoo') return 'Tattoo';
  if (serviceId === 'piercing') return 'Piercing';
  return 'General';
};

export const contactSubmit = async (data: ContactRequest): Promise<void> => {
  const serviceLabel = mapContactServiceLabel(data.serviceId);

  const formData = new FormData();
  formData.append('access_key', 'f1b55e90-ca0c-4b1d-b2e4-1d1c9b35a252');
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('service', serviceLabel);

  formData.append('subject', `📧 New Contact - ${data.name} ${serviceLabel}`);
  formData.append(
    'message',
    `
📧 CONTACT FORM - MEDUSA TATTOO

👤 Name: ${data.name}
📧 Reply to: ${data.email}
✨ Service: ${serviceLabel}
💬 Message: ${data.message}

Medusa Team
  `,
  );

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'Contact submission failed');
  }
};
