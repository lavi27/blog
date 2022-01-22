import express from 'express';
import path from 'path';
import iniparser from 'iniparser';
import mysql from 'mysql';

var config = iniparser.parseSync('server/config.ini');

console.log(config.db.id);

var app = express();
app.use(express.static(path.join(__dirname, '../build')))

app.get('/', (req, res)=>{ res.sendFile(__dirname, '../build/index.html') });

app.listen(3030, console.log("서버 실행중"));