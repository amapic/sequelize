const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const app = express();
const routes = {
	planets: require('./routes/planets'),
};

const app = express();
const mysql = require('mysql');
// const express = require('express');
const session = require('express-session');
const jws = require('./jws');
// access config var
process.env.TOKEN_SECRET;
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});
// app.use(sessionHandler)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));



// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function (req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

// We provide a root route just as an example
app.get('/', (req, res) => {
	res.send(`
		<h2>Hello, Sequelize + Express!</h2>
		<p>Make sure you have executed <b>npm run setup-example-db</b> once to have a populated example database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/users'>/api/users</a> or <a href='/api/orchestras?includeInstruments'>/api/orchestras?includeInstruments</a>!</p>
		<p>To experiment with POST/PUT/DELETE requests, use a tool for creating HTTP requests such as <a href='https://github.com/jakubroztocil/httpie#readme'>HTTPie</a>, <a href='https://www.postman.com/downloads/'>Postman</a>, or even <a href='https://en.wikipedia.org/wiki/CURL'>the curl command</a>, or write some JS code for it with <a href='https://github.com/sindresorhus/got#readme'>got</a>, <a href='https://github.com/sindresorhus/ky#readme'>ky</a> or <a href='https://github.com/axios/axios#readme'>axios</a>.</p>
	`);
});

app.get('/get_lovbv xgin', jws.authenticateToken, function (request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.post('/check_login', jws.authenticateToken, function (request, response) {

	response.send(true);
});

app.post('/login', function (request, response) {
	// Capture the input fields
	console.log(request.body);
	let username = request.body.nom;
	let password = request.body.mdp;
	console.log(username);
	console.log(password);
	// Ensure the input fields exists and are not empty
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		port: '3306',
		database: 'login'
	});
	console.log(connection);
	connection.connect(function (err) {
		if (err) {
			// connection.end()
			return console.error('error: ' + err.message);

		}


		console.log('Connected to the MySQL server.');
	});

	
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT username FROM identifiant WHERE nom = ? AND mdp = ?', [username, password], function (error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) {
				response.send({
					username: '',
					token: '',
					status: 'erreur bdd'
				}
				);
			} else {
				// If the account exists
				if (results.length > 0) {
					console.log(JSON.stringify(results));
					const token = jws.generateAccessToken({ username: results[0].username });
					response.send({
						username: results[0].username,
						token: token,
						status: 'ok'
					}
					);
				} else {
					response.send({
						username: '',
						token: 'erreur mdp',
						status: 'erreur mdp'
					});
				}
			}
			response.end();
		});
	} else {
		response.send({
			token: 'pb envoi requete',
			status: false
		});
		response.end();
	}
});


// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	if (routeController.getById) {
		app.get(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.getById)
		);
	}
	if (routeController.create) {
		app.post(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.create)
		);
	}
	if (routeController.update) {
		app.put(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.update)
		);
	}
	if (routeController.remove) {
		app.delete(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.remove)
		);
	}
}

module.exports = app;
