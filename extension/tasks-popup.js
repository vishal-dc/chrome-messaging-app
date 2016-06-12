    // check jquery
(function(global){
    
    
    if(!global.jQuery){
        throw new Error("Jquery not defined");
    }
    var $ = global.jQuery;
    /** Constants */
    var ANIMATE_DELAY = 500, //500ms
        POPUP_MIN_HEIGHT = '20px',
        POPUP_MAX_HEIGHT = '200px';
    
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
            $.get(chrome.extension.getURL('/completion-popup.html'), 
              function(data) {

                $($.parseHTML(data)).appendTo('body');	

                $('#completionContainer').hide();

                $('#completionWindow #close').click(function(){
                    hideCompletion();
                    
                });


            });
            
            $.get(chrome.extension.getURL('/hint-popup.html'), 
              function(data) {

                $($.parseHTML(data)).appendTo('body');	

                $('#hintWindowContainer').hide();

                $('#hintWindow #close').click(function(){
                    closeHint();
                });


            });
        };
    
        function getGif(gif){
            return chrome.extension.getURL('/gifs/'+gif);
        };
    
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
            var secondCard = $('<div class="card opaque-0"><p  class="light">'+nextTask().text+'</p></div>');
            $('#popup').append(secondCard);
            secondCard.switchClass("opaque-0", "second-card", 3.5*ANIMATE_DELAY); 
           
				};
    
        function showHint(){
            var task = getCurrentTask();     
            $('#hintWindow img').attr('src', getGif((task.hint.path || 'dummy.gif')));    
            $('#hintWindowContainer').fadeIn(ANIMATE_DELAY/2);
            
        };
        
        function closeHint(){            
            $('#hintWindowContainer').fadeOut(ANIMATE_DELAY/2);
        };    
        
       
    
        function getCurrentTask(){
            return tasksArray[taskCounter];
        }
    
        function nextTask(){
            taskCounter = (taskCounter === tasksArray.length-1? 0 : ++taskCounter);
            return tasksArray[taskCounter];
        };
    
        function initHandlers(){
            $('#popup #min').click(function(){
                hideWindow();
            });

            $('#popup #expand').click(function(){
                showWindow();
            }); 
					
					 	$('#popup #refresh').click(refreshTasks); 

            $('#popup #hint').click(function(){
               showHint();
               console.log("hinting..") ;
            });
            
            $('#popup #win').click(function(){
                showCompletionPopup();                
            });
            

        };

        function restoreButtons(){
            $('#popup #min').show();
            $('#popup #expand').hide();
            $('#popup #refresh').show();
        };
    
        function showWindow(){
            var popup = $('#popup');
            $('#popup').animate({
                                height: POPUP_MAX_HEIGHT
                            }, ANIMATE_DELAY);
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
    
        function showCompletionPopup(result){
               
            var results = global.game.completionResults();
            var level = results.level;
            var image = results.image;
            
            $('#completionContainer img').attr('src', '');
            
            $('#completionContainer').fadeIn(ANIMATE_DELAY/2, function(){
                
                $('#completionWindow').show();    
                
                function animateImage(){
                    global.setTimeout(function(){
                        $('#completionContainer img')
                            .attr('src', getGif((image || 'thumbs-up.jpg')))
                            .effect("pulsate").effect('shake');                    

                    }, ANIMATE_DELAY*2);
                }
                
                var stars = $('#completionWindow .stars-container i')
                    .switchClass('fa-star', 'fa-star-o', ANIMATE_DELAY/2).delay(ANIMATE_DELAY);
                
                stars.eq(0).delay(ANIMATE_DELAY*2).switchClass('fa-star-o', 'fa-star', ANIMATE_DELAY,'swing', function(){
                    if(1 < level){
                        stars.eq(1).delay(ANIMATE_DELAY*3).switchClass('fa-star-o', 'fa-star', ANIMATE_DELAY,'swing', function(){
                            if(2 < level){
                                stars.eq(2).delay(ANIMATE_DELAY*4).switchClass('fa-star-o', 'fa-star', ANIMATE_DELAY,'swing', function(){
                                    animateImage();    
                                });
                                
                            }else{
                                animateImage();
                            }
                        });
                    }else{
                        animateImage();
                    }
                });
                
                
//                .filter(function(index){ 
//                        return index < level;
//                    }).switchClass('fa-star-o', 'fa-star', ANIMATE_DELAY*8);
                
            });
        };
    
        function hideCompletion(){     
            var task = getCurrentTask();
            
            $('#completionWindow').hide("explode", { pieces: 64 }, ANIMATE_DELAY*2);
            
            $('#completionContainer').fadeOut(ANIMATE_DELAY/2);
            
        };    
      //export popup;

      global.tasks = {
          init : init,
          addToTasks : addToTasks,
          refreshTasks : refreshTasks,          
          clearTasks : clearTasks,
          showWindow : showWindow,
          hideWindow : hideWindow,
          showCompletionPopup: showCompletionPopup
      };
    
        function getGame(){
            return global.game;
        }

    })(window);

(function game(global){
    var level = 1;
    
    function init(){
        
    };
    
    function completionResults(task){
        level = ++level === 4 ? (level =1) : level;
        var image = 'thumbs-up.jpg';
        
        switch(level){
            case 1: 
                image = 'breaking-bad.gif';
                break;
            case 2:
                image = 'winner-losersign.jpg';
                break;
            case 3:
                image = 'winner-number-1.jpg';
                break;
        }
        
        // cycle between levels
        return {
            level : level,
            image : image
        };
    };
    global.game = {
        init : init,
        completionResults : completionResults       
        
    };
    
}(window));

    (function test(global){

      var tasks = global.tasks;

        var task1 = {
            id: 1,
            text: 'Create an activity to do this!!',
            hint: {
                path: '1.gif',
                used: false
            }
        };
        var task2 = {
            id: 2,
            text: 'Name it as activity 1!!',
            steps: [
                {
                    
                }
            ],
            hint: {
                path: '2.gif',
                used: false
            }
        };        
        
        var task3 = {
            id: 3,
            text: 'Name it as activity 2!!',
            hint: {
                path: '1.gif',
                used: false
            }
        };      
        
        var listOfTasks = [task1, task2, task3];
        tasks.addToTasks(listOfTasks);
        tasks.init(); // display init

        global.setTimeout(function(){

            tasks.showWindow();	

        },2000)//show;


    })(window);// top IIFE


