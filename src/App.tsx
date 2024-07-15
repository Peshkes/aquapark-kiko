import MainPage from 'modules/main-page/MainPage';
import React, {useEffect, useState} from 'react';
import './App.css';
import 'shared/backgroundTopAnimals.css';
import 'shared/backgroundMiddleAnimals.css';
import {Route, Routes} from "react-router-dom";
import StorePage from "modules/store-page/StorePage";
import DocumentsPage from "modules/documents-page/DocumentsPage";
import ErrorPage from "modules/error-page/ErrorPage";
import Footer from "features/footer/Footer";
import './core/localisation/i18n';
import {useAppDispatch, useAppSelector} from "core/redux/redux-hooks";
import {loginAsync} from "core/redux/auth/authAsyncServerFunctions";
import Loading from "features/loading/Loading";
import Popup from "features/popup/Popup";
import AlertPopup from "features/popup/alert-popup/AlertPopup";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const {isAuth} = useAppSelector(state => state.auth);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertStatus, setAlertStatus] = useState<string>("");

    const createAlert = (status: string) => {
        setAlertStatus(status);
        setIsAlertOpen(true);
    };

    const destroyAlert = () => {
        setAlertStatus("");
        setIsAlertOpen(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const currentScrollPosition = window.scrollY;
            document.documentElement.style.setProperty('--scrollTop', `${currentScrollPosition}px`);
        })
    }, []);

    useEffect(() => {
        if (!isAuth) {
            dispatch(loginAsync());
        }
    }, [isAuth, dispatch]);

    return (
        <div className="app">
            {loading && <Loading/>}
            <Popup show={isAlertOpen} onClose={destroyAlert}><AlertPopup status={alertStatus}/></Popup>
            <Routes>
                <Route path={"/"} element={<MainPage setLoading={setLoading}/>}/>
                <Route path={"/store"}  element={<StorePage setLoading={setLoading} createAlert={createAlert}/>}/>
                <Route path={"/documents"} element={<DocumentsPage setLoading={setLoading}/>}/>
                <Route path={"*"} element={<ErrorPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
