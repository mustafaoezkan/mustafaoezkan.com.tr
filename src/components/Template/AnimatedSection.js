import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedSection = ({ children, delay }) => (
  <motion.div
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

AnimatedSection.defaultProps = {
  delay: 0,
};

export default AnimatedSection;
