import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import profileImage from '../assets/img/ari.jpg';
import Modal from './ui/Modal';
import Contact from './Contact';
import Navbar from './ui/Navbar';
import ImageModal from './ui/ImageModal';
import '../styles/Header.css';

const Header = () => {
  const { t } = useTranslation(); // <--- 2. Llama al hook para obtener la función 't'
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

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
      <Navbar onContactClick={openContactModal} />
      <section className="hero">
        <div className="hero-left">
          <img 
            src={profileImage} 
            // 3. Reemplaza el texto fijo con t('clave_del_json')
            alt={t('header.profile_alt')} 
            className="profile-photo"
            style={{ cursor: 'pointer' }} 
            onClick={() => setModalImg(profileImage)}
            onError={(e) => {
              console.log('Error cargando imagen de perfil');
              e.target.style.display = 'none';
            }}
          />
          <h1 className="hero-title">{t('header.name')}</h1>
          <p className="hero-subtitle">{t('header.subtitle1')}</p>
          <p className="hero-subtitle">{t('header.subtitle2')}</p>
          <p className="hero-location">{t('header.location')}</p>
        </div>
        
        <div className="hero-right">
          <h2 className="right-subtitle">{t('header.welcome')}</h2>
          <p className="hero-description">
            {t('header.description_p1')}
            <br/> <br/>
            {t('header.description_p2')}
          </p>
        </div>
      </section>
      
      <Modal isOpen={isContactModalOpen} onClose={closeContactModal}>
        <Contact onClose={closeContactModal} />
      </Modal>

      <ImageModal 
        src={modalImg} 
        alt={t('header.modal_alt')} 
        onClose={() => setModalImg(null)} 
      />
    </header>
  );
};

export default Header;