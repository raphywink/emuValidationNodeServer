# emuValidationNodeServer

Simple validation server to validate json files used by the new EMU speech database management system

# Quickstart

Install dependencies and start server with:

- `npm install`
- `node server.js`

#CURL commands:

## Validate `_annot.json` files

### curl

`curl -H "Content-Type: applicationjson" --data-binary  @msajc003_annot.json http://localhost:9263/_annot`

### RCurl

`library('RCurl')`

`json_file = '/path/2/instanceOfAnnotationFile.json'`
`json_data = fromJSON(paste(readLines(json_file), collapse=""))`
`headers <- list('Accept' = 'application/json', 'Content-Type' = 'application/json')`
`postForm("http://localhost:9263/_annot", .opts=list(postfields=paste(readLines(json_file), collapse=""), httpheader=headers))`
