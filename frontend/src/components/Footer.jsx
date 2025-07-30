import React from 'react';
import useBackend from '../hooks/useBackend';

const Footer = () => {
  const { message } = useBackend();

  return (
    <footer className="footer">
      <p>&copy; 2025 Luis Aries Meza Castillo. Todos los derechos reservados. (Made in React + Vite)</p>
      <p className="status">Estado del backend: {message}</p>
    </footer>
  );
};

export default Footer;