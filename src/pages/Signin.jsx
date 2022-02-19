import React, { useState } from 'react';
import axios from 'axios';
import style from '../style/pageStyle/Signin.module.scss';

function Signin() {
    const [id, changeId] = useState("");
    const [pw, changePw] = useState("");
    const [signinCurrect, changeSigninCurrect] = useState(false);

    function submit() {
        axios.post("http://lavi-blog.kro.kr:3030/api/signin", { id, pw }, {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                if (data.success === false) {
                    changeSigninCurrect(true);
                } else {
                    window.location.replace("/");
                };
            })
            .catch(error => console.error(error))
    }

    return (
        <main className={style.main}>
            <h1>로그인</h1>
            <div>
                <label htmlFor='id'>아이디</label>
                <input onChange={ (e)=>{changeId(e.target.value)} } type='text' id='id' name='id'></input>
            </div>
            <div>
                <label htmlFor='pw'>비밀번호</label>
                <input onChange={ (e)=>{changePw(e.target.value)} } type='text' id='pw' name='pw'></input>
            </div>
            <input className={style.submit} type='submit' value='로그인' onClick={ submit }></input>
            {(signinCurrect === true) ? <p>아이디 또는 비밀번호가 일치하지 않습니다.</p> : null}
        </main>
    );
}

export default Signin;