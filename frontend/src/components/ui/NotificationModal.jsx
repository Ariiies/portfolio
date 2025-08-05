import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';

const NotificationModal = ({ 
  isOpen, 
  onClose, 
  type = 'info', 
  title, 
  message,
  showButtons = true 
}) => {
  const { t } = useTranslation();

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="notification-icon success">
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
          </svg>
        );
      case 'error':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="notification-icon error">
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,7A1,1 0 0,0 11,8V12A1,1 0 0,0 12,13A1,1 0 0,0 13,12V8A1,1 0 0,0 12,7M12,17.5A1.5,1.5 0 0,0 13.5,16A1.5,1.5 0 0,0 12,14.5A1.5,1.5 0 0,0 10.5,16A1.5,1.5 0 0,0 12,17.5Z"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="notification-icon warning">
            <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
          </svg>
        );
      default:
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="notification-icon info">
            <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
          </svg>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`notification-content ${type}`}>
        <div className="notification-header">
          {getIcon()}
          <h3 className="notification-title">{title}</h3>
        </div>
        
        <div className="notification-body">
          <p className="notification-message">{message}</p>
        </div>
        
        {showButtons && (
          <div className="notification-actions">
            <button className={`notification-button ${type}`} onClick={onClose}>
              {t('notifications.close_button')}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NotificationModal;