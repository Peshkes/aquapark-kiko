import React from 'react';
import style from './AlertPopup.module.css'

type Props = {
    status: string
    pageUp?: () => void
    pageDown?: () => void
    page?: number
}
const AlertPopup = ({status}: Props) => {
    return (
        <div className={style.alert}>
            <p>{status}</p>
        </div>
    );
};

export default AlertPopup;
