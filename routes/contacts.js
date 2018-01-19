const app = require('express').Router();

app.get('/', (req, res) => res.render('site/contacts'));

module.exports = app;
