import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const { REACT_APP_TURNSTILE_SITE_KEY } = process.env;

let scriptPromise;

// Loads the Turnstile script once, the first time a widget is needed.
const loadScript = () => {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error('Turnstile failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
};

// Cloudflare Turnstile widget. Tokens are single use: change `resetKey`
// after a token has been spent to get a fresh one.
const Turnstile = ({
  onToken, onError, resetKey,
}) => {
  const container = useRef(null);
  const callbacks = useRef({ onToken, onError });
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    callbacks.current = { onToken, onError };
  }, [onToken, onError]);

  useEffect(() => {
    let widgetId;
    let cancelled = false;

    loadScript()
      .then((turnstile) => {
        if (cancelled || !container.current) return;
        widgetId = turnstile.render(container.current, {
          sitekey: REACT_APP_TURNSTILE_SITE_KEY,
          theme,
          language,
          callback: (token) => callbacks.current.onToken(token),
          'expired-callback': () => callbacks.current.onToken(null),
          'error-callback': () => callbacks.current.onError(),
        });
      })
      .catch(() => callbacks.current.onError());

    return () => {
      cancelled = true;
      if (widgetId !== undefined && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [theme, language, resetKey]);

  return <div className="turnstile" ref={container} />;
};

Turnstile.defaultProps = {
  onError: () => {},
  resetKey: 0,
};

Turnstile.propTypes = {
  onToken: PropTypes.func.isRequired,
  onError: PropTypes.func,
  resetKey: PropTypes.number,
};

export default Turnstile;
