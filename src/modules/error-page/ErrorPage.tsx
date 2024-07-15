import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import style from './ErrorPage.module.css';

const ErrorPage = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    navigate('/');
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className={style.errorPage}>
            <h2>{t('errorPage.error')} 404</h2>
            <p>{t('errorPage.page') + " " + location.pathname + " " + t('errorPage.notFound')}</p>
            <div className={style.redirect}>
                <button onClick={handleRedirect}>{t('errorPage.goToHome')}</button>
                <p>{t('errorPage.redirectMessage') + " " + countdown + " " + t('errorPage.seconds')}</p>
            </div>
        </div>
    );
};

export default ErrorPage;
