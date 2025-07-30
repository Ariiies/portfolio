import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { buildApiUrl, getDefaultFetchOptions, getAuthFetchOptions, APP_CONFIG } from '../config/api';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  if (APP_CONFIG.isDevelopment) {
    console.log('🔍 useAuth hook llamado');
  }
  
  const context = useContext(AuthContext);
  
  if (APP_CONFIG.isDevelopment) {
    console.log('🔍 Context value:', context ? 'Context exists' : 'No context');
  }
  
  if (!context) {
    console.error('❌ useAuth debe ser usado dentro de un AuthProvider');
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('authToken', null);
  const [user, setUser] = useLocalStorage('authUser', null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Debug en desarrollo
  if (APP_CONFIG.isDevelopment) {
    console.log('🔍 AuthProvider state:', {
      hasToken: !!token,
      hasUser: !!user,
      username: user?.username,
      isAuthenticated,
      isLoading
    });
  }

  // Verificar si hay token válido al cargar la aplicación
  useEffect(() => {
    if (token && user) {
      setIsAuthenticated(true);
      if (APP_CONFIG.isDevelopment) {
        console.log('✅ Usuario autenticado detectado:', user.username);
      }
    } else {
      setIsAuthenticated(false);
      if (APP_CONFIG.isDevelopment) {
        console.log('❌ No hay usuario autenticado');
      }
    }
  }, [token, user]);

  // Función de login
  const login = async (credentials) => {
    setIsLoading(true);
    
    try {
      // ===== USAR CONFIGURACIÓN CENTRALIZADA =====
      const url = buildApiUrl('auth/login');
      const options = getDefaultFetchOptions({
        method: 'POST',
        body: JSON.stringify(credentials)
      });

      if (APP_CONFIG.isDevelopment) {
        console.log('🔐 Intentando login en:', url);
        console.log('📝 Credenciales:', { 
          username: credentials.username, 
          password: '***' 
        });
      }

      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        setUser(data.user);
        setIsAuthenticated(true);
        
        if (APP_CONFIG.isDevelopment) {
          console.log('✅ Login exitoso:', {
            username: data.user.username,
            isAdmin: data.user.is_admin,
            tokenLength: data.access_token.length
          });
        }
        
        return { success: true, user: data.user };
      } else {
        if (APP_CONFIG.isDevelopment) {
          console.error('❌ Error de login:', response.status, data);
        }
        return { success: false, error: data.detail || 'Error de autenticación' };
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      return { 
        success: false, 
        error: `Error de conexión: ${error.message}. Verifica que el backend esté corriendo en ${APP_CONFIG.apiUrl}` 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Función de logout
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Llamar al endpoint de logout (opcional)
      if (token) {
        const url = buildApiUrl('auth/logout');
        const options = getAuthFetchOptions(token, {
          method: 'POST'
        });

        if (APP_CONFIG.isDevelopment) {
          console.log('🚪 Ejecutando logout en:', url);
        }

        await fetch(url, options);
      }
    } catch (error) {
      console.error('❌ Error en logout:', error);
      // No es crítico si falla el logout en el servidor
    } finally {
      // Limpiar estado local siempre
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      
      if (APP_CONFIG.isDevelopment) {
        console.log('✅ Logout completado, estado limpiado');
      }
    }
  };

  // Verificar token
  const verifyToken = async () => {
    if (!token) {
      if (APP_CONFIG.isDevelopment) {
        console.log('⚠️ No hay token para verificar');
      }
      return false;
    }

    try {
      const url = buildApiUrl('auth/verify-token');
      const options = getAuthFetchOptions(token, {
        method: 'POST'
      });

      if (APP_CONFIG.isDevelopment) {
        console.log('🔍 Verificando token en:', url);
      }

      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        
        if (APP_CONFIG.isDevelopment) {
          console.log('✅ Token válido:', data.valid);
        }
        
        return data.valid;
      } else {
        if (APP_CONFIG.isDevelopment) {
          console.log('❌ Token inválido:', response.status);
        }
        return false;
      }
    } catch (error) {
      console.error('❌ Error verificando token:', error);
      return false;
    }
  };

  // Obtener información del usuario actual
  const getCurrentUser = async () => {
    if (!token) {
      if (APP_CONFIG.isDevelopment) {
        console.log('⚠️ No hay token para obtener usuario');
      }
      return null;
    }

    try {
      const url = buildApiUrl('auth/me');
      const options = getAuthFetchOptions(token, {
        method: 'GET'
      });

      if (APP_CONFIG.isDevelopment) {
        console.log('👤 Obteniendo usuario actual desde:', url);
      }

      const response = await fetch(url, options);

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        
        if (APP_CONFIG.isDevelopment) {
          console.log('✅ Usuario actualizado:', userData.username);
        }
        
        return userData;
      } else {
        if (APP_CONFIG.isDevelopment) {
          console.error('❌ Error obteniendo usuario:', response.status);
        }
        return null;
      }
    } catch (error) {
      console.error('❌ Error obteniendo usuario actual:', error);
      return null;
    }
  };

  const value = {
    // Estado
    isAuthenticated,
    isLoading,
    user,
    token,
    
    // Funciones
    login,
    logout,
    verifyToken,
    getCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};