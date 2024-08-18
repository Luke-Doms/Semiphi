const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3005;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend_v2/build')));

app.listen(PORT, (error) => {
	if (!error) {
		console.log("server running");
	} else {
		console.log("server not running");
	}
});
