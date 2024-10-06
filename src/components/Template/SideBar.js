import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Mustafa Özkan</h2>
        <p>
          <a href="mailto:info@mustafaoezkan.com.tr">info@mustafaoezkan.com.tr</a>
        </p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>
        Hi, I&apos;m Mustafa. I am a{' '}
        <a href="https://www.erciyes.edu.tr/" target="_blank" rel="noopener noreferrer">Erciyes University</a> graduate and
        currently a Software Engineer at <a href="https://www.huawei.com" target="_blank" rel="noopener noreferrer">Huawei</a>.
        I specialize in frontend development and contribute to projects that enhance mobile
        services and internal systems. I&apos;m passionate about leveraging diverse tech stacks
        to drive innovation.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? (
            <Link to="/resume" className="button">
              Learn More
            </Link>
          ) : (
            <Link to="/about" className="button">
              About Me
            </Link>
          )}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">
        &copy; Mustafa Özkan <Link to="/">mustafaoezkan.com.tr</Link>.
      </p>
    </section>
  </section>
);

export default SideBar;
