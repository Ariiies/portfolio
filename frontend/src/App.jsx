import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// ===== IMPORTS DE COMPONENTES =====
import Portfolio from './components/Portfolio';
import Login from './views/Login';
import AdminPanel from './views/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// ===== TEST DE CONFIGURACIÓN (solo en desarrollo) =====
if (import.meta.env.DEV) {
  import('./config/test-config');
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;