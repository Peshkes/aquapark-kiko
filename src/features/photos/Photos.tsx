import React from 'react';
import style from './Photos.module.css';
// @ts-ignore
import testImage from 'assets/photo-gallery/test-photo.webp';

const Photos = () => {
    const images = [
        {image: testImage, title: "test"},
        {image: testImage, title: "test"},
        {image: testImage, title: "test"},
        {image: testImage, title: "test"},
        {image: testImage, title: "test"},
        {image: testImage, title: "test"},
    ];

    return (
        <div className={'wrapper'}>
            <h2>Фотографии</h2>
            <div className={style.photoBlock}>
                <div className={style.gallery}>
                    {images.map(item => (
                        <div className={style.cell} key={item.title}>
                            <img src={item.image} alt={item.title}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Photos;