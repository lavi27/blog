import express from 'express';
import mysql from 'mysql';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import sharp from 'sharp';
import bodyParser from 'body-parser';
import session from 'express-session';
require('dotenv').config();
const MySQLStore = require('express-mysql-session')(session);

fs.readdir(__dirname + "/upload", (err) => {
    if (err) fs.mkdirSync(__dirname + "/upload")
});

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/upload/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' || ext !== '.jpg'){
            return cb(res.status(400).end('오직 png, jpg 형식 파일만 허용됨.'), false);
        } 
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single("file");

const env = process.env;

const db = mysql.createConnection({
    host : env.DB_HOST,  
    user : env.DB_USER,
    password : env.DB_PW,
    database : env.DB_DB
});

db.connect();

const options = {
    host: env.DB_HOST,
    port: 3306,
    user: env.DB_USER,
    password: env.DB_PW,
    database: env.DB_DB
};

const sessionStore = new MySQLStore(options);

function saveFile(req, res) {
    upload(req, res, (err)=>{
        if (err) res.json({success: false});
        try {
            sharp(req.file.path)
                .resize({width:200})
                .withMetadata()
                .toFormat("webp")
                .toFile(__dirname + '/upload/post/' + Date.now() + '.webp', (err, info)=>{
                    if(err) res.json({success: false})

                    fs.unlink(req.file.path, (err)=>{
                        if(err) res.json({success: false})
                        res.json({success: true});
                    })
                })

        } catch(err) { res.json({success: false}) }
    })
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    secret: env.SECRETKEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

app.use('/userImg', express.static(__dirname + '/upload/user'));
app.use('/postImg', express.static(__dirname + '/upload/post'));
app.use('/build', express.static(path.join(__dirname, '../build')));

// app.post('/test', (req, res)=>{ saveFile(req, res); });

app.get('/info', (req, res)=>{ res.sendFile(__dirname + "/index.html") });

app.get('/api/logging', (req, res)=>{
    console.log(req.sessionID)
    if (req.session.logging === true) {
        res.json({ logging: true });
    } else {
        res.json({ logging: false });
    }
});

app.post('/api/signin', (req, res)=>{
    let sql = `select pw FROM user where id='${req.body.id}'limit 1;`;
    db.query(sql, (err, rows, fields)=>{
        let result;
        if (rows[0] !== undefined) {
            result = bcrypt.compareSync(req.body.pw, rows[0].pw);
            if (result === true) {
                req.session.logging = true;
            }
        } else {
            result = false;
        }
        res.json({success: result});
    });
});

app.post('/api/signOut', (req, res)=>{
    console.log(req.sessionID)
    req.session.logging = false;
    res.json({success: true});
});

app.get('/api/main', (req, res)=>{
    let sql = 'select postNum, title, content, imgPath, likeCount, dislikeCount, DATE_FORMAT(uploadDate, "%Y-%m-%d") AS "uploadDate" FROM post ORDER BY postNum DESC limit 10;';
    db.query(sql, (err, rows, fields)=>{
        res.json({ data: rows });
    });
});

app.get('/api/post/:postNum', (req, res)=>{
    let sql = `select title, content, imgPath, likeCount, dislikeCount, DATE_FORMAT(uploadDate, "%Y-%m-%d") AS "uploadDate" FROM post WHERE postNum = ${req.params.postNum};`;
    db.query(sql, (err, rows, fields)=>{
        res.json({data: rows});
    });
});

app.get('/api/customers', (req, res)=>{
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

app.listen(3030, console.log("http://localhost:3030/ 에서 실행중"));