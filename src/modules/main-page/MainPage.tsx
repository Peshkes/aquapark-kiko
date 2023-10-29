import React from 'react';
import style from './MainPage.module.css';
import MainParallaxPicture from "features/main-parallax-picture/MainParallaxPicture";
import DescriptionOfAquapark from "features/description-of-aquapark/DescriptionOfAquapark";

const MainPage = () => {
    return (
        <div className={style.mainPage}>
            <MainParallaxPicture/>
            <DescriptionOfAquapark/>
        </div>
    );
};

export default MainPage;