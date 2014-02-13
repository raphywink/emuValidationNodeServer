# emuValidationNodeServer

Simple validation server to validate json files used by the new EMU speech database management system

#CURL commands:

## Validate `_DBconfig.json` files

### curl

`curl -XPOST -H 'Content-Type:application/json' -H 'Accept: application/json' --data-binary @/Users/raphaelwinkelmann/Developer/emuLVC/validators/exampleInstances/instanceOfglobalDBconfig.json http://localhost:9263/_DBconfig`

### rCurl

x= list(items=c("http://localhost:3000/documents/2", "http://localhost:3000/documents4"))
headers <- list('AUTH-KEY' = "soanclCNdnLDcnlNc", 'Accept' = 'application/json', 'Content-Type' = 'application/json')
postForm("http://localhost:3000/documents/download?format=zip", .opts=list(postfields=toJSON(x), httpheader=headers))