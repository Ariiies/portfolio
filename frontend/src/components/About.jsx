import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="section">
      <h2 className="section-title">Sobre Mí</h2>
      <div className="card">
        <p>
          Soy Luis Aries Meza Castillo, un apasionado Ingeniero en Tecnologías Computacionales
          graduado de la Universidad Autónoma de Baja California Sur en el año 2021. 
          Mi trayectoria profesional es una combinación de desarrollo de software pragmático y una profunda exploración en el fascinante campo de la Inteligencia Artificial.
        </p>
        <p>
          Aprendí a programar en 2017 con C++ y Java, pero no fue sino hasta 2020 que con Python adquirí
          la pasión por la programación, creando software para análisis, machine learning y visión computacional.
          Fue en 2021 cuando empecé a desarrollar aplicaciones web sencillas. Mi carrera despegó en Maestros Joyeros, donde asumí el reto de desarrollar y mantener un
          sistema ERP a medida. Utilizando el framework Laravel y Livewire, no solo construí nuevos
          módulos y refactoricé código para optimizar el rendimiento, sino que también automaticé 
          procesos de negocio cruciales. Esto incluyó la generación de reportes complejos en PDF 
          y Excel, la optimización de estrategias de bases de datos y la creación de scripts en 
          Python para la extracción y carga masiva de datos. Esta experiencia me brindó una base 
          sólida en el desarrollo full-stack y me enseñó a crear soluciones tecnológicas
          que responden directamente a las necesidades operativas de una empresa.
        </p>
        <p>
          Si bien disfruto construyendo aplicaciones web robustas, también poseo una importante pasión por el
          potencial de la Inteligencia Artificial para interpretar el mundo. Esta curiosidad
          me ha llevado a desarrollar proyectos personales complejos donde pongo a prueba mis
          habilidades. Por ejemplo, he construido modelos de Procesamiento de Lenguaje Natural (NLP),
          como mi proyecto CorpusClassifier, capaz de clasificar documentos de texto con alta 
          precisión utilizando técnicas como TF-IDF y redes neuronales con TensorFlow y Keras.
        </p>
        <p>
          Además, me he adentrado en la Visión por Computadora con proyectos como DetectFrameAI, 
          un sistema que detecta, clasifica y rastrea objetos en secuencias de video. Este proyecto
          fue un reto fascinante que me permitió trabajar a fondo con librerías como OpenCV 
          y arquitecturas de redes neuronales como VGG16, manejando
          desde la segmentación de fotogramas hasta la anotación de los objetos detectados.
        </p>
        <p>
          Mi enfoque para cada desafío se basa en un pensamiento lógico y estructurado,
          una cualidad que he fortalecido a lo largo de mi formación y que he validado con
          certificaciones clave como el PCAP (Certified Associate in Python Programming). 
          Python es mi lenguaje principal, pero mi base de conocimientos es amplia, teniendo incluso 
          nociones en el área de redes avalada por mis certificaciones CCNA.
        </p>
        <p>
          Actualmente, estoy enfocado en el futuro y en el aprendizaje continuo. 
          Me encuentro perfeccionando mi dominio del frontend moderno con React, explorando 
          el mundo de la visualización y análisis de datos con Power BI, y adentrándome en las
          prácticas de DevOps a través de Docker. Mi objetivo es claro: combinar todas estas 
          habilidades para diseñar y construir soluciones tecnológicas completas, que no solo
          sean funcionales y eficientes, sino también inteligentes y capaces de aportar un valor real y medible.
        </p>
        <div className="social-links">
          <a href="https://github.com/Ariiies" target="_blank" rel="noopener noreferrer">
            <img src="/github-icon.svg" alt="GitHub" width="32" height="32" />
          </a>
          <a href="https://www.linkedin.com/in/luis-aries-meza-castillo-a53727263" target="_blank" rel="noopener noreferrer">
            <img src="/linkedin-icon.svg" alt="LinkedIn" width="32" height="32" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;