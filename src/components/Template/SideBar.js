import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';
import { useLanguage } from '../../contexts/LanguageContext';

const { PUBLIC_URL } = process.env;

const SideBar = () => {
  const { t } = useLanguage();
  return (
    <section id="sidebar">
      <section id="intro">
        <Link to="/" className="logo">
          <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
        </Link>
        <header>
          <h2>Mustafa Özkan</h2>
          <p>
            <a href="mailto:info@mustafaoezkan.com.tr">info@mustafaoezkan.com.tr</a>
          </p>
        </header>
      </section>

      <section className="blurb">
        <h2>{t('sidebar.about')}</h2>
        <p>{t('sidebar.description')}</p>
        <ul className="actions">
          <li>
            {!window.location.pathname.includes('/resume') ? (
              <Link to="/resume" className="button">
                {t('sidebar.learnMore')}
              </Link>
            ) : (
              <Link to="/about" className="button">
                {t('sidebar.aboutMe')}
              </Link>
            )}
          </li>
        </ul>
      </section>

      <section id="footer">
        <ContactIcons />
        <p className="copyright">
          &copy; Mustafa Özkan <Link to="/">mustafaoezkan.com.tr</Link>.
        </p>
      </section>
    </section>
  );
};

export default SideBar;
