import { useState } from 'react';
import '../style/pageStyle/Main.scss';

function App() {
const [test, changeTest] = useState("붸");

function getPosts() {
  fetch("http://localhost:3030/api/test")
    .then((response) => response.json())
    .then((data) => { changeTest(data.sex) })
}

getPosts()

return (
  <main>
    <div>
      {test}
    </div>
    <button type='button' className="btn btn-primary">Btn</button>
  </main>
);
}

export default App;