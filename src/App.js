import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style/style.scss';
import Header from './components/header';
import Main from './routes/Main';
import Search from './routes/Search';
import Signin from './routes/Signin';
import Signup from './routes/Signup';

function App() {
return (
<>
    <Header />
    <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/search" element={<Search />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
    </Routes>
</>
);
}

export default App;