import React from 'react';
import style from './MainParallaxPicture.module.css';
// @ts-ignore
import baseImage from 'assets/test-img/layer-base.png';
// @ts-ignore
import middleImage from 'assets/test-img/layer-middle.png';
// @ts-ignore
import frontImage from 'assets/test-img/layer-front.png';

const MainParallaxPicture = () => {
    return (
        <div className={style.mainParallaxPicture}>
            <div className={style.layers}>
                <div className={style.header}>
                    <h1 className={style.title}>АКВАПАРК КИКО</h1>
                </div>
                <div className={style.layer + ' ' + style.base} style={{backgroundImage: `URL(${baseImage})`}}></div>
                <div className={style.layer + ' ' + style.middle} style={{backgroundImage: `URL(${middleImage})`}}></div>
                <div className={style.layer + ' ' + style.front} style={{backgroundImage: `URL(${frontImage})`}}></div>
            </div>
        </div>
    );
};

export default MainParallaxPicture;