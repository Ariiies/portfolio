import React, { useState } from 'react';
import useSendMessage from '../hooks/sendMessage';
import useModal from '../hooks/useModal';
import useNotification from '../hooks/useNotification';
import NotificationModal from './ui/NotificationModal';
import '../styles/notifications.css';

const Contact = ({ onClose }) => { // ← Recibir onClose como prop
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
        title: '¡Mensaje Enviado!',
        message: 'Tu mensaje ha sido enviado correctamente. Te responderé pronto.',
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
        title: 'Error al Enviar',
        message: 'No se pudo enviar tu mensaje. Por favor, intenta de nuevo.',
        duration: 5000
      });
    }
  };

  return (
    <>
      <section id="contact" className="section">
        <h2 className="section-title">Contacto</h2>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Tu nombre"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Tu mensaje..."
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !name || !email || !message}
          >
            {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
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