const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

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

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model('Article', articleSchema);

app.get('/articles', function(req, res){
    Article.find(function(err, foundArticles){
        res.send(foundArticles);
    });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
});