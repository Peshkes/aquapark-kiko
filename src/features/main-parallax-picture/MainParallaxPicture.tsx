import React from 'react';
import style from './MainParallaxPicture.module.css';

const MainParallaxPicture = () => {
    return (
        <div className={style.mainParallaxPicture}>
            <div className={style.layers}>
                <div className={style.title}>
                    <div className={style.text}><span className={style.lineFirst}>Аквапарк</span><br/><span className={style.lineSecond}>Кико</span></div>
                </div>
                <div className={`${style.layer} ${style.layer7}`}></div>
                <div className={`${style.layer} ${style.layer6}`}></div>
                <div className={`${style.layer} ${style.layer5}`}></div>
                <div className={`${style.layer} ${style.layer4}`}></div>
                <div className={`${style.layer} ${style.layer3}`}></div>
                <div className={`${style.layer} ${style.layer2}`}></div>
            </div>
        </div>
    );
};

export default MainParallaxPicture;