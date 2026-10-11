import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Education from '../components/Resume/Education';
import Experience from '../components/Resume/Experience';
import TechStacks from '../components/Resume/TechStacks';
import Awards from '../components/Resume/Awards';
import CvDownload from '../components/Resume/CvDownload';
import AnimatedPage from '../components/Template/AnimatedPage';
import AnimatedSection from '../components/Template/AnimatedSection';
import degrees from '../data/resume/degrees';
import work from '../data/resume/work';
import techStacks from '../data/resume/techStacks';
import awards from '../data/resume/awards';
import { useLanguage } from '../contexts/LanguageContext';

const sectionKeys = ['education', 'experience', 'techstacks', 'awards'];

const Resume = () => {
  const { language, t } = useLanguage();

  const sectionLabels = [
    t('resume.education'),
    t('resume.experience'),
    t('resume.techStacks'),
    t('resume.awards'),
  ];

  const localDegrees = degrees[language] || degrees.en;
  const localWork = work[language] || work.en;

  return (
    <Main
      title={t('resume.title')}
      description="Mustafa Ozkan's Resume. Yapı Kredi Technology Expert Software Engineer."
    >
      <AnimatedPage>
        <article className="post" id="resume">
          <header>
            <div className="title">
              <h2>
                <Link to="resume">{t('resume.title')}</Link>
              </h2>
              <div className="link-container">
                {sectionLabels.map((label, idx) => (
                  <h4 key={label}>
                    <a href={`#${sectionKeys[idx]}`}>{label}</a>
                  </h4>
                ))}
              </div>
            </div>
          </header>
          <AnimatedSection delay={0.1}>
            <Education data={localDegrees} />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Experience data={localWork} />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <TechStacks techStacks={techStacks} />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Awards data={awards} />
          </AnimatedSection>
          <CvDownload />
        </article>
      </AnimatedPage>
    </Main>
  );
};

export default Resume;
