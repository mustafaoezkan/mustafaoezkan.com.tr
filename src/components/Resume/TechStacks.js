import React from 'react';
import PropTypes from 'prop-types';
import IconGroup from './TechStacks/IconGroup';
import './TechStacks.css';

const TechStacks = ({ techStacks }) => {
  const groupIcons = (items) => (
    <div className="group">
      {items.map((item) => (
        <IconGroup key={item.title} icon={item.icon} label={item.title} />
      ))}
    </div>
  );

  return (
    <div className="techStacks">
      <div className="link-to" id="techstacks" />
      <div className="title">
        <h3>Tech Stacks</h3>
      </div>
      {groupIcons(techStacks)}
    </div>
  );
};

TechStacks.propTypes = {
  techStacks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      icon: PropTypes.object,
    }),
  ),
};

TechStacks.defaultProps = {
  techStacks: [],
};

export default TechStacks;
