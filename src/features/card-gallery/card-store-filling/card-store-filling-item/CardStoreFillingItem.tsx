import React, {useState} from 'react';
import {Ticket} from "shared/types";
import {useAppDispatch} from "core/redux/redux-hooks";
import {addToCart, changeCountOfItemTo, removeFromCart} from "core/redux/slices/cartSlice";
import style from "./CardStoreFillingItem.module.css";

type Props = {
    ticket: Ticket;
}
const CardStoreFillingItem = ({ticket}: Props) => {
    const dispatch = useAppDispatch();
    const [count, setCount] = useState(0);
    const hours = ticket.time / 60;

    function handleIncrement() {
        if (count === 0)
            dispatch(addToCart({ticket: ticket, count: 1}));
        else
            dispatch(changeCountOfItemTo({ticket: ticket, count: count + 1}));
        setCount(count + 1);
    }

    function handleDecrement() {
        if (count > 0) {
            if (count === 1)
                dispatch(removeFromCart({ticket: ticket}))
            else
                dispatch(changeCountOfItemTo({ticket: ticket, count: count - 1}));
            setCount(count - 1);
        }
    }

    return (
        <div className={style.item}>
            <p>{hours === 1 ? hours + " час" : hours >= 7 ? "День" : hours + " часов"}</p>
            <p>{ticket.price + "р."}</p>
            <div>
                <button onClick={handleDecrement}>-</button>
                <p>{count}</p>
                <button onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};

export default CardStoreFillingItem;