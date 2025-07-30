import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'FrameDetectAI - Detección de Objetos con Computer Vision',
      description: 'Un sistema de visión por computadora que detecta, clasifica y rastrea objetos en video. Extrae regiones de interés (ROI) y usa VGG16 para clasificación.',
      stack: 'Python, OpenCV, Keras, TensorFlow',
      image: '/detectframeai.png',
      link: 'https://github.com/Ariiies/FrameDetectAI/blob/main/main.ipynb',
    },
    {
      title: 'CorpusClassifier - Clasificación de Texto con NLP',
      description: 'Clasifica documentos del corpus Brown usando TF-IDF y redes neuronales. Incluye preprocesamiento y evaluación de modelos.',
      stack: 'Python, TensorFlow, Keras, scikit-learn',
      image: '/corpusclassifier.png',
      link: 'https://github.com/Ariiies/CorpusClassifier/blob/main/main.ipynb',
    },
    {
      title: 'FlaskNotes - Gestión de Notas Web',
      description: 'Aplicación web para gestión de notas que incluye búsqueda avanzada con TF-IDF y paginación.',
      stack: 'Python, Flask, HTML, CSS, SQL',
      image: '/flasknotes.png',
      link:'https://github.com/Ariiies/FlaskNotes/blob/main/README.md',
    },
    {
      title: 'Sistema ERP - Maestros Joyeros (Experiencia Profesional)',
      description: 'ERP personalizado con Laravel y Livewire. Automatización de reportes, control de inventario y optimización de procesos.',
      stack: 'PHP, Laravel, MySQL',
    },
  ];

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Proyectos</h2>
      <div className="card-grid">
        {projects.map((project, index) => (
          <div className="card" key={index}>
            {project.image && <img src={project.image} alt={project.title} className="project-image" />}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="tech-stack">Stack: {project.stack}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                Ver Código
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;