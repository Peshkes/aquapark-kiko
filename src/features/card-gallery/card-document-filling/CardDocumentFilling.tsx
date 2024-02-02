import React from 'react';
import style from './CardDocumentFilling.module.css';

type Props = {
    title: string
    link: string
}

const CardDocumentFilling = ({title, link}: Props) => {
    return (
        <a className={style.anchor} href={link} target={"_blank"} rel="noreferrer">{title}</a>
    );
};

export default CardDocumentFilling;