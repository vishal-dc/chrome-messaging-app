(function(window, $){
    
function noop(){};
/**
Utility to store to the local storage
**/
var utils = {};
window.utils = utils;
var readerId = 0,
    appId = 0,
    extId = 0,
    readerPrefix = 'reader.',
    extPrefix = 'extension.',
    appPrefix = 'app.';
    
//utils.getNextReaderId = function(){return readerId++};
//utils.getNextAppId = function(){return appId++};
//utils.getNextExtId = function(){return extId++};    
//utils.getKey = function(prefix, id){return prefix+'.'+ id};

utils.set = function(key, value, callback){
    
    chrome.storage.local.set({key:value},function(){
        console.log("saved",key) ;
        (callback || noop)(items);
    });
        
};

utils.get = function(keys, callback){
        
    chrome.storage.local.get(js, function(items){
            (callback || noop)(items);          
    });
        
};

    
   
utils.postMessage = function(port, msg){
      port.postMessage(msg);
    //
};
    
})(window);