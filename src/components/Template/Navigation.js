import React from 'react';
import { Link } from 'react-router-dom';

import Hamburger from './Hamburger';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import routes from '../../data/routes';
import { useLanguage } from '../../contexts/LanguageContext';

const Navigation = () => {
  const { t } = useLanguage();
  return (
    <header id="header">
      <h1 className="index-link">
        {routes
          .filter((l) => l.index)
          .map((l) => (
            <Link key={l.label} to={l.path}>
              {l.label}
            </Link>
          ))}
      </h1>
      <nav className="links">
        <ul>
          {routes
            .filter((l) => !l.index)
            .map((l) => (
              <li key={l.label}>
                <Link to={l.path}>{l.labelKey ? t(l.labelKey) : l.label}</Link>
              </li>
            ))}
        </ul>
      </nav>
      <div className="header-controls">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <Hamburger />
    </header>
  );
};

export default Navigation;
