import React, { useState } from 'react';

function Test() {
    const [file, changeFile] = useState();

    function submit() {
        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:3030/test", {method: 'post', body: formData})
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(error => console.error(error))
    }

    return (
        <main>
            <input type="file" onChange={ (e)=>{
                changeFile(e.target.files[0]);
            }} />

            <input type='submit' onClick={ submit }></input>
        </main>
    );
}

export default Test;