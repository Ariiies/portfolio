import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import About from './About';
import Education from './Education';
import Certificates from './Certificates';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import '../styles/TabNavigation.css';

const TabNavigation = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('about');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { id: 'about', label: t('tabs.about'), component: About },
    { id: 'education', label: t('tabs.education'), component: Education },
    { id: 'certificates', label: t('tabs.certificates'), component: Certificates },
    { id: 'skills', label: t('tabs.skills'), component: Skills },
    { id: 'projects', label: t('tabs.projects'), component: Projects },
    /*{ id: 'contact', label: 'Contacto', component: Contact },*/
  ];

  // Escuchar cambios en el hash de la URL para sincronizar con el navbar
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Quitar el #
      if (hash && tabs.some(tab => tab.id === hash)) {
        setActiveTab(hash);
      }
    };

    // Ejecutar al cargar y cuando cambie el hash
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsDropdownOpen(false); // Cerrar dropdown al seleccionar
    // Actualizar la URL sin recargar la página
    window.history.pushState(null, '', `#${tabId}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mobile-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || About;
  const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label || t('tabs.about');

  return (
    <div className="tab-container">
      {/* Navegación de pestañas */}
      <nav className="tab-navigation">
        {/* Vista Desktop - Tabs horizontales */}
        <div className="tab-list desktop-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vista Mobile - Dropdown */}
        <div className="mobile-dropdown">
          <button 
            className="dropdown-toggle"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            <span>{activeTabLabel}</span>
            <svg 
              className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="currentColor"
            >
              <path d="M4 6l4 4 4-4z"/>
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`dropdown-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Contenido de la pestaña activa */}
      <div className="tab-content">
        <div
          className="content-wrapper slide-animate"
          key={activeTab} 
        >
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
