import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Post.module.scss';

function Post() {
    const { postNum } = useParams();
    const [postData, changepostData] = useState({
        title: "loading",
        content: "loading",
        userName: "loading",
        imgPath: "",
        likeCount: "",
        dislikeCount: "",
        uploadDate: "____-__-__"
    });

    const [likeIsClick, changelikeClick] = useState(0);
    const [dislikeIsClick, changedisdislikeClick] = useState(0);

    function getPost() {
        axios.get(`http://lavi-blog.kro.kr:3030/api/post/${postNum}`, {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                const value = data.data[0];
                value.likeCount = 0;
                value.dislikeCount = 0;

                data.reaction.forEach(({reaction, userNum}) => {
                    if(userNum === data.userNum) {
                        if(reaction === "1") {
                            changelikeClick(true);
                            value.likeCount--;
                        } else if(reaction === "2") {
                            changedisdislikeClick(true);
                            value.dislikeCount--;
                        }
                    }

                    if(reaction === "1") {
                        value.likeCount++;
                    } else if(reaction === "2") {
                        value.dislikeCount++;
                    }
                });

                changepostData(value);
            })
            .catch(error => console.error(error))
    }

    useEffect(()=>{getPost()}, []);

    function clickLike() {
        axios.post("http://lavi-blog.kro.kr:3030/api/reaction/", {postNum, reaction: (likeIsClick) ? 0 : 1}, {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                if (data.success) {
                    changelikeClick(!likeIsClick);
                    if (dislikeIsClick) {
                        changedisdislikeClick(!dislikeIsClick);
                    }
                } else {
                    console.log(data.err)
                }
            })
            .catch(error => console.error(error))
    }

    function clickDislike() {
        axios.post("http://lavi-blog.kro.kr:3030/api/reaction/", {postNum, reaction: (dislikeIsClick) ? 0 : 2}, {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                if (data.success) {
                    changedisdislikeClick(!dislikeIsClick);
                    if (likeIsClick) {
                        changelikeClick(!likeIsClick);
                    }
                } else {
                    console.log(data.err)
                }
            })
            .catch(error => console.error(error))
    }

    function PostImg() {
        if(postData.imgPath === "") {
            return(<img src={postImg} alt='' />);
        } else if(postData.imgPath === null) {
            return(<></>);
        } else {
            return(<img src={`http://lavi-blog.kro.kr:3030/postImg/${postData.imgPath}.webp`} alt='' />)
        }
    }

    return (
        <main className={style.main}>
            <div className={style.topContents}>
                <div className={style.info}>
                    <h1>{postData.title}</h1>
                    <p>{postData.uploadDate}</p>
                    <p>{postData.userName}</p>
                </div>
            </div>
            <PostImg />

            <div className={style.content}>{postData.content}</div>

            <div className={style.like}>
                <span className={style.likeBtn}>
                    <i className={`bi bi-hand-thumbs-up${(likeIsClick === true) ? "-fill" : ""}`} onClick={ clickLike }></i>
                    {postData.likeCount + likeIsClick}
                </span>
                <span className={style.dislikeBtn}>
                    <i className={`bi bi-hand-thumbs-down${(dislikeIsClick === true) ? "-fill" : ""}`} onClick={ clickDislike }></i>
                    {postData.dislikeCount + dislikeIsClick}
                </span>
            </div>
        </main>
    );
}

export default Post;