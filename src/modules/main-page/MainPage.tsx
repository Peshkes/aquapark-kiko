import React, {useEffect, useRef} from 'react';
import style from './MainPage.module.css';
import MainParallaxPicture from "features/main-parallax-picture/MainParallaxPicture";
import DescriptionOfAquapark from "features/description-of-aquapark/DescriptionOfAquapark";
import VideoBanner from "features/video-banner/VideoBanner";
import Prices from "features/prices/Prices";
import Faq from "features/faq/Faq";
import TelegramForm from "features/telegram-form/TelegramForm";
import VerticalLineWithMarkers from "features/vertical-line-with-markers/VerticalLineWithMarkers";
import DescriptionShort from "features/description-short/DescriptionShort";
import EmptyBlock from "features/empty-block/EmptyBlock";
import ContactsNew from "features/contacts-new/ContactsNew";
import PhotosNew from "features/photos-new/PhotosNew";
import Follower from "features/follower/Follower";

import whales from "assets/fishes/top/whales.webp";
import manyFishes from "assets/fishes/top/manyfishes.webp";
import snake from "assets/fishes/top/snake.webp";
import jelly from "assets/fishes/middle/jelly.webp";
import octo from "assets/fishes/middle/octo.webp";
import flat from "assets/fishes/middle/flat.webp";
import longfish from "assets/fishes/middle/longfish.webp";
import blackFishes from "assets/fishes/middle/black-fishes.webp";
import blackWhale from "assets/fishes/middle/black-whale.webp";
import turtles from "assets/fishes/middle/turtles.webp";
import {getInstitutionsAsyncAction} from "core/redux/institutions/ticketsAsyncServerFunctions";
import {useAppDispatch, useAppSelector} from "core/redux/redux-hooks";

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const MainPage = ({setLoading}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const {isAuth} = useAppSelector(state => state.auth);
    const {institutions} = useAppSelector(state => state.tickets);

    useEffect(() => {
        function onEntry(entry: any[]) {
            entry.forEach(change => {
                if (change.isIntersecting) {
                    change.target.classList.add('shown');
                }
            });
        }

        const options = {
            threshold: [0.5]
        };

        const observer = new IntersectionObserver(onEntry, options);
        const elements = document.querySelectorAll('.spawn-opacity-animation');

        elements.forEach(elm => {
            // Наблюдаем только за теми элементами, у которых еще нет класса 'shown'
            if (!elm.classList.contains('shown')) {
                observer.observe(elm);
            }
        });

        return () => {
            elements.forEach(elm => {
                observer.unobserve(elm);
            });
        };
    }, []);

    useEffect(() => {
        if (!isAuth)
            setLoading(true);
        if (isAuth)
            if (!institutions || institutions.length === 0) {
                dispatch(getInstitutionsAsyncAction())
                    .then(() => setLoading(false));
            }
    }, [isAuth]);

    return (
        <div className={style.mainPage}>
            <div className="wrapper">
                <MainParallaxPicture/>
            </div>
            <div id={"underWaterBlock"} className={style.underWaterBlock}>
                <div className={style.top}>
                    <div className={"wrapper " + style.block}>
                        <img src={whales} alt="whales" id={"whales"} className={"backgroundAnimal"}/>
                        <img src={manyFishes} alt="many fishes" id={"manyFishes"} className={"backgroundAnimal"}/>
                        <img src={snake} alt="snake" id={"snake"} className={"backgroundAnimal"}/>
                        <div className={style.leftSide}>
                            <DescriptionShort/>
                        </div>
                        <div className={style.rightSide}></div>
                    </div>
                </div>
                <div className={style.middle}>
                    <div className={"wrapper " + style.block}>
                        <div className={style.leftSide}>
                            <EmptyBlock/>
                            <img src={turtles} alt="turtles" id={"turtles"} className={"backgroundAnimal"}/>
                            <Prices/>
                            <img src={blackWhale} alt="black whale" id={"blackWhale"} className={"backgroundAnimal"}/>
                            <EmptyBlock/>
                            <img src={flat} alt="flat" id={"flat"} className={"backgroundAnimal"}/>
                            <PhotosNew/>
                        </div>
                        <div className={style.rightSide}>
                            <img src={longfish} alt="longfish" id={"longfish"} className={"backgroundAnimal"}/>
                            <DescriptionOfAquapark/>
                            <img src={jelly} alt="jellyfish" id={"jelly"} className={"backgroundAnimal"}/>
                            <EmptyBlock/>
                            <VideoBanner/>
                        </div>
                        <img src={octo} alt="octopus" id={"octo"} className={"backgroundAnimal"}/>
                    </div>
                </div>
                <div className={style.bottom}>
                    <div className={"wrapper " + style.block} ref={containerRef}>
                        <Follower containerRef={containerRef}/>
                        <div className={style.leftSide}>
                            <TelegramForm/>
                        </div>
                        <div className={style.rightSide}>
                            <Faq/>
                            <img src={blackFishes} alt="black fishes" id={"blackFishes"}
                                 className={"backgroundAnimal"}/>
                            <EmptyBlock/>
                            <ContactsNew/>
                            <EmptyBlock/>
                        </div>
                    </div>
                </div>
                <VerticalLineWithMarkers/>
            </div>
        </div>
    );
};
export default MainPage;
