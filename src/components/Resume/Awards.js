import React from 'react';
import PropTypes from 'prop-types';
import Award from './Awards/Award';
import { useLanguage } from '../../contexts/LanguageContext';

const Awards = ({ data }) => {
  const { t } = useLanguage();
  return (
    <div className="awards">
      <div className="link-to" id="awards" />
      <div className="title">
        <h3>{t('resume.awards')}</h3>
      </div>
      {data.map((award) => (
        <Award data={award} key={`${award.title}-${award.date}`} />
      ))}
    </div>
  );
};

Awards.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      issuer: PropTypes.string,
      date: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
};

Awards.defaultProps = {
  data: [],
};

export default Awards;
