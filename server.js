/**
Validation server for json files used by the new EMU speech database management system

@author Raphael Winkelmann
*/

var myHttp = require('http'),
	https = require('https'),
	path = require('path'),
	fs = require('fs'),
	jsonlint = require('jsonlint');


var JSONLint = require('json-lint');
var url = require("url");
var tv4 = require('tv4');

// global vars
var port = 9263;
var annotSchemaData;

// get annotSchema
var annotSchemaURL = 'https://raw.githubusercontent.com/IPS-LMU/EMU-webApp/master/app/schemaFiles/annotationFileSchema.json';

https.get(annotSchemaURL, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        annotSchemaData = JSON.parse(body);
        console.log("Finished loading annotSchemaData");
    });
}).on('error', function(e) {
      console.log("Got error: ", e);
});


myHttp.createServer(function (request, response) {
	if (request.method === 'GET') {
		console.log('not processing GET');
	}
	if (request.method === 'POST') {
		// the body of the POST is JSON payload.
		var queryData = url.parse(request.url, true).query;
		// console.log(request.url);
		var data = '';
		request.addListener('data', function (chunk) {
			data += chunk;
		});
		request.addListener('end', function () {
			var lint = JSONLint(data);
			var mess = {};
			if (lint.error) {
				mess.type = 'ERROR';
				mess.from = 'JSLINT (means badly formated json)';
				mess.ERROR_MESSAGE = lint.error;
				mess.ERROR_LINE = lint.line;
				mess.ERROR_CHARACTER = lint.character;

				response.writeHead(200, {
					'content-type': 'text/plain'
				});
				response.end(JSON.stringify(mess, null, 2));
			} else {
				if (request.url === '/_DBconfig') {
					// console.log('Validating _DBconfig file')
					// console.log(path2schemas + 'globalDBschema.json')
					// fs.readFile(path2schemas + 'globalDBschema.json', 'utf8', function (globErr, globData) {

					// 	var validationErrs = v.validate(JSON.parse(data), JSON.parse(globData)).errors;
					// 	if (validationErrs.length === 0) {
					// 		mess.type = 'SUCCESS';
					// 		response.writeHead(200, {
					// 			'content-type': 'text/plain'
					// 		});
					// 		response.end(JSON.stringify(mess, null, 2));
					// 	} else {
					// 		// console.log('VALIDATION ERRORS:');
					// 		// console.log(validationErrs);
					// 		mess.type = 'ERROR';
					// 		mess.from = 'JSONSCHEMA (means does not comply to schema)';
					// 		mess.ERRORS = validationErrs;

					// 		response.writeHead(200, {
					// 			'content-type': 'text/plain'
					// 		});
					// 		response.end(JSON.stringify(mess, null, 2));
					// 	}
					// });
				} else if (request.url === '/_annot') {
					// console.log('Validating _annot file');
					// console.log(path2schemas + 'annotationFileSchema.json');
						
					var validRes = tv4.validate(JSON.parse(data), annotSchemaData);
						
					if (validRes) {
						mess.type = 'SUCCESS';
						response.writeHead(200, {
							'content-type': 'text/plain'
						});
						response.end(JSON.stringify(mess, null, 2));
					} else {
						mess.type = 'ERROR';
						mess.from = 'JSONSCHEMA (means does not comply to schema)';
						mess.ERRORS = tv4.error;

						response.writeHead(200, {
							'content-type': 'text/plain'
						});
						response.end(JSON.stringify(mess, null, 2));
					}

				}
			}
		});
	}
}).listen(port);


console.log("Server Running @ http://localhost:" + port);