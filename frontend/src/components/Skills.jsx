import React from 'react';

const Skills = () => {
  const skills = [
    { category: 'Lenguajes de Programación', items: 'Python, JavaScript, Java, HTML, CSS, PHP' },
    { category: 'Frameworks & Librerías', items: 'Flask, Django, FastAPI, Bootstrap, jQuery, React, Laravel, Livewire' },
    { category: 'Herramientas', items: 'Git, GitHub, Power BI (en progreso), Docker (en progreso)' },
    { category: 'Cloud & Redes', items: 'Certificaciones CCNA' },
    { category: 'Bases de Datos', items: 'SQL' },
    { category: 'Inglés', items: 'Nivel B2' },
  ];

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Habilidades</h2>
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