import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/authContext';
import '../styles/ProtectedRoute.css';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { t } = useTranslation();
  const { isAuthenticated, user, isLoading, token } = useAuth();

  // LÓGICA MEJORADA: Si tenemos token y user, considerar autenticado
  const isUserAuthenticated = isAuthenticated || (token && user);

  console.log('🔍 DEBUG ProtectedRoute:');
  console.log('- isAuthenticated (original):', isAuthenticated);
  console.log('- token:', token ? 'EXISTS' : 'NULL');
  console.log('- user:', user ? user.username : 'NULL');
  console.log('- isUserAuthenticated (calculado):', isUserAuthenticated);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    console.log('📋 Estado: isLoading = true');
    return (
      <div className="protected-loading-container">
        <div className="protected-loading-content">
          <div className="loading-spinner"></div>
          <p>{t('protected_route.loading')}</p>
        </div>
      </div>
    );
  }

  // Verificar autenticación con lógica mejorada
  if (!isUserAuthenticated || !user) {
    console.log('❌ Usuario no autenticado');
    return <Navigate to="/login" replace />;
  }

  // Si llegamos aquí, usuario está autenticado y existe
  console.log('✅ Usuario válido, continuando...');

  // Verificar permisos de admin SI ES REQUERIDO
  if (adminOnly) {
    // Verificación robusta para is_admin
    const isAdmin = user.is_admin === true || 
                   user.is_admin === 1 || 
                   user.is_admin === "1" || 
                   user.is_admin === "true" ||
                   Boolean(user.is_admin);
    
    console.log('🔐 Verificando admin:', user.is_admin, '→', isAdmin);
    
    if (!isAdmin) {
      console.log('❌ Sin permisos de admin');
      return (
        <div className="access-denied-container">
          <div className="access-denied-content">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="access-denied-icon">
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17 15.4,17.5 14.8,17.5H9.2C8.6,17.5 8,17 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
            </svg>
            <h2>{t('protected_route.denied_title')}</h2>
            <p>{t('protected_route.denied_message')}</p>
            <div className="access-denied-actions">
              <a href="/" className="back-home-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
                </svg>
                {t('protected_route.back_link')}
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  // Si llegamos aquí, todo está correcto
  console.log('✅ Renderizando children');
  return children;
};

export default ProtectedRoute;