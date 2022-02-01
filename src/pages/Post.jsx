import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Post.module.scss';

function Post() {
    const { postNum } = useParams();
    const [postData, changepostData] = useState("");

    function getPost() {
        fetch(`http://localhost:3030/api/post/${postNum}`)
            .then((response) => response.json())
            .then((data) => data.data)
            .then((data) => changepostData(data[0]))
            .catch(error => console.error(error))
    }

    useEffect(()=>{getPost()}, []);

    let title = "loading";
    let content = "";
    let imgPath = "";
    let like = "0";
    let dislike = "0";
    let uploadDate = "loading";
    if (postData !== undefined) {
        title = postData.title;
        content = postData.content;
        imgPath = "http://localhost:3030/postImg/" + postData.imgPath + ".webp";
        like = postData.likeCount;
        dislike = postData.dislikeCount;
        uploadDate = postData.uploadDate;
    }

    return (
        <main className={style.main}>
            <div className={style.topContents}>
                <img src={(postData === undefined) ? postImg : imgPath} alt='' />
                <h1>{title}</h1>
                <p>{uploadDate}</p>
                <span>{like}</span>
                <span>{dislike}</span>
            </div>
            <div className={style.content}>{content}</div>
        </main>
    );
}

export default Post;