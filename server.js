const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// load routes
const site = require('./routes/site');
const plans = require('./routes/plans');
const todos = require('./routes/todos');

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

// Setup Middleware
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add routes
app.use('/', site);
app.use('/plans', plans); // <--- Added
app.use('/todos', todos);

app.listen(PORT, () => {
  console.log('Server listening on ', PORT);
})
