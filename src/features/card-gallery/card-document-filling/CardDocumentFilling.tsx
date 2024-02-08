import React from 'react';
import style from './CardDocumentFilling.module.css';
import {MyDocument} from "shared/types";

const CardDocumentFilling = ({title, link}: MyDocument) => {
    return (
        <a className={style.anchor} href={link} target={"_blank"} rel="noreferrer">{title}</a>
    );
};

export default CardDocumentFilling;