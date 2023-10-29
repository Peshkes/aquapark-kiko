import MainPage from 'modules/main-page/MainPage';
import React, {useEffect} from 'react';
import './App.css';

function App() {
    useEffect(()=>{
        window.addEventListener('scroll', () => {
            document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`) // Update method
        })
    },[])
    return (
        <div className="App">
            <MainPage/>
        </div>
    );
}

export default App;
