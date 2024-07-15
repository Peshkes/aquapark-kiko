import React, {useState} from 'react';
import style from './Faq.module.css'
import {Question} from "shared/types";
import QuestionBlock from "features/faq/questionBlock/QuestionBlock";
import {useTranslation} from "react-i18next";

const Faq = () => {
    const {t} = useTranslation();
    const questions: Array<Question> = [
        {
            question: t('faq.first.question'),
            answer: t('faq.first.answer'),
        },
        {
            question: t('faq.second.question'),
            answer: t('faq.second.answer'),
        },
        {
            question: t('faq.third.question'),
            answer: t('faq.third.answer'),
        },
        {
            question: t('faq.fourth.question'),
            answer: t('faq.fourth.answer'),
        }
    ];
    const [openIndex, setOpenIndex] = useState(-1);
    const toggleAnswer = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
    };
    return (
        <div className={style.faq}>
            <h2>{t('faq.title')}</h2>
            <div className={style.faqBlock}>
                {questions.map((item, index) =>
                    (<QuestionBlock question={item.question} answer={item.answer} key={"questionBlock_" + index}
                                    isOpen={index === openIndex} onToggle={() => toggleAnswer(index)}/>))}
            </div>
        </div>
    );
};

export default Faq;
