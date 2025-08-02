import React, { useState } from 'react';
import profileImage from '../assets/img/ari.jpg';
import Modal from './ui/Modal';
import Contact from './Contact';
import Navbar from './ui/Navbar';
import ImageModal from './ui/ImageModal'; // <--- Importa el modal de imagen
import '../styles/Header.css';

const Header = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null); // <--- Estado para la imagen

  const openContactModal = (e) => {
    if (e) e.preventDefault();
    setIsContactModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <header>
      {/* === NAVBAR CON FUNCIÓN DE CONTACTO === */}
      <Navbar onContactClick={openContactModal} />
      
      {/* === SECCIÓN HERO === */}
      <section className="hero">
        <div className="hero-left">
          <img 
            src={profileImage} 
            alt="Luis Aries Meza Castillo" 
            className="profile-photo"
            style={{ cursor: 'pointer' }} 
            onClick={() => setModalImg(profileImage)} // <--- Abre el modal al hacer click
            onError={(e) => {
              console.log('Error cargando imagen de perfil');
              e.target.style.display = 'none';
            }}
          />
          <h1 className="hero-title">Luis Aries Meza Castillo</h1>
          <p className="hero-subtitle">
            🪪 Ingeniero en Tecnología Computacional
          </p>
          <p className="hero-subtitle">
            🐍 PCAP - Python 
          </p>
          <p className="hero-location">
            📍 Guadalajara, Jal. MX.
          </p>
        </div>
        
        <div className="hero-right">
          <h2 className="right-subtitle">Bienvenido a mi portafolio</h2>
          <p className="hero-description">
            Mi nombre es Aries, soy un ingeniero en tecnología especializado en desarrollo web, 
            inteligencia artificial y visión por computadora.
            <br/> <br/>
            Soy una persona apasionada por la programación y la creación de soluciones innovadoras que optimizan procesos y mejoran la experiencia del usuario.
            Cuento con conocimientos y experiencia en Python, JavaScript, PHP, Laravel, React, FastAPI y tecnologías de Machine Learning.
          </p>
        </div>
      </section>
      
      {/* === MODAL DE CONTACTO === */}
      <Modal isOpen={isContactModalOpen} onClose={closeContactModal}>
        <Contact onClose={closeContactModal} />
      </Modal>

      {/* === MODAL DE IMAGEN DE PERFIL === */}
      <ImageModal src={modalImg} alt="Foto de perfil" onClose={() => setModalImg(null)} />
    </header>
  );
};

export default Header;