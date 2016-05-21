//var blacklistedIds = ["none"];
//
//chrome.runtime.onMessageExternal.addListener(
//  function(request, sender, sendResponse) {
//    if (sender.id in blacklistedIds) {
//      sendResponse({"result":"sorry, could not process your message"});
//      return;  // don't allow this extension access
//    } else if (request.myCustomMessage) {
//      new Notification('Got message from '+sender.id,
//          { body: request.myCustomMessage });
//      sendResponse({"result":"Ok, got your message"});
//    } else {
//      sendResponse({"result":"Ops, I don't understand this message"});
//    }
//  });
//

chrome.runtime.onConnect.addListener(function(port) {
    //alert("hi");
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
          var reply; 
        var js=[];
    if (msg.joke == "Knock knock"){
        reply = {question: "Who's there?"};
        console.log(reply);
        port.postMessage(reply);
    }else if (msg.answer == "Madame"){
        
        reply = {question: "Madame who?"};
        console.log(reply);        
        port.postMessage(reply);  
        
    }else if (msg.answer == "Madame... Bovary"){
        reply = {question: "I don't get it."};
        console.log(reply);        
        port.postMessage(reply);  
    
    
    }
        utils.set(msg.joke || msg.answer,reply);
      
        js.push(msg.joke || msg.answer);
      
        utils.get(js, function(items){
            for(var item in items){
                console.log(item);
            }
    });
      
  });
});

