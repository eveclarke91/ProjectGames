//Spelling Functions
            function addSpellingGameContent(){
                removeContainerContent();
                $('.container').html('<div class="right-gameNo"><span id="game_no"></span> of <span id="max_game_no"></span></div><div class="left-score">Incorrect: <span id="score">0</span></div><div class="game-panel"><img id="game_image" src="img/spelling/elephant.png"></img></div><div class="drop-panel"></div><div class="drag-panel"></div>');
            }
            function randomizestring(string) {
                var possible = "abcdefghijklmnopqrstuvwxyz";
                for( var j=0; j < 4; j++ ){
                    string += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                var parts = string.split('');
                for (var i = parts.length; i > 0;) {
                    var random = parseInt(Math.random() * i);
                    var temp = parts[--i];
                    parts[i] = parts[random];
                    parts[random] = temp;
                }
                return parts.join('');
            };
            function newSpellingGame(dif){
                addSpellingGameContent();

                $('#score').text(score);

                if(dif == "easy" && game_no == 0){
                    words = easywords.slice();
                    max_game_no = 2;
                }else if(dif == "medium" && game_no == 0){
                    words = mediumwords.slice();
                    max_game_no = 2;
                }else if(dif == "hard" && game_no == 0){
                    words = hardwords.slice();
                    max_game_no = 2;
                }

                var randomnumber = Math.floor(Math.random() * words.length);

                var game = words[randomnumber];
                words.splice(randomnumber,1); //removes from the array so you dont get it a second time.
                var dragletters = game[0];
                var dropboxes = game[0];
                var maxcorrectlettercount = game[0].length;  
                var correctlettercount = 0;
                var actualgameno = game_no + 1;
                var actualmaxgameno = max_game_no + 1;

                dragletters = randomizestring(dragletters);

                $('.drag-panel').html("");
                $('.drop-panel').html("");
                $('#game_no').html(actualgameno);
                $('#max_game_no').html(actualmaxgameno);

                $("#game_image").attr("src",game[1]); // set the game image

                for( var j=0; j<dragletters.length; j++){ // print all draggable boxes
                    $('.drag-panel').append('<div class="drag-holder"><div class="drag-box" id="'+dragletters[j]+'">'+dragletters[j].toUpperCase()+'</div></div>');
                }

                $(".drag-box").draggable({ revert: "valid" }); // make all drag boxes draggable

                for( var k=0; k<dropboxes.length; k++){ // print all dropable boxes
                    $('<div class="drop-box" accept="'+dropboxes[k]+'">?</div>').droppable({
                        drop: function( event, ui ) {
                            if( $(ui.draggable).text() == $(this).attr("accept").toUpperCase() ){
                                $(this).addClass("correct").html($(ui.draggable).text());
                                $(ui.draggable).css("display","none");
                                correctlettercount = correctlettercount+1;
                                if(correctlettercount == maxcorrectlettercount){                                    
                                    if(game_no == max_game_no){
                                        setTimeout(function(){
                                            endGameScore();
                                        }, 1000);
                                        
                                    }else{                                        
                                        setTimeout(function(){
                                            game_no = game_no + 1;
                                            newSpellingGame(dif);
                                        }, 1000);
                                          
                                    }                                    
                                }
                            }else{
                                score = score+1;
                                $('#score').text(score); 
                            }                
                          }
                    }).appendTo( ".drop-panel" );
                }
            }