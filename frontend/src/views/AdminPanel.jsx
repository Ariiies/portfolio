import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/authContext';
import { buildApiUrl, getAuthFetchOptions, APP_CONFIG } from '../config/api';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [error, setError] = useState(null);
  
  // Obtener el token del contexto de autenticación
  const { token, user } = useAuth();

  // Memoizar la función fetchMessages para evitar re-renders
  const fetchMessages = useCallback(async () => {
    try {
      if (APP_CONFIG.isDevelopment) {
        console.log('🔄 Cargando mensajes...');
      }
      
      // Verificar que tenemos token
      if (!token) {
        setError('No se encontró token de autenticación');
        setLoading(false);
        return;
      }

      // ===== USAR CONFIGURACIÓN CENTRALIZADA =====
      const url = buildApiUrl('messages');
      const options = getAuthFetchOptions(token, {
        method: 'GET'
      });

      if (APP_CONFIG.isDevelopment) {
        console.log('📡 Haciendo request a:', url);
      }

      const response = await fetch(url, options);

      if (APP_CONFIG.isDevelopment) {
        console.log('📡 Response status:', response.status);
      }

      if (response.ok) {
        const data = await response.json();
        
        if (APP_CONFIG.isDevelopment) {
          console.log('📨 Mensajes cargados:', data.length);
        }
        
        setMessages(data);
        // Seleccionar el primer mensaje por defecto si hay mensajes
        if (data.length > 0 && !selectedMessage) {
          setSelectedMessage(data[0]);
        }
        setError(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Error al cargar mensajes:', response.status, errorData);
        setError(`Error al cargar mensajes: ${errorData.detail || response.statusText}`);
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      setError(`Error de conexión con el servidor. Verifica que el backend esté corriendo en ${APP_CONFIG.apiUrl}`);
    } finally {
      setLoading(false);
    }
  }, [token, selectedMessage]); // Solo depende del token y selectedMessage

  useEffect(() => {
    // Solo ejecutar si tenemos token
    if (token) {
      fetchMessages();
    }
  }, [fetchMessages]);

  const deleteMessage = async (messageId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      return;
    }

    try {
      if (APP_CONFIG.isDevelopment) {
        console.log('🗑️ Eliminando mensaje:', messageId);
      }
      
      // ===== USAR CONFIGURACIÓN CENTRALIZADA =====
      const url = buildApiUrl(`messages/${messageId}`);
      const options = getAuthFetchOptions(token, {
        method: 'DELETE'
      });

      if (APP_CONFIG.isDevelopment) {
        console.log('🗑️ DELETE request a:', url);
      }
      
      const response = await fetch(url, options);
      
      if (response.ok) {
        const updatedMessages = messages.filter(msg => msg.id !== messageId);
        setMessages(updatedMessages);
        
        // Si el mensaje eliminado era el seleccionado, seleccionar otro
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage(updatedMessages.length > 0 ? updatedMessages[0] : null);
        }
        
        if (APP_CONFIG.isDevelopment) {
          console.log('✅ Mensaje eliminado exitosamente');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Error al eliminar:', errorData);
        alert(`Error al eliminar mensaje: ${errorData.detail || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error de conexión al intentar eliminar el mensaje');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando mensajes...</p>
          {APP_CONFIG.isDevelopment && (
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              Conectando a: {APP_CONFIG.apiUrl}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Mostrar error si hay alguno
  if (error) {
    return (
      <div className="admin-container">
        <div className="error-container">
          <div className="error-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style={{color: '#e53e3e', marginBottom: '1rem'}}>
              <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/>
            </svg>
            <h2>Error al cargar el panel</h2>
            <p>{error}</p>
            {APP_CONFIG.isDevelopment && (
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#666', 
                marginTop: '0.5rem',
                padding: '0.5rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                textAlign: 'left'
              }}>
                <strong>Debug info:</strong><br />
                API URL: {APP_CONFIG.apiUrl}<br />
                Environment: {APP_CONFIG.environment}<br />
                Has Token: {token ? 'Yes' : 'No'}
              </div>
            )}
            <button 
              onClick={() => window.location.reload()} 
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <h1 className="admin-title">Panel de Administración</h1>
          <div className="header-info">
            <span className="welcome-text">Bienvenido, {user?.name || user?.username}</span>
            <span className="message-count">{messages.length} mensajes</span>
            {APP_CONFIG.isDevelopment && (
              <span style={{ fontSize: '0.7rem', color: '#888' }}>
                ({APP_CONFIG.environment})
              </span>
            )}
          </div>
          <div className="header-actions">
            <a href="/" className="back-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
              </svg>
              Volver al Portafolio
            </a>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="admin-content">
        {/* Lista de mensajes (izquierda) */}
        <div className="messages-sidebar">
          <div className="sidebar-header">
            <h2>Mensajes de Contacto</h2>
          </div>
          
          {messages.length === 0 ? (
            <div className="no-messages">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="no-messages-icon">
                <path d="M20,6L9,17L4,12L5.4,10.6L9,14.2L18.6,4.6L20,6Z"/>
              </svg>
              <p>No hay mensajes de contacto</p>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-item ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="message-item-header">
                    <h3 className="message-name">{message.name}</h3>
                    <span className="message-date">
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="message-email">{message.email}</p>
                  <p className="message-preview">
                    {message.message.length > 100 
                      ? message.message.substring(0, 100) + '...' 
                      : message.message
                    }
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vista detallada del mensaje (derecha) */}
        <div className="message-detail">
          {selectedMessage ? (
            <div className="detail-content">
              <div className="detail-header">
                <div className="sender-info">
                  <h2 className="sender-name">{selectedMessage.name}</h2>
                  <a href={`mailto:${selectedMessage.email}`} className="sender-email">
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="message-meta">
                  <span className="message-id">ID: #{selectedMessage.id}</span>
                  <span className="message-timestamp">
                    {formatDate(selectedMessage.created_at)}
                  </span>
                </div>
              </div>

              <div className="detail-body">
                <h3>Mensaje:</h3>
                <div className="message-content">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="detail-actions">
                <a 
                  href={`mailto:${selectedMessage.email}?subject=Re: Tu mensaje de contacto&body=Hola ${selectedMessage.name},%0D%0A%0D%0AGracias por contactarme.%0D%0A%0D%0ASaludos,%0D%0ALuis Aries`}
                  className="action-button reply-button"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10,9V5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9Z"/>
                  </svg>
                  Responder
                </a>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="action-button delete-button"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="no-selection-icon">
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
              </svg>
              <h3>Selecciona un mensaje</h3>
              <p>Elige un mensaje de la lista para ver los detalles completos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;