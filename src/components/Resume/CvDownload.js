import React, { useState, useCallback } from 'react';
import Turnstile from '../Template/Turnstile';
import { useLanguage } from '../../contexts/LanguageContext';

const saveBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

// CV download button. The file is only served after a Turnstile check,
// which starts when the visitor asks for the download.
const CvDownload = () => {
  const { language, t } = useLanguage();
  // idle | verifying | downloading | error
  const [status, setStatus] = useState('idle');

  const handleError = useCallback(() => setStatus('error'), []);

  const handleToken = useCallback(async (token) => {
    if (!token) return;
    setStatus('downloading');
    try {
      const res = await fetch('/api/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: language, token }),
      });
      if (!res.ok) throw new Error(`CV download failed: ${res.status}`);
      saveBlob(await res.blob(), `Mustafa_Ozkan_CV_${language.toUpperCase()}.pdf`);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
    }
  }, [language]);

  const busy = status === 'verifying' || status === 'downloading';

  return (
    <div className="cv-download">
      <button
        type="button"
        className="button cv-button"
        disabled={busy}
        onClick={() => setStatus('verifying')}
      >
        <span className="cv-icon">&#8681;</span>{' '}
        {busy ? t('resume.preparingCV') : t('resume.downloadCV')} ({language.toUpperCase()})
      </button>
      {status === 'verifying' && (
        <Turnstile onToken={handleToken} onError={handleError} />
      )}
      {status === 'error' && (
        <p className="cv-error" role="status">{t('resume.downloadFailed')}</p>
      )}
    </div>
  );
};

export default CvDownload;
