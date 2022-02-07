import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../res/img/logo.svg';

function App() {
    const [logging, changeLogging] = useState("");

    function getLogging() {
        axios.get("http://localhost:3030/api/logging", {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {changeLogging(data.logging); console.log(data)})
            .catch(error => console.error(error))
    }

    function signOut() {
        axios.post("http://localhost:3030/api/signOut", {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => {console.log("as"); window.location.replace("/")})
            .catch(error => console.error(error))
    }

    useEffect(()=>{getLogging()}, []);

    function SigninNav() {
        if (logging === false) {
            return (
                <>
                    <Link to="/signin">sign in</Link>
                    <Link to="/signup">sign up</Link>
                </>
            );
        } else {
            return(<a onClick={ signOut }>sign out</a>);
        }
    }

    return (
        <>
            <header>
                <div className='headerInner'>
                    <div>
                        <Link to="/">
                            <img src={logo} alt='logo' />
                            <h3>Blog</h3>
                        </Link>
                    </div>
                    <nav>
                        <Link to="/">home</Link>
                        <SigninNav />
                    </nav>
                </div>
            </header>
        </>
    );
}

export default App;