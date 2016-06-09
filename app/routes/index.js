'use strict';

var path = process.cwd();
//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {
	var objectDirection = {
		url: "",
		shortURL: ""
	};
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.get(/(new)+/,function(req, res){
			var initialURL = req.originalUrl.replace(/\/new\//, "");
			if (initialURL.indexOf("http://") !== 0){
				res.json({"error": "URL is invalid"});
			} else {
				var shortURL = Math.round(Math.random()*(10000-1001))+1001;
				objectDirection.url = initialURL;
				objectDirection.shortURL = '/' + shortURL.toString();
				res.json({originalURL: initialURL, shortURL: req.protocol + '://' + req.hostname + '/' + shortURL});	
			}
		});
	
	app.get(/\/.+/, function(req, res){
		if (req.originalUrl === objectDirection.shortURL){
			res.redirect(objectDirection.url);
		}
	});

};
