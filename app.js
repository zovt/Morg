var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'jade');

if (app.get('env') == 'development') {
    app.locals.pretty = true;
};

app.use(express.static(path.join(__dirname, 'pages')));


// objects
var File = function(fname, contents) {
    this.name = fname;
    this.contents = contents;
};

// resource routing
var sdir = __dirname + "/bower_components/";
app.get('/s/jquery.js', function(req, res) {
    res.sendFile("jquery.js", { root: sdir + "jquery/dist" });
});

app.get('/s/angular.js', function(req, res) {
    res.sendFile("angular.js", { root: sdir + "angular/" });
});

// page routing
var pdir = __dirname + "/pages/";
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/main', function(req, res) {
    res.render('main');
});


// api routing
app.get('/getnotes', function(req, res) {
    fs.readdir(__dirname + "/notes/", function(err, files) {
	if (err) {
	    console.log("err: " + err);
	} else {
	    var flist = [];
	    for( i = 0; i < files.length; i++) {
		flist[i] = new File(files[i],
				    fs.readFileSync(__dirname + "/notes/" + files[i],
						    { encoding: "utf8" }));
	    }
	}
	res.send(flist);
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Listening on http://%s:%s", host, port);
});
