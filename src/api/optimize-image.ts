import sharp from 'sharp';

const ALLOWED_WIDTHS = [400, 800, 1200, 1600];
const MAX_CACHE_AGE = 86400 * 30; // 30 days

export async function handler(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const width = parseInt(searchParams.get('w') || '800');
    const quality = parseInt(searchParams.get('q') || '75');

    if (!url || !ALLOWED_WIDTHS.includes(width)) {
      return new Response(
        JSON.stringify({ error: 'Invalid parameters' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate origin (prevent abuse)
    const urlObj = new URL(url);
    if (!urlObj.hostname.includes('localhost') && 
        !urlObj.hostname.includes('vercel-storage.com')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized origin' }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Fetch + optimize
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    const optimized = await sharp(Buffer.from(buffer))
      .resize(width, null, { 
        fit: 'contain',
        withoutEnlargement: true
      })
      .webp({ quality })
      .toBuffer();

    return new Response(optimized, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': `public, max-age=${MAX_CACHE_AGE}, immutable`,
      },
    });
  } catch (error) {
    console.error('[Image Optimize]', error);
    return new Response(
      JSON.stringify({ error: 'Processing failed' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}