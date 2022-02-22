import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Post.module.scss';

function Post() {
    const { postNum } = useParams();
    const [postData, changepostData] = useState({
        title: "loading",
        content: "loading",
        imgPath: `http://lavi-blog.kro.kr:3030/postImg/''.webp`,
        likeCount: "",
        dislikeCount: "",
        uploadDate: "____-__-__"
    });

    const [likeIsClick, changelikeClick] = useState(false);
    const [dislikeIsClick, changedisdislikeClick] = useState(false);

    function getPost() {
        fetch(`http://lavi-blog.kro.kr:3030/api/post/${postNum}`)
            .then((response) => response.json())
            .then((data) => data.data)
            .then((data) => {
                changepostData(data[0]);
            })
            .catch(error => console.error(error))
    }

    useEffect(()=>{getPost()}, []);

    return (
        <main className={style.main}>
            <div className={style.topContents}>
                <div className={style.info}>
                    <h1>{postData.title}</h1>
                    <p>{postData.uploadDate}</p>
                </div>
            </div>
            <img src={(postData === undefined) ? postImg : postData.imgPath} alt='' />

            <div className={style.content}>{postData.content}</div>

            <div className={style.like}>
                <span className={style.likeBtn}>    <i className={`bi bi-hand-thumbs-up${   (likeIsClick===true) ? "-fill" : ""}`}      onClick={()=>changelikeClick(!likeIsClick)}></i>            {postData.likeCount}</span>
                <span className={style.dislikeBtn}> <i className={`bi bi-hand-thumbs-down${ (dislikeIsClick===true) ? "-fill" : ""}`}   onClick={()=>changedisdislikeClick(!dislikeIsClick)}></i>   {postData.dislikeCount}</span>
            </div>
        </main>
    );
}

export default Post;