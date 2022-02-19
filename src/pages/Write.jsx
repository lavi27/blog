import React from 'react';
import postImg from '../res/img/postImg.png';
import style from '../style/pageStyle/Write.module.scss';

function Write() {
    return (
        <main className={style.main}>
            <div className={style.topContents}>
                <div className={style.info}>
                    <h1>title</h1>
                    <p>uploadDate</p>
                </div>
            </div>
            <img src={ postImg } alt='' />
            
            <div className={style.content}>content</div>

            <div>Post</div>
        </main>
    );
}

export default Write;