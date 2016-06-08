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
console.log("initializing event page..");



(function initEventPage(window){
    var messages = [];
    window.trainer = {};
    window.trainer.messages = messages;
    
    chrome.runtime.onConnect.addListener(function(port) {
        console.assert(port.name == "knockknock");
        port.onMessage.addListener(function(msg, sender) {
            if(msg.name ==='click')
                messages.push(msg);
            else
                console("Don't recognize event: ", msg);
            
            messages.forEach(function(msg){
                console.log(msg);
            })
        });
    });
})(window);

                               

/*
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
*/
