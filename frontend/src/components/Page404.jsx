import React from "react";
import { useTranslation } from "react-i18next";
import img404 from '../assets/404.svg'

const Page404 = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('notFound.alt')}
        className="img-fluid h-25"
        src={img404}
      />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.text')} <a href="/">{t('notFound.link')}</a>
      </p>
    </div>
  );
};

export default Page404;
