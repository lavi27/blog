import React, { useEffect, useState } from 'react';
import axios from 'axios';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Main.module.scss';
import Loading from '../components/Loading';
require('dotenv').config();

const serverURL = process.env.SERVER_URL;

function Main() {
  const [postData, changepostData] = useState(null);

  function getPosts() {
    // fetch("http://192.168.1.117:3030/api/main")
    //   .then((response) => response.json())
    //   .then((data) => changepostData(data.data))
    //   .catch(error => console.error(error))

    axios.get(`${serverURL}/main`, {credentials: 'include', proxy: true,  withCredentials: true})
      .then((response) => response.data)
      .then((data) => {changepostData(data.data);})
      .catch(error => console.error(error))
  }

  useEffect(()=>{getPosts()}, []);

  // function PostImg(props) {
  //   let value = postData[props.num];

  //   if (value === undefined) {
  //     return(<img src={postImg} alt='' />);
  //   } else if (value.imgPath == null) {
  //     return(<div style={{width: "120px", height: "80px"}}></div>);
  //   } else {
  //     let imgPath = `http://192.168.1.117:3030/postImg/${value.imgPath}.webp`;
  //     return(<img src={imgPath} alt='' />)
  //   }
  // }

  function Post(props) {
    let value = (postData[props.num] !== undefined)
    ? postData[props.num]
    : {
      title: "loading",
      uploadDate: "loading",
      userId: "loading",
      content: "",
      postNum: "",
      likeCount: "0",
      dislikeCount: "0",
      myReaction: ""
    };

    return(
      <a href={(postData[props.num] === undefined) ? "" : `/post/${value.postNum}`}>
        <section>
          <div className={style.content_wrap}>
            {/* <PostImg num={props.num} /> */}
            <h1>{value.title}</h1>
            <p className={style.content}>{value.content}</p>
          </div>
          <div className={style.rightUi}>
            <div className={style.likeBtns}>
              <div className={style.like}>
                <i className={`bi bi-hand-thumbs-up${(value.myReaction === '1') ? "-fill" : ""}`}></i>
                <span>{value.likeCount}</span>
              </div>
              <div className={style.dislike}>
              <i className={`bi bi-hand-thumbs-down${(value.myReaction === '2') ? "-fill" : ""}`}></i>
                <span>{value.dislikeCount}</span>
              </div>
            </div>
            <p className={style.uploadTime}>{value.userId} - {value.uploadDate}</p>
          </div>
        </section>
      </a>
    )
  }

  function Posts() {
    if(postData !== null) {
      const result = [];
      for (let i=0; i<postData.length; i++) {
        result.push(<Post key={i} num={i} />);
      }
      return(result)
    } else {
      return (
        <Loading />
      )
    }
  }

  return (
    <main className={style.main}>
      <Posts />
    </main>
  );
}

export default Main;