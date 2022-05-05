import React, { useState } from 'react';
import axios from 'axios';
import style from '../style/pageStyle/Signup.module.scss';
require('dotenv').config();

const serverURL = process.env.SERVER_URL;

function Signup() {
    const [id, changeId] = useState("");
    const [pw, changePw] = useState("");
    const [isSignup, changeIsSignup] = useState(false);

    function submit() {
        axios.post(`${serverURL}/signup`, { id, pw }, {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                if (data.success === false) {
                    changeIsSignup(true);
                } else {
                    window.location.replace("/");
                };
            })
            .catch(error => console.error(error))
    }

    return (
        <main className={style.main}>
            <h1>회원가입</h1>
            <div>
                <label htmlFor='id'>아이디</label>
                <input onChange={ (e)=>{changeId(e.target.value)} } type='text' id='id' name='id'></input>
            </div>
            <div>
                <label htmlFor='pw'>비밀번호</label>
                <input onChange={ (e)=>{changePw(e.target.value)} } type='text' id='pw' name='pw'></input>
            </div>
            <input className={style.submit} type='submit' value='로그인' onClick={ submit }></input>
            {(isSignup === true) ? <p>아이디가 이미 존재합니다.</p> : null}
        </main>
    );
}

export default Signup;