import React from 'react';
import style from './DescriptionOfAquapark.module.css'

const DescriptionOfAquapark = () => {
    return (
        <div className={style.descriptionOfAquapark}>
            <div className="wrapper">
                <h2>Чем<br/>заняться?</h2>
                <div className={style.textBlock}>
                    <div className={style.container}>
                        <div className={style.leftTextBlock}>
                            <h4>Отдых</h4>
                        </div>
                        <div className={style.rightTextBlock}>
                            <p>
                                На территории аквапарка каждый может найти для себя развлечение —
                                выбрать предстоит из прохождения полосы препятствий с горками, катания
                                на SUPах, спортивных и электрических катамаранах и отдыха
                                в детском лягушатнике.
                            </p>
                        </div>
                    </div>
                    <div className={style.container}>
                        <div className={style.leftTextBlock}>
                            <h4>Спорт</h4>
                        </div>
                        <div className={style.rightTextBlock}>
                            <p>
                                Наш аквапарк — это не только развлечение, но и пространство для занятий спортом.
                                После прохождения полосы препятствий вы точно станете выносливее и увереннее!
                            </p>
                        </div>
                    </div>
                    <div className={style.container}>
                        <div className={style.leftTextBlock}>
                            <h4>Мероприятия</h4>
                        </div>
                        <div className={style.rightTextBlock}>
                            <p>
                                В нашем аквапарке вы можете отпраздновать день рождения или провести тимбилдинг.
                                Можно снять весь аквапарк для своей компании по договорной цене.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescriptionOfAquapark;