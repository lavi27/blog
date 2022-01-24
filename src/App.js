import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style/style.scss';
import Header from './components/header';
import Main from './routes/Main';
import Search from './routes/Search';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import Test from './routes/Test';

function App() {
return (
<>
    <Header />
    <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/search" element={<Search />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<Test />} />
    </Routes>
</>
);
}

export default App;