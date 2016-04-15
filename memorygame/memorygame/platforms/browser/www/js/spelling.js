//Spelling Functions
    function addSpellingGameContent(){
        removeContainerContent();
        //$('.container').html('<div class="right-gameNo"><span id="game_no"></span> of <span id="max_game_no"></span></div><div class="left-score"></div><div class="spellingTitle">Can you spell the word?</div><div class="game-panel"><img id="game_image" src="img/spelling/elephant.png"></img></div><div class="drop-panel"></div><div class="drag-panel"></div>');
        $('.container').html('<div class="spellingTitle">Can you spell the word?</div><div class="game-panel"><div id="game_text"></div><img id="game_image" src="img/spelling/elephant.png"></img></div><div class="drop-panel"></div><div class="drag-panel"></div><div id="myProgress"><div id="myBar"></div></div>');
    
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
        spellmistake = 0;

        /*$('#score').text(spellmistake);
        $('#correct').text(spellcorrect);
        $('#wrong').text(spellwrong);*/

        //alert("game_no: "+game_no+" max_no: "+progress_max);

        var questionPercent = 100/progress_max;
        var progress = questionPercent * (game_no+1);
        $('#myBar').css( 'width', progress+'%' );



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
        $("#game_image").attr("sound",game[2]); // set the game image

        $("#game_image").click(function(){
            var url = $(this).attr("sound");
            playAudio(url);
        });

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
                        playAudio('sound/correct.wav');   
                        $('#game_text').text('Correct!');
                            if(spellmistake == 0){
                                spellcorrect = spellcorrect + 1;
                            }else{
                                spellwrong = spellwrong + 1;
                            }                               
                            if(game_no == max_game_no){
                                setTimeout(function(){
                                    score = spellcorrect;
                                    endGameScore();
                                }, 3000);
                                
                            }else{                                        
                                setTimeout(function(){
                                    game_no = game_no + 1;
                                    newSpellingGame(dif);
                                }, 3000);
                                  
                            }                                    
                        }
                    }else{

                        spellmistake = spellmistake+1;
                        playAudio('sound/wrong.wav');
                        //$('#score').text(spellmistake); 
                    }                
                  }
            }).appendTo( ".drop-panel" );
        }
    }