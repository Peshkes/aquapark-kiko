import React from 'react';
import {CartItem} from "core/redux/types";
import style from "./TicketsPopupItem.module.css";

type Props = {
    ticketItem: CartItem
};
const TicketPopupItem = ({ticketItem}: Props) => {
    const hours = ticketItem.ticket.time / 60;
    return (
        <div className={style.listItem}>
            <span>{ticketItem.type}</span>
            <span>{hours === 1 ? hours + " час" : hours >= 7 ? "День" : hours + " часа"}</span>
            <span>{`${ticketItem.count} х ${ticketItem.ticket.price}р.`}</span>
            <span>{`${ticketItem.ticket.price * ticketItem.count}р.`}</span>
        </div>
    );
};

export default TicketPopupItem;
