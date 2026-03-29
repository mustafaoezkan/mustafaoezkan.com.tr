import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';
import AnimatedPage from '../components/Template/AnimatedPage';
import { useLanguage } from '../contexts/LanguageContext';

const PageNotFound = () => {
  const { t } = useLanguage();
  return (
    <Main title="404" fullPage>
      <AnimatedPage>
        <div className="not-found">
          <h1>{t('notFound.title')}</h1>
          <p>
            {t('notFound.returnHome')} <Link to="/">{t('notFound.home')}</Link>.
          </p>
        </div>
      </AnimatedPage>
    </Main>
  );
};

export default PageNotFound;
