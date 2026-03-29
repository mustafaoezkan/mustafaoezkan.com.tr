import React from 'react';
import PropTypes from 'prop-types';

import Degree from './Education/Degree';
import { useLanguage } from '../../contexts/LanguageContext';

const Education = ({ data }) => {
  const { t } = useLanguage();
  return (
    <div className="education">
      <div className="link-to" id="education" />
      <div className="title">
        <h3>{t('resume.education')}</h3>
      </div>
      {data.map((degree) => (
        <Degree data={degree} key={degree.school} />
      ))}
    </div>
  );
};

Education.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      school: PropTypes.string,
      degree: PropTypes.string,
      link: PropTypes.string,
      year: PropTypes.number,
    }),
  ),
};

Education.defaultProps = {
  data: [],
};

export default Education;
