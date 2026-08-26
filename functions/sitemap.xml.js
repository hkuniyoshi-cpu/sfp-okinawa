// Cloudflare Pages Function: /sitemap.xml
// GAS の ?sitemap=1 を叩いて XML を返す。edge cache 1h。

const GAS_URL = 'https://script.google.com/macros/s/AKfycbyu21Op12Ty_Q_F4rZUWonLQ9xefD_O91rmyavRhZJB70GRWGS68_iwMqx-xWAmj-dwYg/exec';

export async function onRequest(context) {
  const cache = caches.default;
  const cacheKey = new Request('https://sfp-okinawa.search-mania.net/sitemap.xml', context.request);
  let response = await cache.match(cacheKey);
  if (response) return response;

  try {
    const upstream = await fetch(GAS_URL + '?sitemap=1', { redirect: 'follow' });
    const xml = await upstream.text();
    response = new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (e) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://sfp-okinawa.search-mania.net/</loc></url></urlset>', {
      status: 200,
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
  }
}
