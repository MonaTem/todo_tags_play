const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// load routes
const site = require('./routes/site'); // <--- ADDED
const todos = require('./routes/todos');
const about = require('./routes/about');
const contacts = require('./routes/contacts');

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

// Setup Middleware
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add routes
app.use('/', site);  // <----- ADDED
app.use('/todos', todos);

app.use('/', about);  // <----- ADDED
app.use('/about', about);

app.use('/',contacts);  // <---- ADDED
app.use('/contacts', contacts);

app.listen(PORT, () => {
  console.log('Server listening on ', PORT);
})
