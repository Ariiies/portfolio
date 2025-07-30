/**
 * Configuración centralizada de la API
 * 
 * IMPORTANTE: En React/Vite, las variables deben empezar con VITE_
 * Ejemplo: VITE_API_URL, VITE_APP_NAME, etc.
 */

// ===== CONFIGURACIÓN DE LA API =====
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ===== CONFIGURACIÓN GENERAL DE LA APP =====
export const APP_CONFIG = {
  // URL base de la API
  apiUrl: API_BASE_URL,
  
  // Nombre de la aplicación
  appName: import.meta.env.VITE_APP_NAME || 'Mi Portafolio',
  
  // Entorno actual
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  
  // Banderas de entorno (automáticas de Vite)
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // Modo actual
  mode: import.meta.env.MODE
};

// ===== FUNCIONES HELPER =====

/**
 * Construye URL completa para un endpoint
 * @param {string} endpoint - El endpoint (ej: '/messages/', '/auth/login')
 * @returns {string} URL completa
 */
export const buildApiUrl = (endpoint) => {
  // Limpiar el endpoint
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const finalEndpoint = cleanEndpoint.endsWith('/') ? cleanEndpoint : `${cleanEndpoint}/`;
  
  return `${API_BASE_URL}${finalEndpoint}`;
};

/**
 * Opciones por defecto para fetch
 * @param {object} additionalOptions - Opciones adicionales
 * @returns {object} Opciones de fetch configuradas
 */
export const getDefaultFetchOptions = (additionalOptions = {}) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      ...additionalOptions.headers
    },
    ...additionalOptions
  };
};

/**
 * Opciones para fetch con autenticación
 * @param {string} token - Token de autenticación
 * @param {object} additionalOptions - Opciones adicionales
 * @returns {object} Opciones de fetch con Authorization header
 */
export const getAuthFetchOptions = (token, additionalOptions = {}) => {
  return getDefaultFetchOptions({
    ...additionalOptions,
    headers: {
      'Authorization': `Bearer ${token}`,
      ...additionalOptions.headers
    }
  });
};

// ===== DEBUG EN DESARROLLO =====
if (APP_CONFIG.isDevelopment) {
  console.group('🔧 Configuración de API');
  console.log('API URL:', APP_CONFIG.apiUrl);
  console.log('Entorno:', APP_CONFIG.environment);
  console.log('Modo:', APP_CONFIG.mode);
  console.log('Es desarrollo:', APP_CONFIG.isDevelopment);
  console.log('Es producción:', APP_CONFIG.isProduction);
  console.groupEnd();
}

// ===== VALIDACIONES =====
if (!API_BASE_URL) {
  console.warn('⚠️ VITE_API_URL no está definida, usando localhost por defecto');
}

// ===== EXPORTACIONES ADICIONALES =====
export default {
  API_BASE_URL,
  APP_CONFIG,
  buildApiUrl,
  getDefaultFetchOptions,
  getAuthFetchOptions
};