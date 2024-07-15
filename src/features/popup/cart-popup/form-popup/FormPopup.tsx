import React, {useState} from 'react';
import style from './FormPopup.module.css';
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "core/redux/redux-hooks";
import {createNewOrderAsyncAction} from "core/redux/cart/cartAsyncServerFunctions";
import {cleanCart} from "core/redux/cart/cartSlice";
import {CreateOrderRequest} from "core/redux/types";

type Props = {
    createAlert: (status: string) => void;
    onClose?: () => void
}
const FormPopup = ({createAlert, onClose}: Props) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {cart, totalPrice} = useAppSelector(state => state.cart);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(prev => !prev);
    };

    const validateForm = () => {
        const newErrors: string[] = [];

        if (name.trim() === '') {
            newErrors.push(t('storePage.popupForm.errors.nameRequired'));
        }
        if (email.trim() === '') {
            newErrors.push(t('storePage.popupForm.errors.emailRequired'));
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.push(t('storePage.popupForm.errors.emailInvalid'));
        }
        if (confirmEmail.trim() === '') {
            newErrors.push(t('storePage.popupForm.errors.confirmEmailRequired'));
        } else if (email !== confirmEmail) {
            newErrors.push(t('storePage.popupForm.errors.emailsMismatch'));
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const createOrderRequest: CreateOrderRequest = {
                tickets: [],
                sum: totalPrice,
                name,
                email
            };
            cart.forEach(ticket => {
                createOrderRequest.tickets.push({
                    institutionTicketId: ticket.ticket.institutionTicketId,
                    count: ticket.count
                });
            });
            setIsLoading(true);
            dispatch(createNewOrderAsyncAction(createOrderRequest))
                .then(result => {
                    const clearAll = () => {
                        dispatch(cleanCart());
                        setName('');
                        setEmail('');
                        setConfirmEmail('');
                        setIsChecked(false);
                        setErrors([]);
                    }
                    setIsLoading(false);
                    if (result.type === 'cart/createNewOrder/fulfilled') {
                        createAlert(t('storePage.popupForm.success'));
                        if (onClose) {
                            onClose();
                        }
                        clearAll();
                    } else {
                        if (result.payload === 'Request failed with status code 500') {
                            createAlert(t('storePage.popupForm.errorSend'));
                            if (onClose) {
                                onClose();
                            }
                            clearAll();
                        } else {
                            createAlert(t('storePage.popupForm.errorCreation'));
                        }
                    }
                });
        }
    };

    return (
        <div className={style.storeForm}>
            {isLoading &&
                <div className={style.loadingScreen}>
                    <div className={style.spinner}></div>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <label>{t('storePage.popupForm.name')}:</label>
                <input
                    required={true}
                    type="text"
                    value={name}
                    placeholder={t('storePage.popupForm.namePlaceholder')}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>{t('storePage.popupForm.email')}:</label>
                <input
                    required={true}
                    type="email"
                    value={email}
                    placeholder={t('storePage.popupForm.emailPlaceholder')}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>{t('storePage.popupForm.confirmEmail')}:</label>
                <input
                    required={true}
                    type="email"
                    value={confirmEmail}
                    placeholder={t('storePage.popupForm.confirmEmailPlaceholder')}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                />
                {errors.length > 0 && (
                    <div className={style.errors}>
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <div className={style.checkboxContainer}>
                    <label className={style.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className={style.checkbox}
                            required={true}
                        />
                        <p className={style.checkboxText}>
                            {t('storePage.popupForm.checkbox.first')}
                            <a href="*">{t('storePage.popupForm.checkbox.second')}</a>
                            {t('storePage.popupForm.checkbox.third')}
                            <a href="*">{t('storePage.popupForm.checkbox.fourth')}</a>
                        </p>
                    </label>
                </div>
                <button type="submit">{t('storePage.popupForm.submit')}</button>
            </form>
        </div>
    );
};

export default FormPopup;
