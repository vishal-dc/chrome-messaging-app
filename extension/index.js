var bridgeApp = angular.module('bridgeApp', []);

function BridgeFe(scope, appService){
    var ctrl = this;
    this.messages = ['heello', 'hell'];
    
    //this.appId = '';
    
    this.send = function(){
        console.log("Send");
        angular.forEach(this.messages, function(msg){
           console.log(msg); 
        });
        
        this.messages = [];
    };
    
    this.getApps = function(){
        appService.getApps(function(list){
            ctrl.appList = list;            
            console.log(list);  
        });
        
        
    };
    
    this.openApp = function(id){
       console.log(appService.openApp(id));  
    };
    
    this.openIppTrainerApp = function(){
        var app = appService.getAppByName('IPP Trainer Application');
        if(app)
            this.openApp(app.id);
        else
            console.log("App Not Found");
    };
    
}

function AppsService(){
    
    var appList = [];
    // Async code required to be finished before service considered fully init.
    chrome.management.getAll(function(list){
        appList = list;
        
    });
    
    this.getAppByName = function(name){
        var foundApp;
        
        appList.some(function(app){
            if(app.name === name){
                foundApp = app;
                return true;
            }else{
                return false; 
            }
                
        });
        
        return foundApp;
    };
    
    this.getAppIdByName = function(name){
        var app = this.getAppByName(name);
        return app? app.id : undefined ;  
    };
    
    this.getApps = function(callback){
        
        if(appList && appList.length >0 ){
            chrome.management.getAll(function(list){
                appList = list;
                (callback || angular.noop)(list);
            });
        }else{
            (callback || angular.noop)(appList);
        }
        
    };
    
    this.openApp = function(id, callback){      
        chrome.management.launchApp(id, callback || angular.noop);
    };
    
}

bridgeApp.controller('BridgeFe',['$scope','appsService', BridgeFe])
        .service('appsService', AppsService);

/*

(function(context){

  document.getElementById("appid").value=chrome.runtime.id;  
  var logField = document.getElementById("log");
  var sendText=document.getElementById("sendText");
  var sendText=document.getElementById("sendText");
  var sendId=document.getElementById("sendId");
  var send=document.getElementById("send");

  send.addEventListener('click', function() {
    appendLog("sending to "+sendId.value);
    chrome.runtime.sendMessage(
      sendId.value, 
      {myCustomMessage: sendText.value}, 
      function(response) { 
        appendLog("response: "+JSON.stringify(response));
      })
  });

  var appendLog = function(message) {
    logField.innerText+="\n"+message;
  }

  context.appendLog = appendLog;

})(window)
*/