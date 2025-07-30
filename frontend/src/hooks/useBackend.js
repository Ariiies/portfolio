import { useState, useEffect } from 'react';
import { buildApiUrl, APP_CONFIG } from '../config/api';

const useBackend = () => {
  const [message, setMessage] = useState('Cargando...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ===== USAR CONFIGURACIÓN CENTRALIZADA =====
        const url = buildApiUrl('');  // Endpoint raíz
        
        if (APP_CONFIG.isDevelopment) {
          console.log('📡 Conectando a backend:', url);
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setMessage(data.message);
        
        if (APP_CONFIG.isDevelopment) {
          console.log('✅ Respuesta del backend:', data);
        }
        
      } catch (err) {
        const errorMessage = `Error al conectar con el backend: ${err.message}`;
        setError(err.message);
        setMessage(errorMessage);
        
        if (APP_CONFIG.isDevelopment) {
          console.error('❌ Error de conexión:', err);
          console.error('🔗 URL que falló:', buildApiUrl(''));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { message, loading, error };
};

export default useBackend;