    // check jquery
(function(global){
    
    
    if(!global.jQuery){
        throw new Error("Jquery not defined");
    }
    var $ = global.jQuery;
    var ANIMATE_DELAY = 500; //500ms
		var tasksArray = [];
    var taskCounter = 0;
        
      //options object optional
        function init(options){

            console.log("initializing tasks-pop.js...");	

            $.get(chrome.extension.getURL('/tasks-popup.html'), 
                  function(data) {

//								  console.log(data);

                    $($.parseHTML(data)).appendTo('body');	

                    initHandlers();
                    add2Tasks(nextTask(), nextTask());                   

											
                });
        }
				function refreshTasks(){            
            removeFirst();
           
				};
    
        function removeFirst(){
             $('#popup .first-card').slideUp(ANIMATE_DELAY, function() { 
                 $(this).remove(); 
                  moveSecond();
                addTask(nextTask());
             });
            
        };
    
        function moveSecond(){
            $('#popup .second-card').removeClass('second-card').addClass('first-card');
        };
    
        function addTask(task){            
            var div = $('#popup').append($('<div class="card second-card"><p class="light">'+task+'</p></div>'));                        
        };
    
        function nextTask(){
            taskCounter = (taskCounter === tasksArray.length-1? 0 : ++taskCounter);
            console.log(taskCounter);
            console.log(tasksArray[taskCounter]);
            return tasksArray[taskCounter];
        }
    
        function initHandlers(){
            $('#popup #min').click(function(){
                hideWindow();
            });

            $('#popup #expand').click(function(){
                showWindow();
            }); 
					
					 	$('#popup #refresh').click(refreshTasks); 

            $('#popup #hint').click(function(){
               console.log("hinting..") ;
            });

        }

        function restoreButtons(){
            $('#popup #min').show();
            $('#popup #expand').hide();
            $('#popup #refresh').show();
        }
        function showWindow(){
            var popup = $('#popup');
            $('#popup').animate({
                                height:'250px'
                            }, ANIMATE_DELAY/2);
            if(popup.is(':visible')){
                $('#popup .card').show(ANIMATE_DELAY, function(){
                    restoreButtons();
                });
            }else{
                popup.show(ANIMATE_DELAY,function(){
                    restoreButtons();
                });
            }
        }

        function hideWindow(){
            $('#popup .card').hide(ANIMATE_DELAY, function(){
                $('#popup #expand').show();
                $('#popup #min').hide();
                $('#popup #refresh').hide();
                $('#popup').animate({
                                height:'20px'
                            }, ANIMATE_DELAY/2);
            });
        }

        function addToTasks(task){            
           Array.prototype.push.apply(tasksArray, task); 
			     //tasksArray.push(task);            
        }
	   
        function add2Tasks(task1, task2){

            var div = $('#popup');
            if(task1){
                var card1Div = $('<div class="card first-card"><p class="light">'+task1+'</p></div>');
                div.append(card1Div);
            }
            
            if(task2){
                var card2Div = $('<div class="card second-card"><p class="light">'+task2+'</p></div>');
                div.append(card2Div)    
            }
        }
		

      function clearTasks(){
       	tasksArray = [];
        taskCounter = 0;
      }


      var TasksPopup = function TasksPopup(){};

      TasksPopup.prototype.init = init;
      TasksPopup.prototype.addToTasks = addToTasks;
			TasksPopup.prototype.refresh = refreshTasks;
			TasksPopup.prototype.clearTasks = clearTasks;
      TasksPopup.prototype.showWindow = showWindow;
      TasksPopup.prototype.hideWindow = hideWindow;


      //export popup;

      global.tasks = new TasksPopup();



    })(window);

    (function test(global){

      var tasks = global.tasks;

      var listOfTasks = ['task1','task4','task3','task2'];
        tasks.addToTasks(listOfTasks);
        tasks.init();

        global.setTimeout(function(){
        
            tasks.showWindow();	
            
          
        
        
//      	tasks.add2Tasks('This is task1. Add an activity.', 
//												'This is taks2. Create a transition from 1 to 2');

    //		global.setTimeout(function(){
    //			tasks.hideWindow();
    //
    //		},20000);//hide

      },2000)//show;






    })(window);


