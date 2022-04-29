import React, { useEffect, useState } from 'react';
import axios from 'axios';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Main.module.scss';

function Main() {
  const [postData, changepostData] = useState("");

  function getPosts() {
    // fetch("http://lavi-blog.kro.kr:3030/api/main")
    //   .then((response) => response.json())
    //   .then((data) => changepostData(data.data))
    //   .catch(error => console.error(error))

    axios.get(`http://lavi-blog.kro.kr:3030/api/main`, {credentials: 'include', proxy: true,  withCredentials: true})
      .then((response) => response.data)
      .then((data) => {changepostData(data.data)})
      .catch(error => console.error(error))
  }

  useEffect(()=>{getPosts()}, []);

  function PostImg(props) {
    let value = postData[props.num];

    if (value === undefined) {
      return(<img src={postImg} alt='' />);
    } else if (value.imgPath == null) {
      return(<div style={{width: "120px", height: "80px"}}></div>);
    } else {
      let imgPath = `http://lavi-blog.kro.kr:3030/postImg/${value.imgPath}.webp`;
      return(<img src={imgPath} alt='' />)
    }
  }

  function Post(props) {
    let value = postData[props.num];
    let title = "loading", uploadDate = "loading";
    let content = "", postNum = "";
    let like = "0", dislike = "0";
    let myReaction;
    console.log(value)
    if (value !== undefined) { //나중에 축약해서 수정
      title = value.title;
      content = value.content;
      like = value.likeCount;
      dislike = value.dislikeCount;
      uploadDate = value.uploadDate;
      postNum = value.postNum;
      myReaction = parseInt(value.myReaction);
    }
    return(
      <a href={(value === undefined) ? "" : `/post/${postNum}`}>
        <section>
          <div className={style.content}>
            <PostImg num={props.num} />
            <div>
              <h1>{title}</h1>
              <p>{content}</p>
            </div>
          </div>
          <div className={style.rightUi}>
            <div className={style.likeBtns}>
              <div className={style.like}>
                <i className={`bi bi-hand-thumbs-up${(myReaction === 1) ? "-fill" : ""}`}></i>
                <span>{like}</span>
              </div>
              <div className={style.dislike}>
              <i className={`bi bi-hand-thumbs-down${(myReaction === 2) ? "-fill" : ""}`}></i>
                <span>{dislike}</span>
              </div>
            </div>
            <p className={style.uploadTime}>{uploadDate}</p>
          </div>
        </section>
      </a>
    )
  }

  function Posts() {
    for (let i=0; i<((postData.length < 10) ? postData.length : 10); i++) {
      return(<Post num={i} />)
    }
    return(<></>)
  }

  return (
    <main className={style.main}>
      <Posts />
    </main>
  );
}

export default Main;