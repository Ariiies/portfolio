import React from 'react';
import { useTranslation } from 'react-i18next';

const Skills = () => {
  const { t } = useTranslation();

  const skills = [
    { category: t('skills.languages'), items: 'Python, JavaScript, Java, HTML, CSS, PHP' },
    { category: t('skills.frameworks'), items: 'Flask, Django, FastAPI, Bootstrap, jQuery, React, Laravel, Livewire' },
    { category: t('skills.tools'), items: `Git, GitHub, Power BI (${t('skills.in_progress')}), Docker (${t('skills.in_progress')})` },
    { category: t('skills.cloud'), items: t('skills.ccna_certs') },
    { category: t('skills.databases'), items: 'SQL' },
    { category: t('skills.english_level'), items: t('skills.b2_level') },
  ];

  return (
    <section id="skills" className="section">
      <h2 className="section-title">{t('skills.title')}</h2>
      <div className="card-grid">
        {skills.map((skill, index) => (
          <div className="card" key={index}>
            <h3>{skill.category}</h3>
            <p>{skill.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;