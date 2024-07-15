import React, {useRef} from 'react';
import style from './QuestionBlock.module.css';
import {Question} from "shared/types";
import Close from "features/icons/Close";

type Props = {
    isOpen: boolean
    onToggle: () => void
} & Question;

const QuestionBlock = ({question, answer, isOpen, onToggle}: Props) => {
    let reRenders = useRef(-1);
    reRenders.current++

    return (
        <div
            className={`${style.block} ${isOpen ? style.open : ''} ${reRenders.current === 0 ? 'spawn-opacity-animation' : ''}`}
            onClick={onToggle}>
            <div className={style.question}>
                <h4>{question}</h4>
                <Close rotate={isOpen ? 0 : 45}/>
            </div>
            <div className={style.answer}>
                <div className={style.hl}/>
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default QuestionBlock;
