import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Education from '../components/Resume/Education';
import Experience from '../components/Resume/Experience';
import TechStacks from '../components/Resume/TechStacks';
import degrees from '../data/resume/degrees';
import work from '../data/resume/work';
import techStacks from '../data/resume/techStacks';

// NOTE: sections are displayed in order defined.
const sections = {
  Education: () => <Education data={degrees} />,
  Experience: () => <Experience data={work} />,
  TechStacks: () => <TechStacks techStacks={techStacks} />,
};

const Resume = () => (
  <Main
    title="Resume"
    description="Mustafa Ozkan's Resume. Yapı Kredi Technology Expert Software Engineer."
  >
    <article className="post" id="resume">
      <header>
        <div className="title">
          <h2>
            <Link to="resume">Resume</Link>
          </h2>
          <div className="link-container">
            {Object.keys(sections).map((sec) => (
              <h4 key={sec}>
                <a href={`#${sec.toLowerCase()}`}>{sec}</a>
              </h4>
            ))}
          </div>
        </div>
      </header>
      {Object.entries(sections).map(([name, Section]) => (
        <Section key={name} />
      ))}
    </article>
  </Main>
);

export default Resume;
