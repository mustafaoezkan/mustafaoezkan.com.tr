import React, { useState, useCallback } from 'react';
import Turnstile from '../Template/Turnstile';
import { useLanguage } from '../../contexts/LanguageContext';

const emptyForm = { name: '', email: '', message: '' };

const ContactForm = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState(emptyForm);
  const [token, setToken] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  // idle | sending | sent | error | verification
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerificationError = useCallback(() => {
    setToken(null);
    setStatus('verification');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      });
      if (res.ok) {
        setForm(emptyForm);
        setStatus('sent');
      } else {
        setStatus(res.status === 403 ? 'verification' : 'error');
      }
    } catch (err) {
      setStatus('error');
    }
    // The token is spent either way; ask Turnstile for a new one.
    setToken(null);
    setResetKey((key) => key + 1);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>{t('contact.formTitle')}</h3>
      <div className="contact-form-row">
        <div className="contact-form-field">
          <label htmlFor="contact-name">{t('contact.name')}</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="contact-form-field">
          <label htmlFor="contact-email">{t('contact.email')}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="contact-form-field">
        <label htmlFor="contact-message">{t('contact.message')}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          minLength={10}
          maxLength={5000}
          required
          value={form.message}
          onChange={handleChange}
        />
      </div>
      <Turnstile
        onToken={setToken}
        onError={handleVerificationError}
        resetKey={resetKey}
      />
      <button
        type="submit"
        className="button"
        disabled={!token || status === 'sending'}
      >
        {status === 'sending' ? t('contact.sending') : t('contact.send')}
      </button>
      <p className={`contact-form-status ${status}`} role="status">
        {status === 'sent' && t('contact.sent')}
        {status === 'error' && t('contact.error')}
        {status === 'verification' && t('contact.verificationFailed')}
      </p>
    </form>
  );
};

export default ContactForm;
