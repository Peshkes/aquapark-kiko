import React, {useEffect, useState} from 'react';
import style from './VerticalLineWithMarkers.module.css';

const VerticalLineWithMarkers = () => {
    const [pixelPerMeter, setPixelPerMeter] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [grandParentHeight, setGrandParentHeight] = useState(0);
    const [offset, setOffset] = useState(100);

    useEffect(() => {
        // @ts-ignore
        const parent = document.getElementById('underWaterBlock');
        let parentHeight = 0;
        if (parent != null) {
            if (parent.clientWidth < 1125){
                if (offset !== 50)
                    setOffset(50)
            } else if (parent.clientWidth < 1280 ){
                if (offset !== 100)
                    setOffset(100)
            } else
                if (offset !== 250)
                    setOffset(250)
            parentHeight = parent.clientHeight - offset;
            // @ts-ignore
            setGrandParentHeight(parent.previousSibling.firstChild.clientHeight)
        }
        const meters = 6000;
        const pixelPerMeter = parentHeight / meters;
        setPixelPerMeter(pixelPerMeter);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const currentPosition = (scrollTop - 100 - offset) / pixelPerMeter;
            setCurrentPosition(currentPosition);
        };


        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pixelPerMeter]);

    return (
        <div className={style.lineContainer}>
            <div className={style.line}>
                <style>
                    {`
                        #currentPosition {
                            top: ${grandParentHeight - 100}px;
                        }
                        @media screen and (max-width: 585px) {
                            #currentPosition {
                                top: ${grandParentHeight - 50}px;
                            }
                        }
                    `}
                </style>
                <div id={"currentPosition"} className={style.currentPosition}>
                    <p>
                        {Math.round(currentPosition) < 0 ? "0m" : Math.round(currentPosition) > 6000 ? "6000m" : Math.round(currentPosition) + "m"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerticalLineWithMarkers;
