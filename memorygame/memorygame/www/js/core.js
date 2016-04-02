//Core Functions
            function getRandomNumber(minValue, maxValue){
                var max = maxValue;
                var min = minValue;
                var randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
                return randomnumber;
            }
            function endGameScore(){
                removeContainerContent();
                $('.container').html("<div class='percent50'><h1>Your Score</h1><div class='star'>"+score+"</div></div><div class='percent50'><div class='continue bigButton'>CONTINUE</div><div class='replay bigButton'>REPLAY</div></div>");
                if(hasInternetConnection() && studentNo > 0){
                    $.ajax({
                        type: 'POST',
                        data: { student_code: studentNo, game_type: gametype , game_difficulty: difficulty, game_score: score },
                        url: 'http://localhost/project/submitScore.php',
                        success: function(data){ 
                            if(data > 0){
                                console.log("submitted score to server");
                            }                       
                        }
                    });
                }
                $(".continue").click(function(){
                    gameMenu();
                    score = 0;
                });
                $(".replay").click(function(){
                    startGame();
                    score = 0;
                });
            }
            function removeContainerContent(){
                $('.container').empty();
            }
            function startPage(){
                //screenSize();
                removeContainerContent();
                $('.container').html("<h1 class='whiteStroke' id='titleText'>You've been schooled!</h1><div class='bigButton' id='start'>Play</div>");
                $('#start').click(function(){
                    if(hasInternetConnection()){                        
                        studentPage();
                    }else{
                        gameMenu();
                    }                    
                }); 
            }
            function gameMenu(){
                removeContainerContent();
                $('.container').html('<h1>Play a Game</h1><div class = "bigButton gameButtonMem" id = "memoryButton">Memory</div><div class = "bigButton gameButtonMat" id= "mathsButton">Maths</div><div class = "bigButton gameButtonSpl" id = "spellingButton">Spelling</div>');
                resetGames();

                $('#memoryButton').click(function(){
                    gametype = 'memory';
                    difficultyMenu();
                });

                $('#mathsButton').click(function(){
                    gametype = 'maths';
                    difficultyMenu();
                });

                $('#spellingButton').click(function(){
                    gametype = 'spelling';
                    difficultyMenu();
                });
            }
            function difficultyMenu(){
                removeContainerContent();
                $('.container').html('<div class="difficulty-title">Choose a Difficulty</div><div class = "bigButton gameButtonMem" id = "easyButton" style="margin-top:5px;">Easy</div><div class = "bigButton gameButtonMat" id = "mediumButton">Medium</div><div class = "bigButton gameButtonSpl" id = "hardButton">Hard</div>');

                $('#easyButton').click(function(){
                    difficulty = 'easy';
                    startGame();
                });

                $('#mediumButton').click(function(){
                    difficulty = 'medium';
                    startGame();
                });

                $('#hardButton').click(function(){
                    difficulty = 'hard';
                    startGame();
                });
            }
            function startGame(){
                //alert(gametype+" "+difficulty);
                if(gametype == "memory"){
                    newMemoryGame(difficulty);
                }else if(gametype == "maths"){
                    questionNo = 1;
                    newMathsGame(difficulty);

                }else if(gametype == "spelling"){
                    newSpellingGame(difficulty);
                }
            }
            function studentPage(){
                removeContainerContent();
                $('.container').html('<h1>Enter Your Student Number</h1><form><input type="text" name="number" id="studentNo"></input></form><div id="wrapper"><div id="save" class="bigButton">Save</div><div id="skip" class="bigButton">Skip</div></div>');
                $('#save').click(function(){
                    var student = $('#studentNo').val();
                    $.ajax({
                        type: 'POST',
                        data: 'data='+String(student),
                        url: 'http://localhost/project/studentCheck.php',
                        success: function(data){ 
                            if(data>0){
                                studentNo = data;
                                gameMenu();
                            }else{
                                studentPage();
                                alert("Invalid Number");
                            }
                        }
                    });
                });
                $('#skip').click(function(){
                    gameMenu();
                });
            }
            function resetGames(){
                game_no = 0;
                wrong = 0;
                questionNo = 1;
                score = 0;
            }
            function hasInternetConnection(){
                return true;
            }
            function screenSize(){
                var a = $( window ).width();
                var b = $( window ).height();

               alert("Width:" + a + " x Height:" +  b);
            }