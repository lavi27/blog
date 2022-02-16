import React, { useEffect, useState } from 'react';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Main.module.scss';

function Main() {
  const [postData, changepostData] = useState("");

  function getPosts() {
    fetch("http://lavi-blog.kro.kr:3030/api/main")
      .then((response) => response.json())
      .then((data) => changepostData(data.data))
      .catch(error => console.error(error))
  }

  useEffect(()=>{getPosts()}, []);

  function Post(props) {
    let value = postData[props.num];
    let title = "loading", uploadDate = "loading";
    let content = "", imgPath = "", postNum = "";
    let like = "0", dislike = "0";
    if (value !== undefined) { //나중에 축약해서 수정
      title = value.title;
      content = value.content;
      imgPath = "http://localhost:3030/postImg/" + value.imgPath + ".webp";
      like = value.likeCount;
      dislike = value.dislikeCount;
      uploadDate = value.uploadDate;
      postNum = value.postNum;
    }
    return(
      <a href={(value === undefined) ? "" : `/post/${value.postNum}`}>
        <section>
          <div className={style.content}>
            <img src={(value === undefined) ? postImg : imgPath} alt='' />
            <div>
              <h1>{title}</h1>
              <p>{content}</p>
            </div>
          </div>
          <div className={style.rightUi}>
            <div className={style.likeBtns}>
              <div className={style.like}>
                <i className="bi bi-hand-thumbs-up"></i>
                <span>{like}</span>
              </div>
              <div className={style.dislike}>
                <i className="bi bi-hand-thumbs-down"></i>
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
    return(
      <>
        <Post num={0} />
        <Post num={1} />
        <Post num={2} />
        <Post num={3} />
        <Post num={4} />
        <Post num={5} />
        <Post num={6} />
        <Post num={7} />
        <Post num={8} />
        <Post num={9} />
      </>
    )
  }

  return (
    <main className={style.main}>
      <Posts />
    </main>
  );
}

export default Main;