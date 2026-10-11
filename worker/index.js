// Cloudflare Worker that sits in front of the static site.
// Handles the contact form and the Turnstile-protected CV download;
// everything else is served straight from the static assets.

// eslint-disable-next-line import/no-unresolved, import/extensions
import { EmailMessage } from 'cloudflare:email';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const CV_FILES = {
  en: 'Mustafa_Ozkan_CV_EN.pdf',
  tr: 'Mustafa_Ozkan_CV_TR.pdf',
};

const LIMITS = {
  name: 100,
  email: 200,
  messageMin: 10,
  messageMax: 5000,
};

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
});

const readJson = async (request) => {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : {};
  } catch (e) {
    return {};
  }
};

const verifyTurnstile = async (token, request, env) => {
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET_KEY);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: form });
  if (!res.ok) return false;
  const outcome = await res.json();
  return outcome.success === true;
};

// Header values must never contain line breaks (prevents header injection).
const singleLine = (value) => String(value).replace(/[\r\n\t]+/g, ' ').trim();

const toBase64 = (text) => {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
};

// RFC 2047 encoded-word, so non-ASCII names and subjects survive.
const encodeHeader = (text) => `=?UTF-8?B?${toBase64(singleLine(text))}?=`;

const buildMime = ({
  from, to, replyToName, replyToEmail, subject, text,
}) => {
  const domain = from.split('@')[1];
  const body = toBase64(text).replace(/(.{76})/g, '$1\r\n');
  return [
    `From: ${encodeHeader('Portfolio Contact Form')} <${from}>`,
    `To: <${to}>`,
    `Reply-To: ${encodeHeader(replyToName)} <${replyToEmail}>`,
    `Subject: ${encodeHeader(subject)}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    `Date: ${new Date().toUTCString().replace('GMT', '+0000')}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n');
};

const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[^\s@<>()[\],;:"]{2,}$/;

const handleContact = async (request, env) => {
  const data = await readJson(request);
  const name = singleLine(data.name || '');
  const email = singleLine(data.email || '');
  const message = String(data.message || '').trim();

  if (!name || name.length > LIMITS.name
    || !EMAIL_RE.test(email) || email.length > LIMITS.email
    || message.length < LIMITS.messageMin || message.length > LIMITS.messageMax) {
    return json({ ok: false, error: 'invalid_input' }, 400);
  }

  if (!await verifyTurnstile(data.token, request, env)) {
    return json({ ok: false, error: 'verification_failed' }, 403);
  }

  const raw = buildMime({
    from: env.CONTACT_FROM,
    to: env.CONTACT_TO,
    replyToName: name,
    replyToEmail: email,
    subject: `Portfolio contact: ${name}`,
    text: `From: ${name} <${email}>\n\n${message}\n`,
  });

  try {
    await env.CONTACT_EMAIL.send(new EmailMessage(env.CONTACT_FROM, env.CONTACT_TO, raw));
  } catch (e) {
    console.error('contact email failed:', e.message);
    return json({ ok: false, error: 'send_failed' }, 502);
  }
  return json({ ok: true });
};

const handleCv = async (request, env) => {
  const data = await readJson(request);
  const file = CV_FILES[data.lang] || CV_FILES.en;

  if (!await verifyTurnstile(data.token, request, env)) {
    return json({ ok: false, error: 'verification_failed' }, 403);
  }

  const asset = await env.ASSETS.fetch(new URL(`/cv/${file}`, request.url));
  if (!asset.ok) return json({ ok: false, error: 'not_found' }, 404);

  return new Response(asset.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${file}"`,
      'Cache-Control': 'no-store',
    },
  });
};

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    // CV files are only handed out through /api/cv after a Turnstile check.
    if (pathname.startsWith('/cv/')) {
      return Response.redirect(new URL('/resume', request.url).toString(), 302);
    }

    if (pathname === '/api/contact' || pathname === '/api/cv') {
      if (request.method !== 'POST') {
        return json({ ok: false, error: 'method_not_allowed' }, 405);
      }
      return pathname === '/api/contact'
        ? handleContact(request, env)
        : handleCv(request, env);
    }

    if (pathname.startsWith('/api/')) {
      return json({ ok: false, error: 'not_found' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
