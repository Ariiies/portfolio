import { useState } from 'react';
import { buildApiUrl, getDefaultFetchOptions, APP_CONFIG } from '../config/api';

const useSendMessage = () => {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (messageData) => {
    setIsLoading(true);
    setStatus('Enviando...');
    
    try {
      // ===== USAR CONFIGURACIÓN CENTRALIZADA =====
      const url = buildApiUrl('messages');
      const options = getDefaultFetchOptions({
        method: 'POST',
        body: JSON.stringify({
          name: messageData.name,
          email: messageData.email,
          message: messageData.message
        })
      });

      // Debug en desarrollo
      if (APP_CONFIG.isDevelopment && APP_CONFIG.showConsoleLogs) {
        console.log('📡 Enviando mensaje a:', url);
        console.log('📝 Datos:', messageData);
      }

      const response = await fetch(url, options);

      if (response.ok) {
        const result = await response.json();
        setStatus('Mensaje enviado con éxito');
        setIsLoading(false);
        
        if (APP_CONFIG.isDevelopment) {
          console.log('✅ Mensaje enviado exitosamente:', result);
        }
        
        return { success: true, data: result };
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || 'No se pudo enviar el mensaje';
        
        setStatus(`Error: ${errorMessage}`);
        setIsLoading(false);
        
        if (APP_CONFIG.isDevelopment) {
          console.error('❌ Error del servidor:', response.status, errorData);
        }
        
        return { success: false, error: errorData };
      }
    } catch (error) {
      console.error('❌ Error al enviar mensaje:', error);
      setStatus('Error de conexión. Por favor, intenta de nuevo.');
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const clearStatus = () => {
    setStatus('');
  };

  return {
    sendMessage,
    status,
    isLoading,
    clearStatus
  };
};

export default useSendMessage;