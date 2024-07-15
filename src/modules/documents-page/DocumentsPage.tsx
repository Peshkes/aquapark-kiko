import React, {useEffect, useMemo} from 'react';
import CardGallery from "features/card-gallery/CardGallery";
import {MyDocument} from "shared/types";
import CardWrapper from "features/card-gallery/card-wrapper/CardWrapper";
import CardDocumentFilling from "features/card-gallery/card-document-filling/CardDocumentFilling";
import style from './Documents.module.css';
import {CardHeaderGenerator} from "core/CardHeaderGenerator";
import BackButton from "features/back-button/BackButton";
import {useTranslation} from 'react-i18next';

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentsPage = ({ setLoading }: Props) => {
    const { t } = useTranslation();

    const documentsArray: Array<MyDocument> = useMemo(() => [
        { title: t('documentsPage.about'), link: '*' },
        { title: t('documentsPage.policy'), link: '*' },
        { title: t('documentsPage.public'), link: '*' },
        { title: t('documentsPage.personal'), link: '*' },
    ], [t]);

    useEffect(() => {
        setLoading(false);
    }, []);
    const headers = useMemo(() => CardHeaderGenerator.getHeaders(documentsArray.length), [documentsArray.length]);

    return (
        <div className={style.documentsPage}>
            <div className="wrapper">
                <BackButton />
                <CardGallery>
                    {documentsArray.map((item, index) => (
                        <CardWrapper key={index} headerImage={headers[index]}>
                            <CardDocumentFilling title={item.title} link={item.link} />
                        </CardWrapper>
                    ))}
                </CardGallery>
            </div>
        </div>
    );
};

export default DocumentsPage;
