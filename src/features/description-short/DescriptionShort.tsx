import React from 'react';
import style from './DescriptionShort.module.css'
import {useTranslation} from "react-i18next";

const DescriptionShort = () => {
    const {t} = useTranslation();
    return (
        <div className={style.container}>
            <p className={style.text + " spawn-opacity-animation"}>{t('descriptionShort.first')}</p>
            <p className={style.text + " " + style.middle + " spawn-opacity-animation"}>{t('descriptionShort.second')}</p>
            <p className={style.text + " spawn-opacity-animation"}>{t('descriptionShort.third')}</p>
        </div>
    );
};

export default DescriptionShort;
