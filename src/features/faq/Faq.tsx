import React, {useState} from 'react';
import style from './Faq.module.css'
import {Question} from "shared/types";
import QuestionBlock from "features/faq/questionBlock/QuestionBlock";

const questions: Array<Question>= [
    {question: "Нужно ли бронировать билеты в аквапарк?", answer: "Нет, не нужно."},
    {
        question: "Хочу приехать большой компанией, но боюсь, что не хватит места.",
        answer: "Если вы собираетесь приехать большой компанией для проведения какого-либо мероприятия, " +
            "то рекомендуем сначала связаться с нами по любому каналу связи, уточнить, нет ли мероприятий на " +
            "этот день и при необходимости забронировать столики."
    },
    {
        question: "Хотел поехать в аквапарк, ждал выходных. Проснулся, а на улице дождь :(",
        answer: "Не стоит расстраиваться раньше времени. Если на улице тепло, то мы работаем! Рекомендуем связаться с нами и уточнить ситуацию."
    },
    {
        question: "Моему сыну 2 года, но он не боится воды и всё умеет.",
        answer: "К несчастью, по условиям сертификации аквапарка, мы не можем пускать на аттракцион детей младше 4-х лет"
    }
]
const Faq = () => {
    const [openIndex, setOpenIndex] = useState(-1);
    const toggleAnswer = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
    };
    return (
        <div className={style.faq}>
            <div className="wrapper">
                <div className={style.header}>
                    <h2>FAQ</h2>
                </div>
                <div>
                    {questions.map((item, index) =>
                        (<QuestionBlock question={item.question} answer={item.answer}
                                        isOpen={index === openIndex}  onToggle={() => toggleAnswer(index)}/>))}
                </div>
            </div>
        </div>
    );
};

export default Faq;