const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
//const multer     = require('multer');

// call module connected
var con = require('./connected');

app.set('view engine', 'pug');
app.set('views', './view');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    var querySql = "SELECT * FROM t_movie";
    con.query(querySql, (err, rows) => {
        if(err) console.log(err);
        res.render('read', {
            data: rows
        });
    });
});

app.get('/add', (req, res) => {
    res.render('create');
});

app.post('/insert', (req, res) => {
    var querySql = 'INSERT INTO t_movie(movie_title, movie_rate) VALUES ("'+ req.body.movie_title +'", "'+ req.body.movie_rate +'")';
    con.query(querySql,(err) => {
        if(err) console.log(err);
        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => {
    var querySql = 'SELECT * FROM t_movie WHERE id_movie =  "' +  req.params.id + '"';
    con.query(querySql, (err, rows) => {
        if(!err && (rows.length === 1)) {
            var row = rows[0];
            res.render('edit', {
                title: 'Edit Data',
                data: row
            });
        } else {
            console.log(err);
        }
    });
});

app.post('/update', (req, res) => {
    var querySql = 'UPDATE t_movie SET movie_title = "' + req.body.movie_title + '", movie_rate = "' + req.body.movie_rate + '" WHERE id_movie = "' + req.body.id_movie + '"';

    con.query(querySql, (err) => {
        if(err) console.log(err);
        res.redirect('/');
    });
});

app.get('/delete/:id', (req, res) => {
    var querySql = 'DELETE FROM t_movie WHERE id_movie = "' + req.params.id + '"';
    con.query(querySql, (err) => {
        if(err) console.log(err);
        res.redirect('/');
    });
});

app.listen(1234, () => {
    console.log('App running on port 1234!');
});