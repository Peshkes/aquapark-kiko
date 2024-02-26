import React, {FormEvent, useState} from 'react';
import style from './TelegramForm.module.css'

const TelegramForm = () => {
    const [phone, setPhone] = useState('+7');
    const [isValidPhone, setIsValidPhone] = useState(true);
    const phoneNumberPattern = /^\+7\d{10}$/;

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidPhone) {
            const botToken = '';
            const chatId = '';
            try {
                await fetch(
                    `https://api.telegram.org/bot${botToken}/sendMessage`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: `Телефон: ${phone}\nИмя: ${name}\nСообщение: ${message}`,
                        }),
                    }
                );
                alert('Сообщение отправлено успешно!')
                setPhone('+7');
                setName('');
                setMessage('');
                setIsValidPhone(true);
            } catch (error) {
                alert('Ошибка:' + error);
            }
        } else {
            alert('Введите корректный номер телефона');
        }
    };

    return (
        <div className={style.telegramForm}>
            <div className={style.headerBlock + " wrapper"}>
                <h2>Форма связи</h2>
            </div>
            <div className={"wrapper"}>
                <div className={style.block}>
                    <div className={style.leftBlock}>
                        <h4>Если у вас есть какие-то жалобы, предложения, может, просто хотите что-то нам сказать, для
                            вас есть эта форма.</h4>
                    </div>
                    <div className={style.rightBlock}>
                        <form onSubmit={handleSendMessage}>
                            <label>Телефон:</label>
                            <input
                                required={true}
                                type="string"
                                value={phone}
                                placeholder={"+79111112000"}
                                onChange={(e) => setPhone(e.target.value)}
                                onBlur={() => setIsValidPhone(phoneNumberPattern.test(phone))}
                            />
                            {!isValidPhone && (
                                <p style={{color: 'red'}}>Введите корректный номер телефона</p>
                            )}
                            <label>Имя:</label>
                            <input
                                required={true}
                                type="text"
                                value={name}
                                placeholder={"Кот Матроскин"}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label>Сообщение:</label>
                            <textarea
                                required={true}
                                value={message}
                                placeholder={"Как заставить бутер падать колбасой в рот, а не вниз?"}
                                rows={3} // Вы можете установить желаемое количество строк
                                style={{resize: 'none'}}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <button type="submit">Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TelegramForm;
