export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin/

User-agent: Yandex
Allow: /
Crawl-delay: 0.5

User-agent: Googlebot
Allow: /

Sitemap: https://almakhora.ru/sitemap.xml
Host: https://almakhora.ru`);
}
