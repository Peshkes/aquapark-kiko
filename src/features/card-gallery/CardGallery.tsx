import React, {ReactNode} from 'react';
import style from './CardGallery.module.css'

type Props = {
    children: ReactNode
}
const CardGallery = ({children}: Props) => {
    return (
        <div className={style.gallery}>
            {children}
        </div>
    );
};

export default CardGallery;