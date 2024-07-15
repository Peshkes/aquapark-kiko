import React from 'react';
import {InstitutionTicket as Ticket} from 'core/redux/types'
import CardStoreFillingItem
    from "features/card-gallery/card-store-filling/card-store-filling-item/CardStoreFillingItem";
import style from "./CardStoreFilling.module.css"
import {useTranslation} from "react-i18next";

type Props = {
    type: string
    description: string
    tickets: Ticket[],
    institutionId: string | null
}
const CardStoreFilling = ({tickets, type, description, institutionId}: Props) => {
    const {t} = useTranslation();
    return (
        <div>
            <h4>{t('storePage.types.' + type)}</h4>
            <p className={style.description}>{t('storePage.descriptions.' + description)}</p>
            {tickets.map((item, index) => (<CardStoreFillingItem type={type} ticket={item} key={type + "_" + index} institutionId={institutionId}/>))}
        </div>
    );
};

export default CardStoreFilling;
