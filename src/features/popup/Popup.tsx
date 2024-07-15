import React, {useEffect, useState} from 'react';
import style from './Popup.module.css';

type Props = {
    show: boolean
    onClose?: () => void
    children: React.ReactNode
}

const Popup = ({ show, onClose, children }: Props) => {
    const [visible, setVisible] = useState(show);
    const [animateOut, setAnimateOut] = useState(false);
    const [page, setPage] = useState(0);

    const pageDown = () => {
        setPage(prev => prev - 1);
    };
    const pageUp = () => {
        setPage(prev => prev + 1);
    };

    const clonedChild = React.cloneElement(children as React.ReactElement,
        {pageUp, pageDown, page, onClose}
    );


    useEffect(() => {
        if (show) {
            setVisible(true);
            setAnimateOut(false);
        } else {
            setAnimateOut(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setAnimateOut(false);
            }, 300); // Уменьшил время, чтобы совпадало с анимацией
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!visible && !animateOut) {
        return null;
    }

    return (
        <div className={`${style.popupOverlay} ${show ? style.show : animateOut ? style.fadeOut : ''}`}>
            <div className={`${style.popupContent} ${show ? style.show : animateOut ? style.fadeOut : ''}`}
                 onClick={(e) => e.stopPropagation()}>
                <button className={style.closeButton} onClick={onClose}>
                    &times;
                </button>
                {page !== 0 && <button className={style.backButton} onClick={pageDown}>
                    &larr;
                </button>}
                <div className={style.contentWrapper}>
                    {clonedChild}
                </div>

            </div>
        </div>
    );
};

export default Popup;
