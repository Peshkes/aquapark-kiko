import React, {useEffect, useState} from 'react';
import style from './StorePage.module.css';
import CardGallery from "features/card-gallery/CardGallery";
import CardWrapper from "features/card-gallery/card-wrapper/CardWrapper";
import {useAppDispatch, useAppSelector} from "core/redux/redux-hooks";
import {CardHeaderGenerator} from "core/CardHeaderGenerator";
import CardStoreFilling from "features/card-gallery/card-store-filling/CardStoreFilling";
import {getSaleAsyncAction} from "core/redux/cart/cartAsyncServerFunctions";
import BackButton from "features/back-button/BackButton";
import {useLocation, useNavigate} from "react-router-dom";
import {
    getInstitutionsAsyncAction,
    getTicketsByInstitutionAsyncAction
} from "core/redux/institutions/ticketsAsyncServerFunctions";
import {SaleRequest} from "core/redux/types";
import {useTranslation} from "react-i18next";
import Popup from "features/popup/Popup";
import CartPopup from "features/popup/cart-popup/CartPopup";


type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    createAlert: (status: string) => void
}

const StorePage = ({setLoading, createAlert}: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {institutions, ticketsOfInstitution, status} = useAppSelector(state => state.tickets);
    const {preliminaryPrice, totalPrice, sale} = useAppSelector(state => state.cart);
    const {institutionId} = useAppSelector(state => state.cart);
    const {isAuth} = useAppSelector(state => state.auth);
    const [couponCode, setCouponCode] = useState<string>("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [headers, setHeaders] = useState<string[]>([]);
    const [index, setIndex] = useState<number>(-1);
    const [pageInstitutionId, setPageInstitutionId] = useState<string | null>(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const isValid = institutionId === pageInstitutionId;
    const {t, i18n} = useTranslation();

    useEffect(() => {
        setLoading(true);
    }, []);

    useEffect(() => {
        if (isAuth && (!institutions || institutions.length === 0)) {
            dispatch(getInstitutionsAsyncAction())
        }
    }, [isAuth, institutions, dispatch]);

    useEffect(() => {
        const link = searchParams.get('park');
        if (link && institutions && institutions.length > 0) {
            const idx = institutions.findIndex(item => item.link === link);
            if (idx === -1) {
                navigate("/error");
            } else {
                setIndex(idx);
                setPageInstitutionId(institutions[idx].institutionId);
            }
        }
    }, [searchParams, institutions, navigate, setLoading]);

    useEffect(() => {
        if (pageInstitutionId && !ticketsOfInstitution.find(ticket => ticket.institutionId === pageInstitutionId)) {
            dispatch(getTicketsByInstitutionAsyncAction(pageInstitutionId));
        }
    }, [pageInstitutionId, ticketsOfInstitution, dispatch]);

    useEffect(() => {
        if (pageInstitutionId) {
            const ticketsIndex = ticketsOfInstitution.findIndex(ticket => ticket.institutionId === pageInstitutionId);
            if (ticketsIndex !== -1) {
                setHeaders(CardHeaderGenerator.getHeaders(ticketsOfInstitution[ticketsIndex].tickets.length));
                setTimeout(() => setLoading(false), 30);
            }
        }
    }, [pageInstitutionId, ticketsOfInstitution]);

    return (
        <div className={style.storePage}>
            {index !== -1 && pageInstitutionId ? (
                <div className="wrapper">
                    <BackButton/>
                    {institutions.length > 0 && <h2>{institutions[index][i18n.language === 'ru' ? 'ru_name' : 'en_name']}</h2>}
                    {ticketsOfInstitution && ticketsOfInstitution.length > 0 ? (
                        <>
                            {ticketsOfInstitution.find(ticket => ticket.institutionId === pageInstitutionId)?.tickets.length !== 0 ? (
                                <CardGallery>
                                    {ticketsOfInstitution.find(ticket => ticket.institutionId === pageInstitutionId)?.tickets.map((item, idx) => (
                                        <CardWrapper key={idx} headerImage={headers[idx]}>
                                            <CardStoreFilling
                                                type={item.type}
                                                description={item.description}
                                                tickets={item.institutionTickets}
                                                institutionId={pageInstitutionId}
                                            />
                                        </CardWrapper>
                                    ))}
                                </CardGallery>
                            ) : (
                                <p>{status}</p>
                            )}
                        </>
                    ) : (
                        <p>{status}</p>
                    )}
                    <div className={style.calculateBlock}>
                        {sale === 0 && (
                            <div className={style.left}>
                                <input
                                    type="text"
                                    placeholder={t("storePage.coupon.coupon")}
                                    onChange={(event) => setCouponCode(event.target.value)}
                                />
                                <button onClick={() => dispatch(getSaleAsyncAction({
                                    couponCode,
                                    institutionId
                                } as SaleRequest))}>{t("storePage.coupon.apply")}
                                </button>
                            </div>
                        )}
                        <div className={style.right + " " + (sale !== 0 ? style.onlyOne : "")}>
                            {sale !== 0 && <div>
                                <p><span className={style.sale}>Скидка: {sale}%</span></p>
                            </div>}
                            <div>
                                <p>
                                    {sale !== 0 && <span className={style.preliminaryPrice}>{preliminaryPrice}р.</span>}
                                    {sale !== 0 && <span> </span>}
                                    <span className={style.totalPrice}>{isValid ? totalPrice + t("storePage.rub") : 0}</span>
                                </p>
                            </div>
                            <button disabled={!isValid} onClick={() => setIsPopupOpen(true)}>{t("storePage.buy")}</button>
                        </div>
                    </div>
                </div>

            ) : (
                <p>{status}</p>
            )}
            <Popup onClose={() => setIsPopupOpen(false)} show={isPopupOpen}><CartPopup createAlert={createAlert}/></Popup>
        </div>
    );
};

export default StorePage;
