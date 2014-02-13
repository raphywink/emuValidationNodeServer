/**
Validation server for json files used by the new EMU speech database management system

@author Raphael Winkelmann
*/

var sys = require('sys'),
	myHttp = require('http'),
	path = require('path'),
	fs = require('fs');


var JSONLint = require('json-lint');
var url = require("url");
var queryString = require("querystring");

var Validator = require('jsonschema').Validator;
var v = new Validator();


// global vars
var port = 9263;
var path2schemas = 'schemas/';

myHttp.createServer(function (request, response) {
	if (request.method === 'POST') {
		// the body of the POST is JSON payload.
		var queryData = url.parse(request.url, true).query;
		console.log(request.url);
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
					fs.readFile(path2schemas + 'globalDBschema.json', 'utf8', function (globErr, globData) {

						var validationErrs = v.validate(JSON.parse(data), JSON.parse(globData)).errors;
						if (validationErrs.length === 0) {
							mess.type = 'SUCCESS';
							response.writeHead(200, {
								'content-type': 'text/plain'
							});
							response.end(JSON.stringify(mess, null, 2));
						} else {
							// console.log('VALIDATION ERRORS:');
							// console.log(validationErrs);
							mess.type = 'ERROR';
							mess.from = 'JSONSCHEMA (means does not comply to schema)';
							mess.ERRORS = validationErrs;

							response.writeHead(200, {
								'content-type': 'text/plain'
							});
							response.end(JSON.stringify(mess, null, 2));
						}
					});
				} else if (request.url === '/_annot') {
					// console.log('Validating _DBconfig file');
					// console.log(path2schemas + 'annotationFileSchema.json');
					fs.readFile(path2schemas + 'annotationFileSchema.json', 'utf8', function (annotErr, annotData) {
						var validationErrs = v.validate(JSON.parse(data), JSON.parse(annotData)).errors;
						if (validationErrs.length === 0) {
							mess.type = 'SUCCESS';
							response.writeHead(200, {
								'content-type': 'text/plain'
							});
							response.end(JSON.stringify(mess, null, 2));
						} else {
							// console.log('VALIDATION ERRORS:');
							// console.log(validationErrs);
							mess.type = 'ERROR';
							mess.from = 'JSONSCHEMA (means does not comply to schema)';
							mess.ERRORS = validationErrs;

							response.writeHead(200, {
								'content-type': 'text/plain'
							});
							response.end(JSON.stringify(mess, null, 2));
						}
					});
				}

				// mess.type = 'SUCCESS';
				// response.writeHead(200, {
				// 	'content-type': 'text/plain'
				// });
				// response.end(JSON.stringify(mess, null, 2));
			}
		});
	}
}).listen(port);


sys.puts("Server Running @ http://localhost:" + port);