/* eslint-disable no-console */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const { NODE_ENV, REACT_APP_GA_TRACKING_ID } = process.env;

if (NODE_ENV === 'production') {
  if (REACT_APP_GA_TRACKING_ID) {
    console.log('Initializing Google Analytics with ID:', REACT_APP_GA_TRACKING_ID);
    ReactGA.initialize(REACT_APP_GA_TRACKING_ID);
  } else {
    console.error('Google Analytics Measurement ID is missing.');
  }
}

const Analytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (NODE_ENV === 'production' && REACT_APP_GA_TRACKING_ID) {
      ReactGA.send({ hitType: 'pageview', page: pathname });
    }
  }, [pathname]);

  return null;
};

export default Analytics;
