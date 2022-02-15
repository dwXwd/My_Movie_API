const express = require('express'),
morgan = require('morgan');
const app = express();


let topMovies = [
  {
    title: 'Batman - Dark Knight',
    director: 'Christopher Nolan'
  },
  {
    title: 'The Lord of the Rings',
    director: 'Peter Jackson'
  },
  {
    title: 'Star Wars: The Empire Strikes Back',
    director: 'George Lucas'
  },
  {
    title: 'Avengers: Infinity War',
    director: 'Anthony Russo, Joe Russo'
  },
  {
    title: 'Scott Pilgrim vs. the World',
    director: 'Edgar Wright'
  },
  {
    title: 'Watchmen',
    director: 'Zack Snyder'
  },
  {
    title: 'Kung Fu Panda',
    director: 'Mark Osborne, John Stevenson'
  },
  {
    title: 'Princess Mononoke',
    director: 'Hayao Miyazaki'
  },
  {
    title: 'John Wick',
    director: 'Chad Stahelski, David Leitch'
  },
  {
    title: 'Hateful 8',
    director: 'Quentin Tarantino'
  },
  {
    title: 'Marriage Story',
    director: 'Noah Baumbach'}
];

app.use(morgan('common'))



app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('This is myFlix, the Site with all the info on your favorite Movies!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
