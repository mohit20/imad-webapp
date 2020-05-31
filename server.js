var express = require('express'); // import spftware packeGES
var morgan = require('morgan'); //OUTPUT LOG OF SERVER
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = {
	user:'imad',
	database: 'test',
	host: 'localhost',
	port:'5432',
	password: '12345'//process.env.DB_PASSWORD //'12345'
}

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json()); //if incoming request has content type as json then it will set the json data in req.body
app.use(session({
	secret:'sameRandomValue',
	cookie:{maxAge: 1000 * 60 * 60 * 24 * 30},
	resave: true,
    saveUninitialized: true
}));

function hash(input, salt){
	var hashed = crypto.pbkdf2Sync(input,salt,10000, 512,'sha512');
	return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req,res){
	var hashedString = hash(req.params.input, 'a-random-string');
	res.send(hashedString);

	//algo - md5
	//password - "tree1234"
	//password + salt = tree1234a-random-string 
	//tree1234a-random-string -> <hash>, <hash> ... 10000
});

app.post('/create-user', function(req,res){
	//username password
	//JSON format data will come
	//{'username':'mohit', 'password': 'mohit20'}
	var username = req.body.username;
	var password = req.body.password;
	var salt = crypto.randomBytes(128).toString('hex');
	var dbString = hash(password,salt);
	//double quotes for user as it is keyword in postgres
	pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username,dbString], function (err,result){
		if(err)		{
			res.status(500).send(err.toString());
		} else {
			res.send('User successfully created : ' + username);
		}
	});
});

app.post('/login', function(req, res)
{
	var username = req.body.username;
	var password = req.body.password;
	//var salt = crypto.randomBytes(128).toString('hex');
	//var dbString = hash(password,salt);
	pool.query('SELECT * FROM "user" where username = $1', [username], function (err,result){
		if(err)	{
			res.status(500).send(err.toString());
		} else {
			if(result.rows.length === 0){
				res.status(403).send('Username/password is invalid\n');
			}
			else{
				var dbString = result.rows[0].password;
				var salt = dbString.split('$')[2];
				var hashPassword = hash(password,salt); //Creating has based on password submitted and original salt
				if(hashPassword === dbString){
					//Set the Session
					req.session.auth = {userId: result.rows[0].id};
					// set cookie with a session id
					//internally, on server side, it maps the session id to an object
					//{auth: {userId}} - the object
					res.send('Credentials are correct\n');
					//res.send('User successfully Logged In : ' + username);
				}else{
					res.status(403).send('Username/passwordis invalid!\n Please try again\n');
				}
			}
		}
	});
});

app.get('/check-login', function(req, res){
	if( req.session && req.session.auth && req.session.auth.userId){
		res.send('Your are logged in: '+ req.session.auth.userId.toString());
	}
	else{
		res.send('You are not logged in');
	}
});

app.get('/logout', function (req, res){
	delete req.session.auth;
	res.send('Logged out');
});

function createTemplate(data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;

	var htmlTemplate = `
	<html>
		<head>
			<title>${title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" charset="utf-8">
			<link href="/ui/style.css" rel="stylesheet" />
		</head>
		<body>
			<div class="container">
				<div>
					<a href="/">Home</a>
				</div>
				<hr/>
				<h3>${heading}</h3>
				<div>
					${new Date(date).toDateString()}
				</div>
				<div>
					${content}
				</div>
			</div>
		</body>
	</html>`;

	return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));//function to send file
});


var pool = new Pool(config);
app.get('/test-db', function(req, res){
	//make a request
	//return a response
	pool.query('SELECT * from test', function(err,result){
		if(err)
			res.status(500).send(err.toString());
		else
			res.send(JSON.stringify(result.rows));
	});
	
});


var counter = 0;
app.get('/counter', function(req, res){
	counter = counter + 1;
	res.send(counter.toString());
});

app.get('/articles/:articleName', function (req, res) {
	//var articleName=req.params.articleName;
	pool.query("SELECT * from article where title = $1", [req.params.articleName], function(err, result){ //parameterization to protect from sql injection
		if (err){
			res.status(500).send(err.toString());
		}
		else{
			if (result.rows.length === 0){
				res.status(404).send('Article not Found');
			}
			else{
				var articleData = result.rows[0];
				res.send(createTemplate(articleData));
			}
		}
	});
});

/*app.get('/:articleName', function (req, res) {
	var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));//function to send file
});*/

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));//function to send file
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



var names = []
app.get("/submit-name/", function(req,res){ //URL: /submit-name?name=ddddd
	//Get the name from request object
	var name = req.query.name;
	names.push(name);
	//JSON to send data since it will take only string

	res.send(JSON.stringify(names));
});

//article name will article-one
//articles[articleName] == {} content object for article one


/*app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));//function to send file
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));//function to send file
});*/



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8080;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
