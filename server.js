var express = require('express'); // import spftware packeGES
var morgan = require('morgan'); //OUTPUT LOG OF SERVER
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
	'article-one' : {
		title: 'Article One | Mohit Agarwal',
		heading: 'Article One',
		date: 'May 16, 2020',
		content:`<p>
					Long Short Term Network (LSTM) is an type of recurrent neural network, Recurrent
					Neural Network (RNN) architecture used in the field of machine learning. While stan-
					dard neural networks are feed-forward, LSTM has feedback connections from previous
					layers that connects the weights and learning of previous layers to the next layer.
				</p>
				<p>
					It can process multiple data points like images, and also entire sequences of data like video.
					A common LSTM unit is composed of an input gate, a cell , an output gate and a forget
					gate. The cell remembers data values over set time intervals and the three gates regulate
					the flow of information in and out of the cell.
				</p>
				<p>
					Financial aspects and stock costs are fundamentally dependent upon abstract recog-
					nitions about the securities exchange. It is close difficult to foresee stock costs to the T,
					inferable from the instability of variables that assume a noteworthy job in the develop-
					ment of costs.
				</p>`
		},
	'article-two': {
		title: 'Article Two | Mohit Agarwal',
		heading: 'Article Two',
		date: 'May 18, 2020',
		content:`<p>
					Long Short Term Network (LSTM) is an type of recurrent neural network, Recurrent
					Neural Network (RNN) architecture used in the field of machine learning. While stan-
					dard neural networks are feed-forward, LSTM has feedback connections from previous
					layers that connects the weights and learning of previous layers to the next layer.
				</p>
				<p>
					It can process multiple data points like images, and also entire sequences of data like video.
					A common LSTM unit is composed of an input gate, a cell , an output gate and a forget
					gate. The cell remembers data values over set time intervals and the three gates regulate
					the flow of information in and out of the cell.
				</p>
				<p>
					Financial aspects and stock costs are fundamentally dependent upon abstract recog-
					nitions about the securities exchange. It is close difficult to foresee stock costs to the T,
					inferable from the instability of variables that assume a noteworthy job in the develop-
					ment of costs.
				</p>`
		},
	'article-three': {
		title: 'Article Three | Mohit Agarwal',
		heading: 'Article Three',
		date: 'May 20, 2020',
		content:`<p>
					Long Short Term Network (LSTM) is an type of recurrent neural network, Recurrent
					Neural Network (RNN) architecture used in the field of machine learning. While stan-
					dard neural networks are feed-forward, LSTM has feedback connections from previous
					layers that connects the weights and learning of previous layers to the next layer.
				</p>
				<p>
					It can process multiple data points like images, and also entire sequences of data like video.
					A common LSTM unit is composed of an input gate, a cell , an output gate and a forget
					gate. The cell remembers data values over set time intervals and the three gates regulate
					the flow of information in and out of the cell.
				</p>
				<p>
					Financial aspects and stock costs are fundamentally dependent upon abstract recog-
					nitions about the securities exchange. It is close difficult to foresee stock costs to the T,
					inferable from the instability of variables that assume a noteworthy job in the develop-
					ment of costs.
				</p>`
		}
	}

function createTemplate(data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;

	var htmlTemplate = `<html>
	<head>
		<title>${title}</title>
		<meta name="viewport" content="width-device-width, initial-scale=1" charset="utf-8">
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
				${date}
			</div>
			<div>
				${content}
			</div>
		</div>
	</body>
	</html>`;

	return htmlTemplate;
}


app.get('/:articleName', function (req, res) {
	var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]))//function to send file
});
//article name will article-one
//articles[articleName] == {} content object for article one


/*app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));//function to send file
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));//function to send file
});*/

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));//function to send file
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
