import React from 'react';
import style from './VideoBanner.module.css'
import {useTranslation} from "react-i18next";

const VideoBanner = () => {
    const {t} = useTranslation();
    return (
        <div className={style.videoBanner}>
            <h2>{t('video')}</h2>
            <div id={'animatedWhale'} className={style.animatedWhale + " spawn-opacity-animation"}>
                <iframe className={style.video} src="https://www.youtube.com/embed/rUc7az-L1zw?si=UGsOJI1zW9stsTLW"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen frameBorder={0}>
                </iframe>
            </div>
        </div>
    );
};

export default VideoBanner;
