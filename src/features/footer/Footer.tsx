import React from 'react';
import style from './Footer.module.css';
import Youtube from "features/socials/Youtube";
import Instagram from "features/socials/Instagram";
import VK from "features/socials/VK";
import Whatsapp from "features/socials/Whatsapp";
import Telegram from "features/socials/Telegram";

const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.informationBlock}>
                <div className={style.links}>
                    <a href="#photos">Галерея</a>
                    <a href="#prices">Цены</a>
                    <a href="*">Документы</a>
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