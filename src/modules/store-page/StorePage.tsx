import React, {useEffect} from 'react';
import style from './StorePage.module.css';
import {useNavigate} from "react-router-dom";
import CardGallery from "features/card-gallery/CardGallery";
import CardWrapper from "features/card-gallery/card-wrapper/CardWrapper";
import Footer from "features/footer/Footer";
import {useAppDispatch, useAppSelector} from "core/redux/redux-hooks";
import {getTicketsAsyncAction} from "core/redux/async-actions/getTickets";
import {CardHeaderGenerator} from "services/CardHeaderGenerator";
import CardStoreFilling from "features/card-gallery/card-store-filling/CardStoreFilling";

const StorePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {data, status} = useAppSelector(state => state.ticketsReducer)

    const headers = CardHeaderGenerator.getHeaders(data.length);

    useEffect(() => {
        if (data.length === 0)
            dispatch(getTicketsAsyncAction());
    }, []);

    return (
        <div className={style.storePage}>
            <div className="wrapper">
                <button onClick={() => navigate('/')}>← Всплыть на главную</button>
                {data.length !== 0 ?
                    <CardGallery>
                        <>
                            {data.map((item, index) => (
                                <CardWrapper headerImage={headers[index]}>
                                    <CardStoreFilling type={item.type} description={item.description} tickets={item.tickets} />
                                </CardWrapper>
                            ))}
                        </>
                    </CardGallery>
                    :
                    <p>{status}</p>
                }
            </div>
            <Footer/>
        </div>
    );
};

export default StorePage;