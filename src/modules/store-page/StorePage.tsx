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
    const {data, status} = useAppSelector(state => state.ticketsReducer);
    const {preliminaryPrice, totalPrice, sale} = useAppSelector(state => state.cartReducer);

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
                                    <CardStoreFilling type={item.type} description={item.description}
                                                      tickets={item.tickets}/>
                                </CardWrapper>
                            ))}
                        </>
                    </CardGallery>
                    :
                    <p>{status}</p>
                }
                <div className={style.calculateBlock}>
                    {sale === 0 &&  <div className={style.left}>
                        <input type="text" placeholder={"Введите купон"}/>
                        <button>Применить</button>
                    </div>}
                    <div className={style.right + " " + (sale !== 0 ? style.onlyOne : null)}>
                        {sale !== 0 && <input type="text" value={preliminaryPrice + "р."} className={style.preliminaryPrice} readOnly/>}
                        {sale !== 0 &&<input type="text" value={"-" + sale + "%"}  className={style.sale} readOnly/>}
                        <input type="text" value={totalPrice + "р."}  className={style.totalPrice} readOnly/>
                        <button>Купить</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default StorePage;