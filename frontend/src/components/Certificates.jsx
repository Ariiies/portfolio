import React from 'react';

const Certificates = () => {
  const certificates = [
    { title: 'PCAP-Certified Associate in Python Programming', issuer: 'Python Institute', year: 2021 },
    { title: 'Programming Essentials in Python', issuer: 'Cisco Networking Academy', year: 2021 },
    { title: 'Complete Web Development Course', issuer: 'Udemy', year: 2021 },
    { title: 'Python Masterclass: Python, Django, Flask, and TKinter', issuer: 'Udemy', year: 2021 },
    { title: 'Introduction to Data Science', issuer: 'Santander Open Academy & IE University', year: 2024 },
    { title: 'Curso de PHP Moderno', issuer: 'Udemy', year: 2025 },
    { title: 'Java Programmer Course', issuer: 'Edutyn Academy', year: 2021 },
    { title: 'CCNA R&S: Introduction to Networks', issuer: 'Cisco Networking Academy', year: 2019 },
    { title: 'CCNA R&S: Routing and Switching Essentials', issuer: 'Cisco Networking Academy', year: 2019 },
    { title: 'CCNA R&S: Scaling Networks', issuer: 'Cisco Networking Academy', year: 2020 },
    { title: 'Excel Course', issuer: 'Santander Open Academy', year: 2024 },
    { title: 'JavaScript Essentials 1', issuer: 'Cisco Networking Academy', year: 2025 },
    { title: 'Laravel 12: de 0 a experto', issuer: 'Udemy', year: 2025 },
  ];

  return (
    <section id="certificates" className="section">
      <h2 className="section-title">Certificados</h2>
      <div className="card-grid">
        {certificates.map((cert, index) => (
          <div className="card" key={index}>
            <h3>{cert.title}</h3>
            <p>{cert.issuer} - {cert.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;