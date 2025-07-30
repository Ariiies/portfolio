import { APP_CONFIG, buildApiUrl } from './api';

// Función para probar la configuración
export const testConfiguration = () => {
  console.group('🧪 Test de Configuración');
  
  console.log('📊 Variables de entorno:');
  console.table({
    'VITE_API_URL': import.meta.env.VITE_API_URL,
    'VITE_APP_NAME': import.meta.env.VITE_APP_NAME,
    'VITE_ENVIRONMENT': import.meta.env.VITE_ENVIRONMENT,
    'MODE': import.meta.env.MODE,
    'DEV': import.meta.env.DEV,
    'PROD': import.meta.env.PROD
  });
  
  console.log('⚙️ Configuración procesada:');
  console.table(APP_CONFIG);
  
  console.log('🔗 URLs de ejemplo:');
  console.log('Root:', buildApiUrl(''));
  console.log('Messages:', buildApiUrl('messages'));
  console.log('Auth:', buildApiUrl('auth/login'));
  
  console.groupEnd();
};

// Ejecutar test automáticamente en desarrollo
if (APP_CONFIG.isDevelopment) {
  testConfiguration();
}