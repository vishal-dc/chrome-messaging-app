/**
Utility to store to the local storage
**/
var utils = {};

utils.set = function(key, value, callback){
    
    chrome.storage.local.set({key:value},function(){
       console.log("saved",key) ;
        return callback ? callback():false;        
    });
        
};

utils.get = function(keys, callback){
        
    chrome.storage.local.get(js, function(items){
          return callback ? callback(items):false;        
    });
        
};

