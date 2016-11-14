//require everything you need for the app
//requre express, method-override, body-parser

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var models = require('./models');
var sequelizeConnection = models.sequelize;
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')
	.then(function(){
		return sequelizeConnection.sync();
	});

var application_controller = require('./controllers/application_controller');
var burgers_controller = require('./controllers/burgers_controller');

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use('/', burgers_controller);


// we set the port of the app
var PORT = 3000;
app.listen(process.env.PORT || PORT);

