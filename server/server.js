import express from 'express';
import path from 'path';
import iniparser from 'iniparser';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
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

// const encrypted = bcrypt.hashSync("sadsdf", 4);

// const issame = bcrypt.compareSync("sadsdf", encrypted);
// console.log(issame); true

var app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../build')))
app.use('/profile', express.static('./upload'));

app.get('/', (req, res)=>{ res.sendFile(__dirname, '../build/index.html') });

app.get('/api/profile/:imgname', (req, res)=>{
    res.json()
});

app.get('/api/test', (req, res)=>{
    res.json({"sex" : "하고싶다."})
});

app.post('/api/customers', upload.single('image'), (req, res)=>{
    let sql = 'INSERT INTO user (id, pw, profileImg) VALUES (null, ?, ?)';
    let img = '/image/' + req.file.filename;
    let id = 'asd';
    let params = [img, id, "asd"];
    conn.query(sql, params, (err, rows, fields)=>{
        res.send(rows);
    });
})

app.listen(3030, console.log("서버 실행중"));