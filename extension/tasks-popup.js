    // check jquery
(function(global){
    
    
    if(!global.jQuery){
        throw new Error("Jquery not defined");
    }
    var $ = global.jQuery;
    /** Constants */
    var ANIMATE_DELAY = 500, //500ms
        POPUP_MIN_HEIGHT = '20px',
        POPUP_MAX_HEIGHT = '250px';
    
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
            $('#popup .first-card').css("background", "green").fadeOut(ANIMATE_DELAY, function() {
                var height = $(this).height();  
                var firstCard = this;                
                  
                 $('#popup .second-card').animate({
                     bottom: "+="+height 
                 }, ANIMATE_DELAY, 
                      function(){
                        firstCard.remove();
                     
                        $( this ).switchClass( "second-card", "first-card", ANIMATE_DELAY);         
                    }
                 );// end animate                 
                  
             });
            var secondCard = $('<div class="card opaque-0"><p class="light">'+nextTask().text+'</p></div>');
            $('#popup').append(secondCard);
            secondCard.switchClass("opaque-0",  "second-card", 4*ANIMATE_DELAY); 
           
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
                                height: POPUP_MAX_HEIGHT
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
                                height: POPUP_MIN_HEIGHT
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
                var card1Div = $('<div class="card first-card"><p class="light">'+task1.text+'</p></div>');
                div.append(card1Div);
            }
            
            if(task2){
                var card2Div = $('<div class="card second-card"><p class="light">'+task2.text+'</p></div>');
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

        var task1 = {
            id: 1,
            text: 'Create an activity to do this!!',
            hint: '1.gif'       
        };
        var task2 = {
            id: 2,
            text: 'Name it as activity 1!!',
            hint: '2.gif'       
        };        
        
        var task3 = {
            id: 3,
            text: 'Name it as activity 2!!',
            hint: '2.gif'       
        };      
        
        var listOfTasks = [task1, task2, task3];
        tasks.addToTasks(listOfTasks);
        tasks.init(); // display init

        global.setTimeout(function(){

            tasks.showWindow();	

        },2000)//show;


    })(window);// top IIFE


