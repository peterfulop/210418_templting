const express = require('express');
const path = require('path');
const app = express();
const rawData = require('./data.json');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'];
    res.render('cats', { cats });
});

app.get('/random', (req, res) => {
    const random = Math.floor(Math.random() * 10) + 1;
    res.render('random', { random });
});

app.get('/r/:subreddit', (req, res) => {
    const subreddit = req.params;
    console.log(subreddit.subreddit);
    const data = rawData[subreddit.subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    }
    else {
        res.render('notefound', { subreddit });
    }
});



app.listen(3000, () => {
    console.log('Listening on port 3000')
});