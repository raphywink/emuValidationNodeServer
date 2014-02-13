# emuValidationNodeServer

Simple validation server to validate json files used by the new EMU speech database management system


#CURL commands:

## Validate `_DBconfig.json` files

### curl

`curl -XPOST -H 'Content-Type:application/json' -H 'Accept: application/json' --data-binary @/path/2/emuLVC/validators/exampleInstances/instanceOfglobalDBconfig.json http://localhost:9263/_DBconfig`

### RCurl

`library('RCurl')`

`json_file = '/path/2/emuLVC/validators/exampleInstances/instanceOfglobalDBconfig.json'`
`json_data = fromJSON(paste(readLines(json_file), collapse=""))`
`headers <- list('Accept' = 'application/json', 'Content-Type' = 'application/json')`
`postForm("http://localhost:9263/_DBconfig", .opts=list(postfields=paste(readLines(json_file), collapse=""), httpheader=headers))`


## Validate `_annot.json` files

### curl

`curl -XPOST -H 'Content-Tpe:application/json' -H 'Accept: application/json' --data-binary @/path/2/emuLVC/validators/exampleInstances/instanceOfAnnotationFile.json http://localhost:9263/_annot`

### RCurl

`library('RCurl')`

`json_file = '/path/2/emuLVC/validators/exampleInstances/instanceOfAnnotationFile.json'`
`json_data = fromJSON(paste(readLines(json_file), collapse=""))`
`headers <- list('Accept' = 'application/json', 'Content-Type' = 'application/json')`
`postForm("http://localhost:9263/_annot", .opts=list(postfields=paste(readLines(json_file), collapse=""), httpheader=headers))`
