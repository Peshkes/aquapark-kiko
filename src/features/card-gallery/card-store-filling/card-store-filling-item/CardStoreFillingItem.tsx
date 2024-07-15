import React, {useEffect} from 'react';
import {InstitutionTicket as Ticket} from 'core/redux/types';
import {useAppDispatch, useAppSelector} from 'core/redux/redux-hooks';
import {addToCart, changeCountOfItemTo, removeFromCart} from 'core/redux/cart/cartSlice';
import style from './CardStoreFillingItem.module.css';
import {useTranslation} from "react-i18next";

type Props = {
    ticket: Ticket;
    type: string
    institutionId: string | null;
};

const CardStoreFillingItem = ({ ticket, type, institutionId }: Props) => {
    const cartItem = useAppSelector(state =>
        state.cart.cart.find(item => item.ticket.institutionTicketId === ticket.institutionTicketId)
    );
    const count = cartItem ? cartItem.count : 0;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const hours = ticket.time / 60;

    useEffect(() => {
        if (count === 0) {
            dispatch(removeFromCart({ ticket }));
        } else {
            dispatch(changeCountOfItemTo({ ticket, count }));
        }
    }, [count, dispatch, ticket]);

    const handleIncrement = () => {
        if (count === 0) {
            dispatch(addToCart({ cartItem: {ticket, count: 1, type}, institutionId: institutionId || '' }));
        } else {
            dispatch(changeCountOfItemTo({ ticket, count: count + 1 }));
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            dispatch(changeCountOfItemTo({ ticket, count: count - 1 }));
        } else {
            dispatch(removeFromCart({ ticket }));
        }
    };

    return (
        <div className={style.item}>
            <p className={style.hours}>{hours === 1 ? hours + " " + t("storePage.times.hour") : hours >= 7 ? t("storePage.times.day") : hours + " " + t("storePage.times.hours")}</p>
            <p>{ticket.price + t("storePage.rub")}</p>
            <div className={style.counter}>
                <button onClick={handleDecrement}>-</button>
                <p>{count}</p>
                <button onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};

export default CardStoreFillingItem;
