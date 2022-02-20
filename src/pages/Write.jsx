import React, { useState } from 'react';
import axios from 'axios';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Write.module.scss';

function Write() {
    const [title, changeTitle] = useState("");
    const [content, changeContent] = useState("");
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    function writePost() {
        axios.post("http://lavi-blog.kro.kr:3030/api/write", { title, content }, {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                window.location.replace("/");
            })
            .catch(error => console.error(error))
    }

    return (
        <main className={style.main}>
            <div className={style.topContents}>
                <div className={style.info}>
                    <input onChange={ (e)=>{changeTitle(e.target.value)} } className={style.title} type='text'></input>
                    <p>{`${year}-${month}-${date}`}</p>
                </div>
            </div>
            <img src={ postImg } alt='' />
            
            <textarea onChange={ (e)=>{changeContent(e.target.value)} } className={style.content}></textarea>

            <button className={style.postBtn} onClick={writePost}>Post</button>
        </main>
    );
}

export default Write;