var http = require('http');
var url = require('url');
var fs = require('fs');
console.clear();



http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "./src" + q.pathname;
  console.log("Incoming connection...");
  try{
    StartHttp();
}
catch{
    console.log("Error!");
    console.log("Connection failed!");
}
  function StartHttp(){
      
  fs.readFile(filename, function(err, data) {
    if (err) {
        if(filename == "./src/"){
            filename = "./src/index.html";
            StartHttp();
            return;
        }
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found\n" + filename + " is wrong");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}
}).listen(1000);
