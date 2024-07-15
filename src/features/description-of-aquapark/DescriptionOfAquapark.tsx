import React from 'react';
import style from './DescriptionOfAquapark.module.css'
import {useTranslation} from "react-i18next";

const DescriptionOfAquapark = () => {
    const {t} = useTranslation();
    return (
        <div className={style.descriptionOfAquapark}>
            <h2>{t('description.title')}</h2>
            <div className={style.textBlock}>
                <div className={style.container + " spawn-opacity-animation"}>
                    <div className={style.leftTextBlock}>
                        <h4>{t('description.body.first.title')}</h4>
                    </div>
                    <div className={style.vl}/>
                    <div className={style.rightTextBlock}>
                        <p>
                            {t('description.body.first.description')}
                        </p>
                    </div>
                </div>
                <div className={style.container + " spawn-opacity-animation"}>
                    <div className={style.leftTextBlock}>
                        <h4>{t('description.body.second.title')}</h4>
                    </div>
                    <div className={style.vl}/>
                    <div className={style.rightTextBlock}>
                        <p>
                            {t('description.body.second.description')}
                        </p>
                    </div>
                </div>
                <div className={style.container + " spawn-opacity-animation"}>
                    <div className={style.leftTextBlock}>
                        <h4>{t('description.body.third.title')}</h4>
                    </div>
                    <div className={style.vl}/>
                    <div className={style.rightTextBlock}>
                        <p>
                            {t('description.body.third.description')}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DescriptionOfAquapark;
