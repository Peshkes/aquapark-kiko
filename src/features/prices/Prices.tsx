import React from 'react';
import style from "./Prices.module.css"
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "core/redux/redux-hooks";

const Prices = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const {institutions} = useAppSelector(state => state.tickets);

    return (
        <div className={style.prices}>
            <h2>{t('prices.titleFirst')}</h2>
            <div className={style.rightSide + " spawn-opacity-animation"}>
                <p className={"spawn-opacity-animation"}>{t('prices.everyDay')}<br/>{t('prices.time')}</p>
                <div className={style.vl}/>
                <p className={"spawn-opacity-animation"}>{t('prices.regardless')}<br/><span>* {t('prices.mayBe')}</span>
                </p>
            </div>
            <h2>{t('prices.titleSecond')}</h2>
            <div className={style.leftSide + " spawn-opacity-animation"}>
                <p>{t('prices.tap')}</p>
                <div className={style.vl2}/>
                {institutions && institutions.map((item, index) => (
                    <a key={index + 'park'} onClick={() => navigate('/store?park=' + item.link)}>{ i18n.language === 'ru' ? item['ru_name'] : item['en_name']}</a>
                ))}
            </div>
        </div>
    );
};

export default Prices;
