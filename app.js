//! import the package here.
var express = require('express');
var sd = require('silly-datetime');
var bodyParser = require('body-parser');

//! constant variables
const dateFormat = 'DD/MM/YYYY HH:mm:ss';
const comments = [
  {
    name: 'James',
    dateTime: sd.format(new Date(2019, 04, 16, 17, 22, 22), dateFormat),
    message: "It's so good."
  },
  {
    name: 'Jason',
    dateTime: sd.format(new Date(2019, 02, 23, 15, 01, 30), dateFormat),
    message: "It's good！"
  },
  {
    name: 'Lex',
    dateTime: sd.format(new Date(2019, 01, 05, 09, 10, 30), dateFormat),
    message: "It's very good."
  },
  {
    name: 'Coral',
    dateTime: sd.format(new Date(2018, 05, 26, 22, 00, 15), dateFormat),
    message: "It's perfect."
  }
];

var app = express();

//! Setting for the rendering engine
//* When express renders the files with the extension of '.html',
//* application will use 'art-template' engine.
app.engine('html', require('express-art-template'));

/*
 * Default path for views template is './views/'.
 * If you want to change the default path, you can use
 *     app.set('views', '/path/to/folder')
 */
//! Setting for the resources loading
//* static resources loaded
app.use('/public/', express.static('./public/'));

//! Setting for the middleware
//* setting for the 'body-parser'
//* parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//* parse application/json
app.use(bodyParser.json());

//! Route table
app
  .get('/', function(req, res) {
    res.render('index.html', {
      comments: comments
    });
  })
  .get('/post', function(req, res) {
    res.render('post.html');
  })
  .post('/post', function(req, res) {
    //* Submit a comment
    //* Grab the details of a comment
    var comment = req.body;
    comment.dateTime = sd.format(new Date(), dateFormat);
    comments.unshift(comment);
    res.redirect('/');
  });

app.listen(3000, function() {
  console.log('running...');
});
