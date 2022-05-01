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

  function PostImg(props) {
    let value = postData[props.num];

    if (value == undefined) {
      return(<img src={postImg} alt='' />);
    } else if (value.imgPath == null) {
      return(<div style={{width: "120px", height: "80px"}}></div>);
    } else {
      let imgPath = `http://lavi-blog.kro.kr:3030/postImg/${value.imgPath}.webp`;
      return(<img src={imgPath} alt='' />)
    }
  }

  function Post(props) {
    let value = (postData[props.num] !== undefined)
    ? postData[props.num]
    : {
      title: "loading",
      uploadDate: "loading",
      content: "",
      postNum: "",
      like: "0",
      dislike: "0"
    };

    return(
      <a href={(postData[props.num] === undefined) ? "" : `/post/${value.postNum}`}>
        <section>
          <div className={style.content}>
            <PostImg num={props.num} />
            <div>
              <h1>{value.title}</h1>
              <p>{value.content}</p>
            </div>
          </div>
          <div className={style.rightUi}>
            <div className={style.likeBtns}>
              <div className={style.like}>
                <i className="bi bi-hand-thumbs-up"></i>
                <span>{value.like}</span>
              </div>
              <div className={style.dislike}>
                <i className="bi bi-hand-thumbs-down"></i>
                <span>{value.dislike}</span>
              </div>
            </div>
            <p className={style.uploadTime}>{value.uploadDate}</p>
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