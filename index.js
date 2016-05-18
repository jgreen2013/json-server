var express = require('express');
var fs = require('fs');
var app = express();

app.get('/',function(req,res){
  res.send("Response from Node Express!");
});

app.get('/json/:qty',function(req,res,next){
  console.log(Date.now() + " /json Request Received for " + req.params.qty + " objects from " + req.ip + " " + req.hostname);
  var output = "[";
  for (var i = 0;i< parseInt(req.params.qty);i++){
    output += "{";
    var firstNum = Math.floor((Math.random()*350)+0);
    output += "\"Device" + i + "\"" + ":" + firstNum;
    output += "},";
  }
  output = output.substring(0,output.length-1);
  output += "]";
  res.send(output);
  fs.writeFile("file.json",output,function(err){
    if(err){
      return console.log(err);
    }
  });
  next();
});

app.listen(3000,function(){
  console.log("listening on port 3000...");
  console.log("example: http://localhost:3000/json/3");
  console.log("Returns: [{\"Device0\":RandomNumber},{\"Device1\":RandomNumber},{\"Device2\":RandomNumber}]");
});
