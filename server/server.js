import express from 'express';
import iniparser from 'iniparser';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';
import sharp from 'sharp';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/upload/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' || ext !== '.jpg'){
            return cb(res.status(400).end('only png, jpg are allowed'), false);
        } 
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single("file");

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

// sharp("example-image.jpg")
//     .resize({ width: 500, height: 450 })
//     .toFormat("png")
//     .png({ quality: 100 })
//     .toFile("output.png")
//     .catch((err) => console.warn(err));

app.post('/test', (req, res)=>{
    upload(req, res, (err) => {
        if (err) {
            return res.json({success: false});
        } else {
            return res.json({success: true});
        }
    });
});

app.get('/api/customers', (req, res)=>{ //req.body.user_name
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