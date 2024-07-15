import React, {FormEvent, useState} from 'react';
import style from './TelegramForm.module.css'
import {useTranslation} from "react-i18next";

const TelegramForm = () => {
    const {t} = useTranslation();

    const [phone, setPhone] = useState('+7');
    const [isValidPhone, setIsValidPhone] = useState(true);
    const phoneNumberPattern = /^\+7\d{10}$/;

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidPhone) {
            try {
                console.log()
                await fetch(
                    `https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/sendMessage`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: process.env.REACT_APP_CHAT_ID,
                            text: `${t('telegramForm.phone')}: ${phone}\n${t('telegramForm.name')}: ${name}\n${t('telegramForm.message')}: ${message}`,
                        }),
                    }
                );
                alert(t('telegramForm.itsOk'));
                setPhone('+7');
                setName('');
                setMessage('');
                setIsValidPhone(true);
            } catch (error) {
                alert(t('telegramForm.error') + ':' + error);
            }
        } else {
            alert('Введите корректный номер телефона');
        }
    };

    return (
        <div className={style.telegramForm}>
            <h2>{t('telegramForm.title')}</h2>
            <div className={style.block + " spawn-opacity-animation"}>
                <div className={style.leftBlock}>
                    <h4>{t('telegramForm.description')}</h4>
                </div>
                <div className={style.rightBlock}>
                    <form onSubmit={handleSendMessage}>
                        <label>{t('telegramForm.phone')}:</label>
                        <input
                            required={true}
                            type="string"
                            value={phone}
                            placeholder={"+79111112000"}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => setIsValidPhone(phoneNumberPattern.test(phone))}
                        />
                        {!isValidPhone && (
                            <p style={{color: 'red'}}>{t('telegramForm.errorText')}</p>
                        )}
                        <label>{t('telegramForm.name')}:</label>
                        <input
                            required={true}
                            type="text"
                            value={name}
                            placeholder={t('telegramForm.namePlaceholder')}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>{t('telegramForm.message')}:</label>
                        <textarea
                            required={true}
                            value={message}
                            placeholder={t('telegramForm.messagePlaceholder')}
                            rows={3}
                            style={{resize: 'none'}}
                            onChange={(e) => setMessage(e.target.value)}
                        />

                        <button type="submit">{t('telegramForm.submit')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TelegramForm;
