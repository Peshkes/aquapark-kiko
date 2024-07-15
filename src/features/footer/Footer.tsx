import React from 'react';
import style from './Footer.module.css';
import Youtube from "features/icons/Youtube";
import Instagram from "features/icons/Instagram";
import VK from "features/icons/VK";
import Whatsapp from "features/icons/Whatsapp";
import Telegram from "features/icons/Telegram";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={style.footer}>
            <div className={style.informationBlock}>
                <div className={style.links}>
                    <a href="/#photos">{t('footer.gallery')}</a>
                    <a href="/#prices">{t('footer.prices')}</a>
                    <a href={'/documents'} onClick={(e) => {
                        e.preventDefault();
                        navigate('/documents');
                    }}>{t('footer.documents')}</a>
                    <div className={style.language}>
                        <p>{t('footer.language')}:</p>
                        <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
                            <option value="en">English</option>
                            <option value="ru">Русский</option>
                        </select>
                    </div>
                </div>
                <div className={style.social}>
                    <Instagram/>
                    <Youtube/>
                    <VK/>
                    <Telegram/>
                    <Whatsapp/>
                </div>
            </div>
        </div>
    );
};

export default Footer;
