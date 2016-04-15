//Core Functions
    function getRandomNumber(minValue, maxValue){
        var max = maxValue;
        var min = minValue;
        var randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomnumber;
    }
    function endGameScore(){
        removeContainerContent();
        $('.container').html("<div class='percent50'><h1>Your Score</h1><div class='star'>"+score+"</div></div><div class='percent50'><div class='continue bigButton'>CONTINUE</div><div class='replay bigButton'>Play Again</div></div>");
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
            playAudio('sound/button.mp3');
            resetGames();
            gameMenu();
        });
        $(".replay").click(function(){
            playAudio('sound/button.mp3');
            resetGames();
            startGame();
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
            playAudio('sound/button.mp3');
            if(hasInternetConnection()){                        
                studentPage();
            }else{
                gameMenu();
            }                    
        }); 
    }
    function gameMenu(){
        removeContainerContent();
        $('.container').html('<h1>Play a Game</h1><div class = "bigButton gameButtonMem" id = "memoryButton">Memory</div><div class = "bigButton gameButtonMat" id= "mathsButton">Maths</div><div class = "bigButton gameButtonSpl" id = "spellingButton">Spelling</div><div class="gameButtonBack" id="backButton"><img class="gameButtonBack" src="img/arrows.png"></img></div>');
        resetGames();

        $('#memoryButton').click(function(){
            playAudio('sound/button.mp3');
            gametype = 'memory';
            difficultyMenu();
        });

        $('#mathsButton').click(function(){
            playAudio('sound/button.mp3');
            gametype = 'maths';
            difficultyMenu();
        });

        $('#spellingButton').click(function(){
            playAudio('sound/button.mp3');
            gametype = 'spelling';
            difficultyMenu();
        });
        $('#backButton').click(function(){
            playAudio('sound/button.mp3');
            startPage();
        });
    }
    function difficultyMenu(){
        removeContainerContent();
        $('.container').html('<div class="difficulty-title">Choose a Difficulty</div><div class = "bigButton gameButtonMem" id = "easyButton" style="margin-top:5px;">Easy</div><div class = "bigButton gameButtonMat" id = "mediumButton">Medium</div><div class = "bigButton gameButtonSpl" id = "hardButton">Hard</div><div class="gameButtonBack" id="backButton"><img class="gameButtonBack" src="img/arrows.png"></img></div>');

        $('#easyButton').click(function(){
            playAudio('sound/button.mp3');
            difficulty = 'easy';
            startGame();
        });

        $('#mediumButton').click(function(){
            playAudio('sound/button.mp3');
            difficulty = 'medium';
            startGame();
        });

        $('#hardButton').click(function(){
            playAudio('sound/button.mp3');
            difficulty = 'hard';
            startGame();
        });
        $('#backButton').click(function(){
            playAudio('sound/button.mp3');
            gameMenu();
        });
    }
    function startGame(){
        //alert(gametype+" "+difficulty);
        if(gametype == "memory"){
            associationInfo(difficulty);
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
            playAudio('sound/button.mp3');
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
                },
                error: function(data) { 
                    alert(JSON.stringify(data, null, 4));
                }

            });
        });
        $('#skip').click(function(){
            playAudio('sound/button.mp3');
            gameMenu();
        });
    }
    function resetGames(){
        game_no = 0;
        wrong = 0;
        questionNo = 1;
        score = 0;
        spellcorrect = 0;
        spellwrong = 0;
    }
    function hasInternetConnection(){
        if(navigator.network.connection.type==0){
            return false;
        }
        else if(navigator.network.connection.type=='none'){
            return false;
        }
        else{
            return true;
        }      
    }
    function screenSize(){
        var a = $( window ).width();
        var b = $( window ).height();

       alert("Width:" + a + " x Height:" +  b);
    }

    function playAudio(url) {
        
        
        if(device.platform == "Android"){
            url = "file:///android_asset/www/"+url;
        }
        // Play the audio file at url
        var my_media = new Media(url,
            // success callback
            function () {
                //console.log("playAudio():Audio Success");
                my_media.release();
            },
            // error callback
            function (err) {
                //console.log("playAudio():Audio Error: " + err);
            }
        );
        // Play audio
        my_media.play();

    }