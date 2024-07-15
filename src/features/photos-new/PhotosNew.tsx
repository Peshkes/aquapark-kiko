import React from 'react';
import style from './PhotosNew.module.css';
import {useTranslation} from "react-i18next";
// @ts-ignore
import image1 from 'assets/photo-gallery/111.webp';
import image2 from 'assets/photo-gallery/112.webp';
import image3 from 'assets/photo-gallery/113.webp';
import image4 from 'assets/photo-gallery/114.webp';
import image5 from 'assets/photo-gallery/115.webp';


const images = [
    {image: image1, title: "test"},
    {image: image2, title: "test"},
    {image: image3, title: "test"},
    {image: image4, title: "test"},
    {image: image5, title: "test"},
];

const PhotosNew = () => {
    const {t} = useTranslation();
    return (
        <div className={style.photos}>
            <h2>{t('photo')}</h2>
            <div className={style.container}>
                <div className={style.top}>
                    <div className={style.t1 + " spawn-opacity-animation"}>
                        <img src={images[0].image} alt={images[0].title}/>
                    </div>
                    <div className={style.t2 + " spawn-opacity-animation"}>
                        <img src={images[1].image} alt={images[1].title}/>
                    </div>
                    <div className={style.t3 + " spawn-opacity-animation"}>
                        <img src={images[2].image} alt={images[2].title}/>
                    </div>
                </div>
                <div className={style.bot}>
                    <div className={style.b1 + " spawn-opacity-animation"}>
                        <img src={images[3].image} alt={images[3].title}/>
                    </div>
                    <div className={style.b2 + " spawn-opacity-animation"}>
                        <img src={images[4].image} alt={images[4].title}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotosNew;
