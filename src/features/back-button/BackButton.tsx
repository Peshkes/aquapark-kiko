import React from 'react';
import style from "./BackButton.module.css";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const BackButton = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <div className={style.backWrapper}>
            <button className={style.backButton} onClick={() => navigate('/')}>← {t('backButton')}</button>
        </div>
    );
};

export default BackButton;
