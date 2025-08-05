import React from 'react';
import { useTranslation } from 'react-i18next';
import useBackend from '../hooks/useBackend';

const Footer = () => {
  const { t } = useTranslation();
  const { message } = useBackend();

  return (
    <footer className="footer">
      <p>{t('footer.copyright')}</p>
      <p className="status">{t('footer.status_label')}: {message}</p>
    </footer>
  );
};

export default Footer;