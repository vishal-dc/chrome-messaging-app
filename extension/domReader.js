//var domReaderApp = angular.module('domReaderApp', []);
//
//chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//  console.log(response.farewell);
//});

console.log("initializing DomReaderJs!");

var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
    var reply; 
    var qs = [];
  if (msg.question == "Who's there?"){
      
    reply = {answer: "Madame"};    
    console.log(reply);
    port.postMessage(reply);
      
  }else if (msg.question == "Madame who?"){
      
    reply = {answer: "Madame... Bovary"};
    console.log(reply);
    port.postMessage(reply);
  }
    utils.set(msg.question,reply);
    qs.push(msg.question);
    chrome.storage.local.get(qs, function(items){
        for(var item in items){
            console.log(item);
        }
        
    });
    
});

//start
