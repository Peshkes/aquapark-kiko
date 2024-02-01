import React from 'react';
import style from './MainPage.module.css';
import MainParallaxPicture from "features/main-parallax-picture/MainParallaxPicture";
import DescriptionOfAquapark from "features/description-of-aquapark/DescriptionOfAquapark";
import VideoBanner from "features/video-banner/VideoBanner";
import Photos from "features/photos/Photos";
import Prices from "features/prices/Prices";
import Faq from "features/faq/Faq";
import Contacts from "features/contacts/Contacts";
import Footer from "features/footer/Footer";
import TelegramForm from "features/telegram-form/TelegramForm";

const MainPage = () => {
    return (
        <div className={style.mainPage}>
            <MainParallaxPicture/>
            <div className={style.underWaterBlock}>
                <DescriptionOfAquapark/>
                <VideoBanner/>
                <Photos/>
                <Prices/>
                <Faq/>
                <TelegramForm/>
                <Contacts/>
                <Footer/>
            </div>
        </div>
    );
};
export default MainPage;