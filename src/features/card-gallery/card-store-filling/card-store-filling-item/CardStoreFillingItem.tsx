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
        setCount(prevCount => {
            const newCount = prevCount + 1;
            if (prevCount === 0) {
                dispatch(addToCart({ ticket: ticket, count: 1 }));
            } else {
                dispatch(changeCountOfItemTo({ ticket: ticket, count: newCount }));
            }
            return newCount;
        });
    }

    function handleDecrement() {
        setCount(prevCount => {
            if (prevCount > 0) {
                const newCount = prevCount - 1;
                if (newCount === 0) {
                    dispatch(removeFromCart({ ticket: ticket }));
                } else {
                    dispatch(changeCountOfItemTo({ ticket: ticket, count: newCount }));
                }
                return newCount;
            }
            return prevCount;
        });
    }

    return (
        <div className={style.item}>
            <p className={style.hours}>{hours === 1 ? hours + " час" : hours >= 7 ? "День" : hours + " часов"}</p>
            <p>{ticket.price + "р."}</p>
            <div className={style.counter}>
                <button onClick={handleDecrement}>-</button>
                <p>{count}</p>
                <button onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};

export default CardStoreFillingItem;