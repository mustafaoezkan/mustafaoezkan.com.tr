import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';
import EmailLink from '../components/Contact/EmailLink';
import ContactIcons from '../components/Contact/ContactIcons';
import AnimatedPage from '../components/Template/AnimatedPage';
import { useLanguage } from '../contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  return (
    <Main
      description="Contact Mustafa Ozkan via email @ info@mustafaoezkan.com.tr"
    >
      <AnimatedPage>
        <article className="post" id="contact">
          <header>
            <div className="title">
              <h2>
                <Link to="/contact">{t('contact.title')}</Link>
              </h2>
            </div>
          </header>
          <div className="email-at">
            <p>{t('index.greeting')}</p>
            <EmailLink />
          </div>
          <ContactIcons />
        </article>
      </AnimatedPage>
    </Main>
  );
};

export default Index;
