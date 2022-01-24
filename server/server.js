import express from 'express';
import iniparser from 'iniparser';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';

const upload = multer({ dist: './upload'});

const config = iniparser.parseSync('server/config.ini');

const db = mysql.createConnection({
    host : config.db.host,  
    user : config.db.user,
    password : config.db.pw,
    database : config.db.db
});

db.connect();

const app = express();
app.use(cors());
app.use('/userImg', express.static(__dirname + '/upload/user'));
app.use('/postImg', express.static(__dirname + '/upload/post'));
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (res)=>{ res.sendFile('/build/index.html') });

app.get('/info', (res)=>{ res.sendFile(__dirname + "/index.html") });

app.get('/api/main', (res)=>{
    let sql = 'SELECT title, content, imgPath FROM post ORDER BY postNum DESC limit 10;';
    db.query(sql, (err, rows, fields)=>{
        res.json({ 'data': rows })
    });
});

// let issame = bcrypt.compareSync("sadsdf", encrypted); true, false

app.get('/api/customers', upload.single('image'), (req, res)=>{ //req.body.user_name
    let sql = 'INSERT INTO user (id, pw, profileImg) VALUES (null, ?, ?)';
    let id = 'asd';
    let encrypted = bcrypt.hashSync("sadsdf", 2);
    let pw = encrypted;
    let img = '/userImg/' + req.file.filename;
    let params = [id, pw, img];
    db.query(sql, params, (err, rows, fields)=>{
        res.send(rows);
    });
})

app.listen(3030, console.log("서버 실행중"));