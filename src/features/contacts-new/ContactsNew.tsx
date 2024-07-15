import React from 'react';
import style from './ContactsNew.module.css';
import {useTranslation} from "react-i18next";

const ContactsNew = () => {
    const {t} = useTranslation();
    return (
        <div className={style.contacts}>
            <h2>{t('contacts.title')}</h2>
            <div className={style.container}>
                <div className={style.left}>
                    <div className={style.top + " spawn-opacity-animation"}>
                        <h4>{t('contacts.addresses')}:</h4>
                        <br/>
                        <p><a href="https://yandex.com/navi/org/44065923372" target={"_blank"} rel="noreferrer">Московская
                            обл., Курово, спортивно-развлекательный комплекс "Сорочаны"</a></p>
                    </div>
                    <div className={style.bottom + " spawn-opacity-animation"}>
                        <h4>{t('contacts.means')}:</h4>
                        <br/>
                        <p><a href="mailto:worldtechnologywater@gmail.com" target={"_blank"} rel="noreferrer">Email:
                            worldtechnologywater@gmail.com</a></p>
                        <p><a href="tel:+79857467889" target={"_blank"} rel="noreferrer">{t('contacts.phone')}: +7 (985) 746-78-89</a>
                        </p>
                        <p><a href="https://wapp.click/79857467889" target={"_blank"} rel="noreferrer">WhatsApp: +7
                            (985)
                            746-78-89</a></p>
                        <p><a href="https://t.me/Peshkes" target={"_blank"} rel="noreferrer">Telegram: +7 (911)
                            111-20-00</a></p>
                    </div>
                </div>
                <div className={style.right + " spawn-opacity-animation"}>
                    <iframe title={"map"}
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A3e63d1b798d8ff68136c6cda62c942a468b64d64e967491a1e143935205e373a&amp;source=constructor">
                    </iframe>
                </div>

            </div>
        </div>
    );
};

export default ContactsNew;
