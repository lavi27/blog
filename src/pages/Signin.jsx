import React, { useState } from 'react';
import style from '../style/pageStyle/Signin.module.scss';

function Signin() {
    const [id, changeId] = useState("");
    const [pw, changePw] = useState("");

    function submit() {
        fetch("http://localhost:3030/api/signin", {method: 'post', body: JSON.stringify({id: "id", pw: "pw"})})
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(error => console.error(error))
    }

    return (
        <main>
            <label htmlFor='id'>아이디</label><input onChange={ (e)=>{changeId(e.target.value)} } type='text' id='id' name='id'></input>
            <label htmlFor='pw'>비밀번호</label><input onChange={ (e)=>{changePw(e.target.value)} } type='text' id='pw' name='pw'></input>
            <input type='submit' value='로그인' onClick={ submit }></input>
        </main>
    );
}

export default Signin;