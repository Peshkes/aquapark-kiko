import React from 'react';
import {Ticket} from "shared/types";
import CardStoreFillingItem
    from "features/card-gallery/card-store-filling/card-store-filling-item/CardStoreFillingItem";
import style from "./CardStoreFilling.module.css"

type Props = {
    type: string
    description: string
    tickets: Ticket[]
}
const CardStoreFilling = ({tickets, type, description}: Props) => {
    return (
        <div>
            <h4>{type}</h4>
            <p className={style.description}>{description}</p>
            {tickets.map((item, index) => (<CardStoreFillingItem ticket={item} key={type + "_" + index}/>))}
        </div>
    );
};

export default CardStoreFilling;