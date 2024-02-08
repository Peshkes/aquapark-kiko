import React from 'react';
import CardGallery from "features/card-gallery/CardGallery";
import {MyDocument} from "shared/types";
import CardWrapper from "features/card-gallery/card-wrapper/CardWrapper";
import CardDocumentFilling from "features/card-gallery/card-document-filling/CardDocumentFilling";
import Footer from "features/footer/Footer";
import style from './Documents.module.css'
import {CardHeaderGenerator} from "services/CardHeaderGenerator";
import {useNavigate} from "react-router-dom";

const documentsArray: Array<MyDocument> = [
    {title: 'О компании', link: '*'},
    {title: 'Политика конфиденциальности', link: '*'},
    {title: 'Публичная оферта', link: '*'},
    {title: 'Соглашение на обработку персональных данных', link: '*'},
];

const headers = CardHeaderGenerator.getHeaders(documentsArray.length);
const DocumentsPage = () => {
    const navigate = useNavigate();
    return (
        <div className={style.documentsPage}>
            <div className="wrapper">
                <button onClick={()=>navigate('/')}>← Всплыть на главную</button>
                <CardGallery>
                    <>
                        {documentsArray.map((item, index) => (
                            <CardWrapper headerImage={headers[index]}>
                                <CardDocumentFilling title={item.title} link={item.link}/>
                            </CardWrapper>
                        ))}
                    </>
                </CardGallery>
            </div>
            <Footer/>
        </div>
    );
};

export default DocumentsPage;