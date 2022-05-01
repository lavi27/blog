import React, { useEffect, useState } from 'react';
import axios from 'axios';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Write.module.scss';

function Write() {
    const [headerInfo, changeHeaderInfo] = useState("");
    const [title, changeTitle] = useState("");
    const [content, changeContent] = useState("");
    const [img, ChangeImg] = useState("");
    const [previewImg, ChangePreviewImg] = useState(postImg);
    const [postCurrect, changepostCurrect] = useState(0);
    let today = new Date();

    function getLogging() {
        axios.get("http://lavi-blog.kro.kr:3030/api/headerInfo", {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => changeHeaderInfo(data))
            .catch(error => console.error(error))
    }

    useEffect(()=>{getLogging()}, []);

    function renderImg(file) {
        ChangeImg(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e)=>{
            ChangePreviewImg(reader.result);
        };
    }

    function writePost() {
        if (title === "") {
            changepostCurrect(1);
        } else if (content === "") {
            changepostCurrect(2);
        } else {
            const formData = new FormData();
            if (img !== "") {
                formData.append('file', img);
            }
            formData.append('title', title);
            formData.append('content', content);

            axios.post("http://lavi-blog.kro.kr:3030/api/write", formData, { credentials: 'include', proxy: true,  withCredentials: true})
                .then((response) => response.data)
                .then((data) => {
                    if (data.success) {
                        window.location.replace("/");
                    } else {
                        changepostCurrect(3);
                    }
                })
                .catch(error => console.error(error))
        }
    }

    return (
        <main className={style.main}>
            <div className={style.topContents}>
                <div className={style.info}>
                    <input onChange={ (e)=>{changeTitle(e.target.value)} } className={style.title} type='text'></input>
                    <p>{`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`}</p><p>{headerInfo.id}</p>
                </div>
            </div>

            <label htmlFor='imgInput'><img src={previewImg} alt='' /></label>
            <input className={style.imgInput} id='imgInput' type='file' onChange={ (e)=>{renderImg(e.target.files[0]);} }></input>
            
            <textarea onChange={ (e)=>{changeContent(e.target.value)} } className={style.content}></textarea>

            <button className={style.postBtn} onClick={writePost}>Post</button>
            {(postCurrect === 1) ? <p>제목을 써주세요.</p> : null}
            {(postCurrect === 2) ? <p>내용을 써주세요.</p> : null}
            {(postCurrect === 3) ? <p>알 수 없는 버그가 발견했습니다.</p> : null}
        </main>
    );
}

export default Write;