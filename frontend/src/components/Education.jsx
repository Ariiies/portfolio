import React from 'react';
import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation();

  return (
    <section id="education" className="section">
      <h2 className="section-title">{t('education.title')}</h2>
      <div className="card">
        <h3>{t('education.degree')}</h3>
        <p>{t('education.university')}</p>
        <p>{t('education.specialization')}</p>
      </div>
    </section>
  );
};

export default Education;