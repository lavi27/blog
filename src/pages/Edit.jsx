import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import style from '../style/pageStyle/Write.module.scss';

function Edit() {
    const { postNum } = useParams();
    const [title, changeTitle] = useState("");
    const [content, changeContent] = useState("");
    const [userData, setUserData] = useState({loaded: false});
    const [postCurrect, changepostCurrect] = useState(0);

    const [postData, changepostData] = useState({
        loaded: false,
        title: "loading",
        content: "loading",
        userId: "loading",
        imgPath: "",
        likeCount: "0",
        dislikeCount: "0",
        uploadDate: "____-__-__"
    });

    function getPost() {
        axios.get(`http://lavi-blog.kro.kr:3030/api/post/${postNum}`, {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                const value = data.data[0];
                value.loaded = true;
                changeTitle(value.title);
                changeContent(value.content);
                changepostData(value);
            })
            .catch(error => console.error(error))
    }

    
    function getLogging() {
        axios.get("http://lavi-blog.kro.kr:3030/api/headerInfo", {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                const value = data;
                value.loaded = true;
                setUserData(value);
            })
            .catch(error => console.error(error))
    }

    useEffect(()=>{
        getPost();
        getLogging();
    }, []);

    if(userData.loaded) {
        if(!userData.logging) {
            alert("접근 권한이 없습니다.");
            window.location.replace("/");
        }

        if(userData.id !== postData.userId) {
            alert("접근 권한이 없습니다.");
            window.location.replace("/");
        }
    }

    function writePost() {
        if (title === "") {
            changepostCurrect(1);
        } else if (content === "") {
            changepostCurrect(2);
        } else {
            axios.post("http://lavi-blog.kro.kr:3030/api/edit", {title, content, postNum}, { credentials: 'include', proxy: true,  withCredentials: true})
                .then((response) => response.data)
                .then((data) => {
                    if (data.success) {
                        alert("글이 수정되었습니다.");
                        window.location.replace(`/post/${postNum}`);
                    } else {
                        changepostCurrect(3);
                    }
                })
                .catch(error => {
                    console.error(error);
                    changepostCurrect(3);
                })
        }
    }

    return (
        <main className={style.main}>
            <div className={style.topContents}>
                <div className={style.info}>
                    <input
                        onChange={(e)=>{changeTitle(e.target.value)}}
                        value={title}
                        className={style.title}
                        type='text'>
                        </input>
                    <p>{`${postData.uploadDate}`}</p>
                    <p>{userData.id}</p>
                </div>
            </div>

            <textarea
                onChange={(e)=>{changeContent(e.target.value)}}
                value={content}
                className={style.content}>
                </textarea>

            <button className={style.postBtn} onClick={writePost}>수정하기</button>
            {(postCurrect === 1) ? <p>제목을 써주세요.</p> : null}
            {(postCurrect === 2) ? <p>내용을 써주세요.</p> : null}
            {(postCurrect === 3) ? <p>알 수 없는 오류가 발생했습니다.</p> : null}
        </main>
    );
}

export default Edit;