const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
const apps = require('./googleApps.js');


app.get('/googleapps', (req, res) =>{
    const {sort, genre} = req.query;
    if(sort) {
        if(!['rating', 'app'].includes(sort)){
            return res
            .status(400)
            .send('Sort must be either rating or app');
        }
    }

    if(genre){
        if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genre)){
            return res
            .status(400)
            .send('Genre must be action, puzzle, strategy, casual, arcade, or card.');
        }

    }

    let results = apps.filter(app => app.Genres.toLowerCase() === genre.toLowerCase());

    if(sort){
        sortMethod = sort === 'rating' ? 'Rating' : 'App';
        results
        .sort((a,b) => {
        return a[sortMethod] > b[sortMethod] ? 1 : a[sortMethod] < b[sortMethod] ? -1 : 0;});
    }

    res.json(results);   
});

app.listen(8000, ()=>{
    console.log('Server started on Port 8000');
});