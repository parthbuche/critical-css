var express = require('express'),
  critical = require('critical'),
  bodyParser = require('body-parser'),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post('/critical', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); //Allow CORS

  var url = req.body.critical;

  critical.generate(
    {
      base: 'dist/',
      src: url,
      dest: 'critical-test.css',
      inline: false,
      ignore: {
        atrule: ['@font-face'],
        decl: (node, value) => /url\(/.test(value),
      },
      extract: false,
      pathPrefix: '/css',

      dimensions: [
        {
          width: 1030,
        },
        {
          width: 880,
        },
        {
          width: 737,
        },
      ],
    },
    (err, output) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else if (output) {
        console.log('Generated critical CSS');
        res.setHeader('Content-Type', 'application/json');

        res.json(output);
      }
    }
  );
});

// listen for requests :)
var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
