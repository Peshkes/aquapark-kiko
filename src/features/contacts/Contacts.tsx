import React from 'react';
import style from './Contacts.module.css';

const Contacts = () => {
    return (
        <div className={style.contacts}>
            <div className={"wrapper"}>
                <h2>Контакты</h2>
            </div>
            <div className={style.wrapper}>
                <div className={style.leftBlock}>
                    <h4>Адреса:</h4>
                    <br/>
                    <p><a href="https://yandex.com/navi/org/44065923372" target={"_blank"} rel="noreferrer">Московская
                        обл., Курово, спортивно-развлекательный комплекс "Сорочаны"</a></p>
                    <br/>
                    <h4>Можете с нами связаться с помощью:</h4>
                    <br/>
                    <p><a href="mailto:worldtechnologywater@gmail.com" target={"_blank"} rel="noreferrer">Email:
                        worldtechnologywater@gmail.com</a></p>
                    <p><a href="tel:+79857467889" target={"_blank"} rel="noreferrer">Телефон: +7 (985) 746-78-89</a></p>
                    <p><a href="https://wapp.click/79857467889" target={"_blank"} rel="noreferrer">WhatsApp: +7 (985)
                        746-78-89</a></p>
                    <p><a href="https://t.me/Peshkes" target={"_blank"} rel="noreferrer">Telegram: +7 (911)
                        111-20-00</a></p>
                </div>
                <div className={style.rightBlock}>
                    <iframe title={"map"}
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A3e63d1b798d8ff68136c6cda62c942a468b64d64e967491a1e143935205e373a&amp;source=constructor">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Contacts;