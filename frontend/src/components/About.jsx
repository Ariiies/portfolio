import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section">
      <h2 className="section-title">{t('about.title')}</h2>
      <div className="card">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
        <p>{t('about.p4')}</p>
        <p>{t('about.p5')}</p>
        <p>{t('about.p6')}</p>
        <div className="social-links">
          <a href="https://github.com/Ariiies" target="_blank" rel="noopener noreferrer">
            <img src="/github-icon.svg" alt={t('about.github_alt')} width="32" height="32" />
          </a>
          <a href="https://www.linkedin.com/in/luis-aries-meza-castillo-a53727263" target="_blank" rel="noopener noreferrer">
            <img src="/linkedin-icon.svg" alt={t('about.linkedin_alt')} width="32" height="32" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;