const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
var routes = require('./routes');
const connection = require('./config/database.js');
const path = require('path');

require('dotenv').config();

const MongoStore = require('connect-mongo');

const app = express();
const PORT = 3005;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
	  maxAge: 1000 * 60 * 60 * 24
	},
	store: MongoStore.create({
	  client: connection.getClient(),
	  collectionName: 'sessions'
	})
  }));

require('./config/passport.js');

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.use(express.static(path.join(__dirname, '../frontend_v2/build')));

app.listen(PORT, (error) => {
	if (!error) {
		console.log("server running");
	} else {
		console.log("server not running");
	}
});
