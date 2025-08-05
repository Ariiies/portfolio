import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useTranslation } from 'react-i18next';
import UserDropdown from './UserDropdown';
import logoImage from '../../assets/img/logo2.png';
import LanguageSwitcher from './LanguageSwitcher';
import '../../styles/Navbar.css';
import '../../styles/LanguageSwitcher.css'; 

const Navbar = ({ onContactClick }) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = (e) => {
    onContactClick(e);
    closeMobileMenu(); // Cerrar menú después de contactar
  };

  return (
    <nav className="navbar">
      {/* === LOGO A LA IZQUIERDA (Desktop) === */}
      <div className="navbar-logo desktop-logo">
        <img 
          src={logoImage} 
          alt={t('navbar.logo_alt')}
          className="logo-image"
          onError={(e) => {
            console.log('Error cargando logo, usando fallback de texto');
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'inline';
          }}
        />
        <span className="logo-text fallback" style={{ display: 'none' }}>
          &lt;/&gt; Aries.dev
        </span>
      </div>

      {/* === LOGO MÓVIL === */}
      <div 
        className="navbar-logo mobile-logo" 
        onClick={toggleMobileMenu}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleMobileMenu()}
      >
        <img 
          src={logoImage} 
          alt={t('navbar.logo_menu_alt')}
          className="logo-image"
          onError={(e) => {
            console.log('Error cargando logo móvil, usando fallback de texto');
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'inline';
          }}
        />
        <span className="logo-text fallback" style={{ display: 'none' }}>
          &lt;/&gt; Aries.dev
        </span>
        <div className={`menu-indicator ${isMobileMenuOpen ? 'open' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7,10L12,15L17,10H7Z"/>
          </svg>
        </div>
      </div>

      {/* === NAVEGACIÓN DESKTOP === */}
      <ul className="nav-list desktop-nav">
        <li>
          <a href="https://github.com/Ariiies" target="_blank" rel="noopener noreferrer" className="nav-social" title={t('navbar.github_title')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/luis-aries-meza-castillo-a53727263" target="_blank" rel="noopener noreferrer" className="nav-social" title={t('navbar.linkedin_title')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/></svg>
          </a>
        </li>
        <li className="nav-separator"></li>
        <li>
          <a href="/AriCV.pdf" download="Luis_Aries_Meza_CV.pdf" className="nav-action cv-download compact" title={t('navbar.download_cv_title')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
            CV
          </a>
        </li>
        <li>
          <button onClick={onContactClick} className="nav-action contact-btn" title={t('navbar.contact_title')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>
            {t('navbar.contact_button')}
          </button>
        </li>
        {isAuthenticated && (<li className="nav-user"><UserDropdown /></li>)}
        <li className="nav-separator"></li>
        <li className="language-switcher-container">
          <LanguageSwitcher />
        </li>
      </ul>

      {/* === MENÚ MÓVIL DESPLEGABLE === */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-section">
            <h3 className="mobile-section-title">{t('navbar.mobile_menu_follow')}</h3>
            <div className="mobile-social-links">
              <a href="https://github.com/Ariiies" target="_blank" rel="noopener noreferrer" className="mobile-social-item" onClick={closeMobileMenu}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg>
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/luis-aries-meza-castillo-a53727263" target="_blank" rel="noopener noreferrer" className="mobile-social-item" onClick={closeMobileMenu}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/></svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="mobile-section">
            <h3 className="mobile-section-title">{t('navbar.mobile_menu_actions')}</h3>
            <div className="mobile-actions">
              <a href="/AriCV.pdf" download="Luis_Aries_Meza_CV.pdf" className="mobile-action-item cv-item" onClick={closeMobileMenu}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                <span>{t('navbar.mobile_download_cv')}</span>
              </a>
              <button onClick={handleContactClick} className="mobile-action-item contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>
                <span>{t('navbar.mobile_contact')}</span>
              </button>
            </div>
          </div>

          <div className="mobile-section">
            <h3 className="mobile-section-title">Idioma / Language</h3>
            <div className="mobile-language-switcher">
              <LanguageSwitcher />
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="mobile-section">
              <h3 className="mobile-section-title">{t('navbar.mobile_menu_user')}</h3>
              <div className="mobile-user">
                <UserDropdown />
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;