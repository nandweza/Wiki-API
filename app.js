const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Article = require('./models/wikiDB');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

const port = 3000 || process.env.PORT;

mongoose.connect('mongodb://localhost:27017/wikiDB', {
    useNewUrlParSer: true
})
.then(() => console.log('DB Connected...'))
.catch(error => console.error(error))

app.get('/articles', async (req, res) => {
    const foundArticles = await Article.find();

    res.send(foundArticles);
})

app.post('/articles', (req, res) => {
    const { title, content } = req.body;

    const newArticle = new Article({ title, content });

    newArticle.save().then(() => {
        res.send('Success');
    }).catch((error) => {
        res.send(error);
    })
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
});