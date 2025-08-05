import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSendMessage from '../hooks/sendMessage';
import useModal from '../hooks/useModal';
import useNotification from '../hooks/useNotification';
import NotificationModal from './ui/NotificationModal';
import '../styles/notifications.css';

const Contact = ({ onClose }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Hooks
  const { sendMessage, isLoading } = useSendMessage();
  const { notification, showNotification, hideNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enviar el mensaje
    const result = await sendMessage({
      name,
      email,
      message
    });
    
    if (result.success) {
      // Limpiar formulario
      setName('');
      setEmail('');
      setMessage('');
      
      // Mostrar notificación de éxito
      showNotification({
        type: 'success',
        title: t('contact.success_title'),
        message: t('contact.success_message'),
        duration: 4000
      });

      // ✅ CERRAR EL MODAL DE CONTACTO AUTOMÁTICAMENTE
      if (onClose) {
        setTimeout(() => {
          onClose(); // Cerrar el modal de contacto después de 1.5 segundos
        }, 1500);
      }
    } else {
      // Mostrar notificación de error
      showNotification({
        type: 'error',
        title: t('contact.error_title'),
        message: t('contact.error_message'),
        duration: 5000
      });
    }
  };

  return (
    <>
      <section id="contact" className="section">
        <h2 className="section-title">{t('contact.title')}</h2>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label htmlFor="name">{t('contact.name_label')}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={t('contact.name_placeholder')}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="email">{t('contact.email_label')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('contact.email_placeholder')}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="message">{t('contact.message_label')}</label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder={t('contact.message_placeholder')}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !name || !email || !message}
          >
            {isLoading ? t('contact.submitting_button') : t('contact.submit_button')}
          </button>
        </form>
      </section>

      {/* Modal de Notificación */}
      <NotificationModal
        isOpen={notification.isVisible}
        onClose={hideNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </>
  );
};

export default Contact;