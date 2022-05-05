import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Post.module.scss';
import Loading from '../components/Loading';
require('dotenv').config();

const serverURL = process.env.SERVER_URL;

function Post() {
    const { postNum } = useParams();
    const [postData, changepostData] = useState({
        loaded: false,
        title: "loading",
        content: "loading",
        userId: "loading",
        imgPath: "",
        likeCount: "",
        dislikeCount: "",
        uploadDate: "____-__-__"
    });

    const [likeIsClick, changelikeClick] = useState(0);
    const [dislikeIsClick, changedisdislikeClick] = useState(0);
    const [userData, setUserData] = useState({loaded: false});

    function getPost() {
        axios.get(`${serverURL}/post/${postNum}`, {credentials: 'include', proxy: true,  withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                const value = data.data[0];
                value.loaded = true;
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

    
    function getLogging() {
        axios.get(`${serverURL}/headerInfo`, {credentials: 'include', proxy: true,  withCredentials: true})
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

    function Content() {
        if(postData.loaded) {
            return (
                <div className={style.content_wrap}>
                    {/* <PostImg /> */}
                    <div className={style.content}>{postData.content}</div>
                    {(userData.logging && userData.id === postData.userId) ? <Edit /> : null}
                </div>
            )
        } else {
            return (
                <div className={style.content_wrap}>
                    <Loading />
                </div>
            )
        }
    }

    function Edit() {
        return (
            <div className={style.edit}>
                <a href={`/edit/${postNum}`}>수정</a>
                <span onClick={() => {
                    if(window.confirm("정말 삭제할까요?")) {
                        axios.post (
                            `${serverURL}/delete`,
                            {postNum, userNum: userData.userNum},
                            {credentials: 'include', proxy: true, withCredentials: true}
                            )
                            .then(() => {
                                alert("삭제되었습니다.");
                                window.location.replace("/");
                            })
                            .catch(error => {
                                console.error(error);
                                alert("오류가 발생했습니다.")
                            })
                    }
                }}>삭제</span>
            </div>
        )
    }

    function Reaction() {
        function reaction(props) {
            return new Promise(resolve => {
                axios.post(`${serverURL}/reaction/`, props, {credentials: 'include', proxy: true,  withCredentials: true})
                    .then((response) => response.data)
                    .then((data) => { resolve(data) })
                    .catch(error => {
                        console.error(error);
                        resolve({success: false});
                    })
            });
        }

        async function clickLike() {
            if(userData.logging) {
                const data = await reaction({postNum, reaction: (likeIsClick) ? 0 : 1});
    
                if (data.success) {
                    changelikeClick(!likeIsClick);
                    if (dislikeIsClick) {
                        changedisdislikeClick(!dislikeIsClick);
                    }
                } else {
                    console.log(data.err)
                }
            } else {
                const confirm = window.confirm("로그인이 필요합니다.\n로그인 화면으로 이동할까요?");
                if(confirm) {
                    window.location.replace("/signin");
                }
            }
        }
    
        async function clickDislike() {
            if(userData.logging) {
                const data = await reaction({postNum, reaction: (dislikeIsClick) ? 0 : 2});
    
                if (data.success) {
                    changedisdislikeClick(!dislikeIsClick);
                    if (likeIsClick) {
                        changelikeClick(!likeIsClick);
                    }
                } else {
                    console.log(data.err)
                }
            } else {
                const confirm = window.confirm("로그인이 필요합니다.\n로그인 화면으로 이동할까요?");
                if(confirm) {
                    window.location.replace("/signin");
                }
            }
        }

        return (
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
        )
    }

    return (
        <main className={style.main}>
            <div className={style.topContents}>
                <div className={style.info}>
                    <h1>{postData.title}</h1>
                    <p>{postData.uploadDate}</p>
                    <p>{postData.userId}</p>
                </div>
            </div>
            <Content />
            <Reaction />
        </main>
    );
}

export default Post;