// check jquery
(function(global){
    
	if(!global.jQuery){
			throw new Error("Jquery not defined");
	}
  var $ = global.jQuery;
	
	//options object optional
	function init(options){
		
		console.log("initializing tasks-pop.js...");	
	
		$.get(chrome.extension.getURL('/tasks-popup.html'), function(data) {
			//$(data).appendTo('body');
			// Or if you're using jQuery 1.8+:

			console.log(data);

			$($.parseHTML(data)).appendTo('body');	
    
      initHandlers();


		});
	}
    
    function initHandlers(){
        $('#popup #min').click(function(){

            
              $('#popup .card').hide(500);
             $('#popup #expand').show();
            $('#popup #min').hide();
            
        });
        
         $('#popup #expand').click(function(){

            
              $('#popup .card').show(500);
              $('#popup #min').show();
             $('#popup #expand').hide();
            
        }); 
        
        $('#popup #hint').click(function(){
           console.log("hinting..") ;
        });

        

    }
	
	function showWindow(){
		$('.tasks-popup').show(500);
	}
	
	function hideWindow(){
		
		$('.tasks-popup').hide(500);
	}
	
	// arrayOfTasks
	function addTasks(listOfTasks){

		
		var div = $('.tasks-popup #tasks ul');
		
		listOfTasks.forEach(function(task){
			div.append('<li>'+task+'</li>');
			
		});
		
		
		
		
	}
	
	function clearTasks(){
		$('.tasks-popup');
		
		
	}
	
	
	var TasksPopup = function TasksPopup(){};
	
	TasksPopup.prototype.init = init;
	TasksPopup.prototype.addTasks = addTasks;
	TasksPopup.prototype.showWindow = showWindow;
	TasksPopup.prototype.hideWindow = hideWindow;
	
	
	//export popup;
	
	global.tasks = new TasksPopup();
	
	
	
})(window);

(function test(global){
	
	var tasks = global.tasks;
			
	var listOfTasks = ['task1','task4','task3','task2'];
	
	tasks.init();
	
	global.setTimeout(function(){
		tasks.showWindow();	
	//	tasks.addTasks(listOfTasks);
      
//		global.setTimeout(function(){
//			tasks.hideWindow();
//
//		},20000);//hide
		
	},2000)//show;
	
	

	
	
	
})(window);


