import React from 'react';
import style from './QuestionBlock.module.css';
import {Question} from "shared/types";

type Props = {
    isOpen: boolean
    onToggle: () => void
} & Question;

const QuestionBlock = ({question, answer, isOpen, onToggle}: Props) => {
    return (
        <div className={`${style.block} ${isOpen ? style.open : ''}`} onClick={onToggle}>
            <div className={style.question}>
                <h4>{question}</h4>
            </div>
            <div className={style.answer}>
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default QuestionBlock;