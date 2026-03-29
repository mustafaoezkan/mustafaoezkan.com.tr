import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';
import AnimatedPage from '../components/Template/AnimatedPage';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const [markdown, setMarkdown] = useState('');
  const { language, t } = useLanguage();

  useEffect(() => {
    const loadMarkdown = language === 'tr'
      ? import('../data/about_tr.md')
      : import('../data/about_en.md');

    loadMarkdown.then((res) => {
      fetch(res.default)
        .then((r) => r.text())
        .then(setMarkdown);
    });
  }, [language]);

  return (
    <Main title={t('about.title')} description="Learn about Mustafa Ozkan">
      <AnimatedPage>
        <article className="post markdown" id="about">
          <header>
            <div className="title">
              <h2>
                <Link to="/about">{t('about.title')}</Link>
              </h2>
            </div>
          </header>
          <Markdown>{markdown}</Markdown>
        </article>
      </AnimatedPage>
    </Main>
  );
};

export default About;
