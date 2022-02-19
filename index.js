const express = require('express'),
bodyParser = require('body-parser'),
uuid = require('uuid');
morgan = require('morgan');

const app = express();

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: 'Dennis',
    favoriteMovies: []
  },
  {
    id: 2,
    name: 'Schmennis',
    favoriteMovies: []
  }
];

//READ all user-objects

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// CREATE a new user

app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser) //201 means we created something successfully
  } else {
    res.status(400).send('Sorry! The user does need a name :(')
  }
})

//UPDATE a user-profile

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user) //we did NOT create something new
  } else {
    res.status(400).send('Sorry, there was no such user!')
  }
})

//CREATE a new favorite movie within a user's profile

app.post('/users/:id/:title', (req, res) => {
  const { id, title } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies.push(title);
    res.status(200).end(`${title} has been added to the array of user ${id}`) //we did NOT create something new
  } else {
    res.status(400).send('Sorry, there was no such user!')
  }
})

//DELETE a favorite movie within a user's profile


app.delete('/users/:id/:title', (req, res) => {
  const { id, title } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( movieTitle => movieTitle !== title);
    res.status(200).send(`${title} has been removed from the array of user ${id}`) //we did NOT create something new
  } else {
    res.status(400).send('Sorry, there was no such user!')
  }
})

//DELETE a user's profile

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`User ${id} has been successfully deleted`); //we did NOT create something new
  } else {
    res.status(400).send('Sorry, there was no such user!')
  }
})



let movies = [
  {
    title: 'Batman - Dark Knight',
    director: {name:'Christopher Nolan'},
    genre: {name: 'Comic-Adaptation'}
  },
  {
    title: 'The Lord of the Rings',
    director: {name:'Peter Jackson'},
    genre: {name:'fantasy'}
  },
  {
    title: 'Star Wars: The Empire Strikes Back',
    director: {name:'George Lucas'},
    genre: {name:'Science - Fiction'}
  },
  {
    title: 'Avengers: Infinity War',
    director: {name:'Anthony Russo, Joe Russo'},
    genre: {name: 'Comic-Adaptation'}
  },
  {
    title: 'Scott Pilgrim vs. the World',
    director: {name:'Edgar Wright'},
    genre: {name: 'Comic-Adaptation'}
  },
  {
    title: 'Watchmen',
    director: {name:'Zack Snyder'},
    genre: {name: 'Comic-Adaptation'}
  },
  {
    title: 'Kung Fu Panda',
    director: {name:'Mark Osborne, John Stevenson'},
    genre: {name: 'Animation'}
  },
  {
    title: 'Princess Mononoke',
    director: {name:'Hayao Miyazaki'},
    genre: {name: 'Anime'}
  },
  {
    title: 'John Wick',
    director: {name:'Chad Stahelski, David Leitch'},
    genre: {name: 'Action'}
  },
  {
    title: 'Hateful 8',
    director: {name:'Quentin Tarantino'},
    genre: {name: 'Drama'}
  },
  {
    title: 'Marriage Story',
    director: {name:'Noah Baumbach'},
    genre: {name: 'Romance'}
  }
];

// Gets the list of data about ALL movies

app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

// Gets the data about a single movie, by title

app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send ('There is no such movie')
  }
})

app.get('/movies/genres/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.genre.name === genreName ).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send ('There is no such genre :(')
  }
})

app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.director.name === directorName ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send ('There is no such director :(')
  }
})



app.use(morgan('common'))

app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('This is myFlix, the Site with all the info on your favorite movies!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Computer says "NO"');
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
