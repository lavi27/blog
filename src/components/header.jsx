import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../res/img/logo.svg';

function App() {
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
                <Link to="/search">search</Link>
                <Link to="/signin">sign in</Link>
                <Link to="/signup">sign up</Link>
            </nav>
        </div>
    </header>
</>
);
}

export default App;