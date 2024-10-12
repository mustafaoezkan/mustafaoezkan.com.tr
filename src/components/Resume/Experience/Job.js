import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';
import './Job.css';

const Job = ({
  data: {
    name, position, url, startDate, endDate, summary, highlights, logo,
  },
}) => (
  <article className="jobs-container">
    <header className="title-container">
      <div className="sub-title">
        <h4>
          <a href={url}>{name}</a> - {position}
        </h4>
        <p className="daterange">
          {' '}
          {dayjs(startDate).format('MMMM YYYY')} -{' '}
          {endDate ? dayjs(endDate).format('MMMM YYYY') : 'PRESENT'}
        </p>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="job-link">
        {logo && <img src={logo} alt={`${name} logo`} className="job-logo" />}
      </a>
    </header>
    {summary ? (
      <Markdown
        options={{
          overrides: {
            p: {
              props: {
                className: 'summary',
              },
            },
          },
        }}
      >
        {summary}
      </Markdown>
    ) : null}
    {highlights ? (
      <ul className="points">
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    ) : null}
  </article>
);

Job.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    summary: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string.isRequired),
    logo: PropTypes.string,
  }).isRequired,
};

export default Job;
