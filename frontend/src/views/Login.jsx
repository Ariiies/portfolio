import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useAuth();

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error cuando el usuario empiece a escribir
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!formData.username || !formData.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      const result = await login(formData);
      
      if (result.success) {
        // Login exitoso - redireccionar al home
        navigate('/');
      } else {
        // Mostrar error específico
        setError(result.error || 'Error de autenticación');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error inesperado. Intenta de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Panel de Administración</h1>
            <p className="login-subtitle">Inicia sesión para continuar</p>
          </div>

          {error && (
            <div className="error-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ingresa tu usuario"
                required
                disabled={isLoading}
                className="form-input"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                required
                disabled={isLoading}
                className="form-input"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.username || !formData.password}
              className="login-button"
            >
              {isLoading ? (
                <>
                  <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none" 
                      strokeDasharray="32" 
                      strokeDashoffset="32"
                    >
                      <animate 
                        attributeName="stroke-dashoffset" 
                        dur="1s" 
                        values="32;0" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  </svg>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="back-link">
              <a href="/" className="back-to-portfolio">
                ← Volver al Portafolio
              </a>
            </p>
            <p className="login-info">
              <small>Acceso solo para administradores</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;