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
		tasks.addTasks(listOfTasks);
		global.setTimeout(function(){
			tasks.hideWindow();

		},20000);//hide
		
	},5000)//show;
	
	

	
	
	
})(window);


