import MainPage from 'modules/main-page/MainPage';
import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import StorePage from "modules/store-page/StorePage";
import DocumentsPage from "modules/documents-page/DocumentsPage";

function App() {
    useEffect(()=>{
        window.addEventListener('scroll', () => {
            document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`) // Update method
        })
    },[])
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path={"/store"} element={<StorePage/>}/>
                <Route path={"/documents"} element={<DocumentsPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
