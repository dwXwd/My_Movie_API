const express = require('express'),
morgan = require('morgan');
const app = express();


let topMovies = [
  {
    title: 'Batman - Dark Knight',
    director: 'CHristopher Nolan'
  },
  {
    title: 'The Lord of the Rings',
    director: 'Peter Jackson'
  },
  {
    title: 'Star Wars: Phantom Menace',
    director: 'George Lucas'
  }
];

app.use(morgan('common'))
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
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
