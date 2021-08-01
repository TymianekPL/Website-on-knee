const http = require('http');
const url = require('url');
const fs = require('fs');
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
      return res.end("404 Not Found\n<br /><code>" + filename + "</code> is wrong");
    }
    var contenttype = "";
    if ( filename.endsWith( ".html" ) )
      contenttype = "text/html";
    else if ( filename.endsWith( ".css" ) )
      contenttype = "text/css";
    else if ( filename.endsWith( ".js" ) )
      contenttype = "text/javascript";
    res.writeHead( 200, { 'Content-Type': contenttype } );
    res.write(data);
    return res.end();
  });
}
} ).listen( 1000, "0.0.0.0" );
