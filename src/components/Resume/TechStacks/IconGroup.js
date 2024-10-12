import React from 'react';
import PropTypes from 'prop-types';

const IconGroup = ({ icon, label }) => (
  <div className="icon-group">
    {icon}
    <span className="label">{label}</span>
  </div>
);

IconGroup.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

export default IconGroup;
