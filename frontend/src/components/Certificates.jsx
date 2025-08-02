import React, { useState } from 'react';
import '../styles/Certificates.css';
import { useCertificate } from '../hooks/useCertificates';
import ImageModal from './ui/ImageModal'; // importa el modal

const Certificates = () => {
  const certificates = [
    { title: 'PCAP-Certified Associate in Python Programming', issuer: 'Python Institute', year: 2021, file: '/certificates/pcap.png' },
    { title: 'JavaScript Essentials 1', issuer: 'Cisco Networking Academy', year: 2025, file: '/certificates/js.png' },
    { title: 'Java Programmer Course', issuer: 'Edutyn Academy', year: 2021, file: '/certificates/java.png' },
    { title: 'Complete Web Development Course', issuer: 'Udemy', year: 2021, file: '/certificates/web.png' },
    { title: 'Curso de PHP Moderno', issuer: 'Udemy', year: 2025, file: '/certificates/php.png' },
    { title: 'Python Masterclass: Python, Django, Flask, and TKinter', issuer: 'Udemy', year: 2021, file: '/certificates/masterpython.jpg' },
    { title: 'Laravel 12: de 0 a experto', issuer: 'Udemy', year: 2025, file: '/certificates/laravel.png' },
    { title: 'Introduction to Data Science', issuer: 'Santander Open Academy & IE University', year: 2024, file: '/certificates/datascience.png' },
    { title: 'CCNA R&S: Introduction to Networks', issuer: 'Cisco Networking Academy', year: 2019, file: '/certificates/ccnaintroduction.png' },
    { title: 'CCNA R&S: Routing and Switching Essentials', issuer: 'Cisco Networking Academy', year: 2019, file: '/certificates/ccnaessentials.png' },
    { title: 'CCNA R&S: Scaling Networks', issuer: 'Cisco Networking Academy', year: 2020, file: '/certificates/ccnascalingnet.png' },
    { title: 'Programming Essentials in Python', issuer: 'Cisco Networking Academy', year: 2021, file: '/certificates/pythonessentials.png' },
    { title: 'Excel Course', issuer: 'Santander Open Academy', year: 2024, file: '/certificates/excel.png' },
  ];

  const { selected, selectCertificate, clearSelection } = useCertificate();
  const [leaving, setLeaving] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  //handler para animar salida
  const handleBack = () => {
    setLeaving(true);
    setTimeout(() => {
      setLeaving(false);
      clearSelection();
    }, 250); 
  };

  return (
    <section id="certificates" className="section">
      <h2 className="section-title">Certificados</h2>
      <div className="card-grid">
        {selected === null ? (
          certificates.map((cert, index) => (
            <div
              className="card certificate-card"
              key={index}
              onClick={() => cert.file && selectCertificate(index)}
              tabIndex={0}
              role="button"
              aria-label={`Ver certificado ${cert.title}`}
            >
              <h3>{cert.title}</h3>
              <p>{cert.issuer} - {cert.year}</p>
              {cert.file && <span className="cert-view-link">Ver</span>}
            </div>
          ))
        ) : (
          <div className={`card certificate-card expanded${leaving ? ' leaving' : ''}`}>
            <div className="cert-back-row">
              <button className="cert-back-btn" onClick={handleBack} aria-label="Volver">
                ← Volver
              </button>
            </div>
            <h3>{certificates[selected].title}</h3>
            <p>{certificates[selected].issuer} - {certificates[selected].year}</p>
            {certificates[selected].file ? (
              <img
                src={certificates[selected].file}
                alt={certificates[selected].title}
                className="cert-file-viewer"
                style={{ cursor: 'zoom-in' }}
                onClick={() => setModalImg(certificates[selected].file)}
              />
            ) : (
              <p className="cert-no-file">No hay archivo disponible para este certificado.</p>
            )}
          </div>
        )}
      </div>
      {/* Modal para ver imagen en grande */}
      <ImageModal src={modalImg} alt="Certificado" onClose={() => setModalImg(null)} />
    </section>
  );
};

export default Certificates;