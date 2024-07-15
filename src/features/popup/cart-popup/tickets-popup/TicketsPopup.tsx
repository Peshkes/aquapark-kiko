import React, {useState} from 'react';
import {useAppSelector} from "core/redux/redux-hooks";
import TicketPopupItem from "features/popup/cart-popup/tickets-popup/tickets-popup-item/TicketPopupItem";
import style from "./TicketsPopup.module.css";
import {useTranslation} from "react-i18next";

type Props = {
    pageUp?: () => void
}
const TicketsPopup = ({pageUp}: Props) => {
    const {totalPrice, cart, sale} = useAppSelector(state => state.cart);
    const [isChecked, setIsChecked] = useState(false);

    const {t} = useTranslation();

    const handleCheckboxChange = () => {
        setIsChecked(prev => !prev);
    };

    if (cart.length === 0) {
        return (
            <div>
                <p>{t('storePage.empty')}</p>
            </div>
        );
    } else {
        return (
            <div>
                <div className={style.listContainer}>
                    <div className={style.listItem}>
                        <span>{t('storePage.popupTicket.type')}</span>
                        <span>{t('storePage.popupTicket.time')}</span>
                        <span>{t('storePage.popupTicket.count')}</span>
                        <span>{t('storePage.popupTicket.price')}</span>
                    </div>
                </div>
                <div className={style.scrollableList + " " + style.listContainer}>
                    {cart.map((item, index) => (
                        <TicketPopupItem key={index} ticketItem={item}/>
                    ))}
                </div>
                <div className={style.listContainer}>
                    <div className={style.bottomListItem}>
                        <span
                            className={style.totalPrice + " " + style.totalPriceText}>{sale ? t('storePage.coupon.sale') + ":" : ""}</span>
                        <span className={style.totalPrice}>{sale ? sale + "%" : ""}</span>
                        <span
                            className={style.totalPrice + " " + style.totalPriceText}>{t('storePage.popupTicket.total') + ':'}</span>
                        <span className={style.totalPrice}>{totalPrice + t('storePage.rub')}</span>
                    </div>
                </div>
                <div className={style.bottom}>
                    <div>
                        <div className={style.checkboxContainer}>
                            <label className={style.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className={style.checkbox}
                                />
                                {t('storePage.popupTicket.sure')}
                            </label>
                        </div>
                        <p className={style.disclaimer}>
                            {t('storePage.popupTicket.disclaimer')}
                        </p>
                    </div>
                    <div className={style.buttonBlock}>
                        <button disabled={!isChecked} onClick={pageUp}>
                            {t('storePage.buy')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default TicketsPopup;
