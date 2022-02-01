import React, { useEffect, useState } from 'react';
import postImg from '../res/img/postImg.png';
import '../style/pageStyle/Main.scss';

function Main() {
  const [postData, changepostData] = useState("");

  function getPosts() {
    fetch("http://localhost:3030/api/main")
      .then((response) => response.json())
      .then((data) => data.data)
      .then((data) => changepostData(data))
      .catch(error => console.error(error))
  }

  useEffect(()=>{getPosts()}, []);

  function Post(props) {
    let value = postData[props.num];
    let title = "loading";
    let content = "";
    let imgPath = "";
    let like = "0";
    let dislike = "0";
    let uploadDate = "loading";
    let postNum = "";
    if (value !== undefined) {
      title = value.title;
      content = value.content;
      imgPath = "http://localhost:3030/postImg/" + value.imgPath + ".webp";
      like = value.likeCount;
      dislike = value.dislikeCount;
      uploadDate = value.uploadDate;
      postNum = `/post/${value.postNum}`;
    }
    return(
      <a href={postNum}>
        <section>
          <div className='content'>
            <img src={(value === undefined) ? postImg : imgPath} alt='' />
            <div>
              <h1>{title}</h1>
              <p>{content}</p>
            </div>
          </div>
          <div className='rightUi'>
            <div className='likeBtns'>
              <div className='like'>
                <i className="bi bi-hand-thumbs-up"></i>
                <span>{like}</span>
              </div>
              <div className='dislike'>
                <i className="bi bi-hand-thumbs-down"></i>
                <span>{dislike}</span>
              </div>
            </div>
            <p className='uploadTime'>{uploadDate}</p>
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
    <main>
      <Posts />
    </main>
  );
}

export default Main;