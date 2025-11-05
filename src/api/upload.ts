import { handleUpload } from '@vercel/blob/client';
import { put } from '@vercel/blob';

export default async function handler(request) {
  try {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const blob = await handleUpload({
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return Response.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return new Response('Upload failed', { status: 500 });
  }
}