import React from 'react';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();
  
  // Los datos ahora usan claves de traducción en lugar de texto fijo
  const projects = [
    {
      titleKey: 'projects.list.frameDetectAI.title',
      descriptionKey: 'projects.list.frameDetectAI.description',
      stack: 'Python, Numpy, OpenCV, Keras, TensorFlow',
      image: '/banner-projects/detectframeai.png',
      link: 'https://github.com/Ariiies/FrameDetectAI/blob/main/main.ipynb',
    },
    {
      titleKey: 'projects.list.corpusClassifier.title',
      descriptionKey: 'projects.list.corpusClassifier.description',
      stack: 'Python, TensorFlow, Numpy, Keras, Pandas, scikit-learn',
      image: '/banner-projects/corpusclassifier.png',
      link: 'https://github.com/Ariiies/CorpusClassifier/blob/main/main.ipynb',
    },
    {
      titleKey: 'projects.list.portfolio.title',
      descriptionKey: 'projects.list.portfolio.description',
      stack: 'React, JavaScript, Python, FastApi, Docker, CSS, Vite',
      image: '/banner-projects/portfolio.png',
      link:'https://github.com/Ariiies/portfolio/blob/main/README.md',
    },
    {
      titleKey: 'projects.list.flasknotes.title',
      descriptionKey: 'projects.list.flasknotes.description',
      stack: 'Python, Flask, HTML, CSS, SQL',
      image: '/banner-projects/flasknotes.png',
      link:'https://github.com/Ariiies/FlaskNotes/blob/main/README.md',
    },
    {
      titleKey: 'projects.list.corpy.title',
      descriptionKey: 'projects.list.corpy.description',
      stack: 'Python',
      image: '/banner-projects/corpy.png',
      link:'https://github.com/Ariiies/Corpy/blob/main/README.md',
    },
    {
      titleKey: 'projects.list.erp.title',
      descriptionKey: 'projects.list.erp.description',
      stack: 'PHP, Laravel, MySQL',
      image: '/banner-projects/erp.png',
    },
  ];

  return (
    <section id="projects" className="section">
      <h2 className="section-title">{t('projects.title')}</h2>
      <div className="card-grid">
        {projects.map((project, index) => (
          <div className="card" key={index}>
            {project.image && <img src={project.image} alt={t(project.titleKey)} className="project-image" />}
            <h3>{t(project.titleKey)}</h3>
            <p>{t(project.descriptionKey)}</p>
            <p className="tech-stack">{t('projects.stack_label')}: {project.stack}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                {t('projects.view_code_button')}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;