import React from 'react';
import style from "./Prices.module.css"

const Prices = () => {
    return (
        <div className={style.prices}>
            <div className="wrapper">
                <div className={style.leftSide}>
                    <h2>Цены</h2>
                    <a href={"*"}>Московская область<br/>Сокрочаны</a>
                </div>
                <div className={style.rightSide}>
                    <h2>График</h2>
                    <p>Каждый день<br/>10:00 – 19:00</p>
                </div>

            </div>
        </div>
    );
};

export default Prices;