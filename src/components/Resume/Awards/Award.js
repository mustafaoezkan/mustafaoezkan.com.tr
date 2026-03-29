import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useLanguage } from '../../../contexts/LanguageContext';

const Award = ({ data }) => {
  const { t } = useLanguage();
  return (
    <article className="award-container">
      <header>
        <h4 className="award-title">{data.title}</h4>
        <p className="award-issuer">
          {t('awards.issuedBy')}{' '}
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            {data.issuer}
          </a>{' '}
          &middot; {dayjs(data.date).format('MMMM YYYY')}
        </p>
      </header>
    </article>
  );
};

Award.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default Award;
