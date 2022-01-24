import { useEffect, useState } from 'react';
import postImg from '../res/img/postImg.png';
import '../style/pageStyle/Main.scss';

function App() {
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
    let postNum = props.num;
    let value = postData[postNum];
    let title = "loading";
    let content = "loading";
    let imgPath = "";
    if (value != undefined) {
      title = value.title;
      content = value.content;
      imgPath = "http://localhost:3030/postImg/" + value.imgPath + ".webp";
    }
    return(
      <section>
        <div className='content'>
          <img src={(value == undefined) ? postImg : imgPath} />
          <div>
            <h1>{title}</h1>
            <p>{content}</p>
          </div>
        </div>
        <div className='likeBtns'>
          <div className='like'>
            <i class="bi bi-hand-thumbs-up"></i>
            <span>0</span>
          </div>
          <div className='dislike'>
            <i class="bi bi-hand-thumbs-down"></i>
            <span>0</span>
          </div>
        </div>
      </section>
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

export default App;