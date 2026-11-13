// scripts/ping-indexnow.mjs
// Submits every URL in the live sitemap to the IndexNow API (api.indexnow.org),
// which fans out to Bing, Yandex, Seznam and Naver. The key file at
// public/<SITE.indexNowKey>.txt already exists and is served — this script is
// what actually *uses* it. Bing Webmaster Tools flags "Set up IndexNow" as a
// top recommendation until this is run at least once (and ideally after every
// content-affecting deploy — run `npm run indexnow` post-deploy).
import https from 'node:https';
import { SITE } from '../src/config/site.js';

const sitemapUrl = `https://${SITE.domain}/sitemap.xml`;

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const { hostname, pathname } = new URL(url);
    const req = https.request(
      { hostname, path: pathname, method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(payload) } },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, data }));
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const xml = await fetchText(sitemapUrl);
// sitemap.xml here is an index of child sitemaps OR a flat list — handle both.
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemapChildren = locs.filter((u) => u.endsWith('.xml'));

let urlList = locs.filter((u) => !u.endsWith('.xml'));
for (const child of sitemapChildren) {
  const childXml = await fetchText(child);
  urlList.push(...[...childXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}

urlList = [...new Set(urlList)];
console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

// IndexNow caps a single submission at 10,000 URLs; chunk defensively anyway.
const CHUNK = 9000;
for (let i = 0; i < urlList.length; i += CHUNK) {
  const chunk = urlList.slice(i, i + CHUNK);
  const res = await postJson('https://api.indexnow.org/indexnow', {
    host: SITE.domain,
    key: SITE.indexNowKey,
    keyLocation: `https://${SITE.domain}/${SITE.indexNowKey}.txt`,
    urlList: chunk,
  });
  console.log(`Chunk ${i / CHUNK + 1}: HTTP ${res.status}`, res.data || '(empty body — success)');
}
