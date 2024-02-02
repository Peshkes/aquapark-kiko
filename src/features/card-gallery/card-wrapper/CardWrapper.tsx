import React, {ReactNode} from 'react';
import style from './CardWrapper.module.css';

type Props = {
    headerImage: string
    children: ReactNode
}
const CardWrapper = ({children, headerImage}: Props) => {
    return (
        <div className={style.cardWrapper}>
            <div className={style.head}>
                <img src={headerImage} alt={"card header"}/>
            </div>
            <div className={style.body}>
                {children}
            </div>
        </div>
    );
};

export default CardWrapper;