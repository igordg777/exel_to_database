const express = require('express')
const app = express()
const cors = require('cors')
var bodyParser = require('body-parser');
var pg = require('pg');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
const path = require('path');

const config = {
    user: 'postgres',
    database: 'exel_to_database',
    password: 'postgres',
    port: 5432
};

const pool = new pg.Pool(config);

app.get('/', function (req, res) {
    res.send('Hello World!!!')
})

app.post('/save_data', function (req, res) {
    console.log(req.body);

    pool.connect(function (err, client, done) {

        if (err) {
            console.log("Can not connect to the DB" + err);
        }


        client.query(`INSERT INTO users ( ) VALUES ('${city}', так далее);`, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows);
            res.status(200).json({ response: 'Пользователи успешно сохранены в базе данных' })
        })
    })




})

app.listen(5000, console.log("Сервер запущен на порту 5000"))