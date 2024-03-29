import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../res/img/logo.svg';
import '../style/header.scss';

const serverURL = require('../config.json').SERVER_URL;

function App() {
    const [headerInfo, changeHeaderInfo] = useState({
        logging: false
    });

    function getLogging() {
        axios.get(`${serverURL}/headerInfo`, {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => changeHeaderInfo(data))
            .catch(error => console.error(error))
    }

    function signOut() {
        axios.get(`${serverURL}/signOut`, {credentials: 'include', proxy: true,  withCredentials: true})
            .then(() => window.location.replace("/"))
            .catch(error => console.error(error))
    }

    useEffect(()=>{getLogging()}, []);

    function SigninNav() {
        if (headerInfo.logging === false) {
            return (
                <>
                    <Link to="/">home</Link>
                    <Link to="/signin">sign in</Link>
                    <Link to="/signup">sign up</Link>
                </>
            );
        } else {
            return(
                <>
                    {/* <Link to="/user" className='user'><img src={(headerInfo.profileImg === undefined) ? "" : `http://lavi-blog.kro.kr:3030/userImg/${headerInfo.profileImg}.webp`}></img>{headerInfo.id}</Link> */}
                    {/* <div className='user'><img src={(headerInfo.profileImg === undefined) ? "" : `http://lavi-blog.kro.kr:3030/userImg/${headerInfo.profileImg}.webp`}></img>{headerInfo.id}</div> */}
                    <Link to="/">home</Link>
                    <Link to="/write">write</Link>
                    <p onClick={ signOut }>sign out</p>
                </>
            );
        }
    }

    return (
        <>
            <header>
                <div className='headerInner'>
                    <div className='logo'>
                        <Link to="/">
                            <img src={logo} alt='logo' />
                            <h3>Blog</h3>
                        </Link>
                    </div>
                    <nav>
                        <SigninNav />
                    </nav>
                </div>
            </header>
        </>
    );
}

export default App;