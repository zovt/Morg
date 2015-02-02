var express = require('express');
var app = express();

app.use(express.static(__dirname + "/pages"));

app.get('/', function (req, res) {
    res.sendfile("./pages/index.html");
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Listening on http://%s:%s", host, port);
});