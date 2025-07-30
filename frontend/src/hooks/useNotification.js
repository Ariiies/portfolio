import { useState } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState({
    isVisible: false,
    type: '', // 'success', 'error', 'warning', 'info'
    title: '',
    message: '',
    autoClose: true,
    duration: 3000
  });

  const showNotification = ({ type, title, message, autoClose = true, duration = 3000 }) => {
    setNotification({
      isVisible: true,
      type,
      title,
      message,
      autoClose,
      duration
    });

    if (autoClose) {
      setTimeout(() => {
        hideNotification();
      }, duration);
    }
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
};

export default useNotification;