import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { useLanguage } from '../contexts/LanguageContext';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';

const Projects = () => {
  const { t } = useLanguage();
  return (
    <Main title={t('projects.title')} description="Learn about Mustafa Ozkan's projects.">
      <article className="post" id="projects">
        <header>
          <div className="title">
            <h2>
              <Link to="/projects">{t('projects.title')}</Link>
            </h2>
            <p>{t('projects.subtitle')}</p>
          </div>
        </header>
        {data.map((project) => (
          <Cell data={project} key={project.title} />
        ))}
      </article>
    </Main>
  );
};

export default Projects;
