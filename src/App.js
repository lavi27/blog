import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
// import { Main, Search, Signin, Signup, Post, Test } from './pages';
import Main from './pages/Main';
import Search from './pages/Search';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Post from './pages/Post';
import Test from './pages/Test';
import './style/style.scss';

function App() {
return (
<>
    <Header />
    <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/search" element={<Search />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post/:postNum" element={<Post />} />
        <Route path="/test" element={<Test />} />
    </Routes>
</>
);
}

export default App;