const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Google Player App', () =>{
    it('GET/ should return an array', ()=>{
        return request(app)
        .get('/googleapps')
        .query({sort:'rating', genre: 'casual'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res=>{
            expect(res.body).to.be.an('array');
        })
    });

    it('GET/ should return an error if incorrect sort method', ()=>{
        return request(app)
        .get('/googleapps')
        .query({sort:'test', genre: 'casual'})
        .expect(400, 'Sort must be either rating or app');
        
    });

    it('GET/ should return an error if incorrect genre', ()=>{
        return request(app)
        .get('/googleapps')
        .query({sort:'app', genre: 'funky'})
        .expect(400, 'Genre must be action, puzzle, strategy, casual, arcade, or card.');
        
    });

    it('GET/ should filter based on selected genre', ()=>{
        return request(app)
        .get('/googleapps')
        .query({sort:'rating', genre: 'puzzle'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res=>
            res.body.map(googleApp => expect(googleApp.Genres).to.include('Puzzle')));
           
    });
  
    it('GET/ should sort based on selected sort method', ()=>{
        return request(app)
        .get('/googleapps')
        .query({sort:'rating', genre: 'puzzle'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res=> () =>{
            let i=0;
            let sorted = true;
            while(sorted && i < res.body.length - 1){
                sorted = sorted && res.body[i].Rating < res.body[i + 1].Rating;
                i++;
            }
            expect(sorted).to.be.true;
        });
    });


});