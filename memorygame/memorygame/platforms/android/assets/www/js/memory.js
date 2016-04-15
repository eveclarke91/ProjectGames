//Memory Functions
    function addMemoryGameContent(){
        removeContainerContent();
        $('.container').html('<div class="memory-title-container"><div class="memory-title">Find the Pairs</div><div class = "counter">Turns: <span id="score">0</span></div></div><div class="card-container"></div>');
    }
    function newMemoryGame(dif){
        addMemoryGameContent();  

        if(dif == "easy"){
            maxCards = 12;
        }else if(dif == "medium"){
            maxCards = 20;
        }else if(dif == "hard"){
            maxCards = 20;
        }

        var noOfPairs = maxCards/2;
        var randomCards = randomCardsArray(maxCards);
        var clickcount=0;
        var correctPairs = 0;
        var pair1, pair2;
        var rowLength;
        var lastclickedpair;
        var lastclickedassociate;

        

        //print 
        for(var j = 0; j<randomCards.length; j++){

            $('.card-container').append('<div class="card card-back" pair="'+ randomCards[j][0] +'" no="'+ randomCards[j][1] +'"></div>');

        } 

        if(maxCards == 20){
            $('.card').css( "height", "20%" );
            $('.card').css( "width", "16%" );
            $('.card-match').css( "height", "20%" );
            $('.card-match').css( "width", "16%" );
        }else if(maxCards == 12){
            $('.card').css( "height", "28%" );
            $('.card').css( "width", "21%" );
            $('.card-match').css( "height", "28%" );
            $('.card-match').css( "width", "21%" );
        }


        $(".card").click(function(){                    

            var pairNo = $(this).attr("pair");
            var associateNo = $(this).attr("no");
            $(this).removeClass("card-back").addClass("card-front");

            if(dif == "hard"){
                $(this).html('<img src="'+associativeCards[pairNo][associateNo]+'"></img>');
            }else{
                $(this).html('<img src="'+animalCards[pairNo]+'"></img>');
            }

            
            //alert("Pair:"+pairNo+" No:"+associateNo + " i="+i);

            

            if(clickcount == 0){//first card
                pair1 = pairNo;
                pair2 = 5000;

                lastclickedpair = pairNo;
                lastclickedassociate = associateNo;


            }else if(clickcount == 1){//second card

                if(lastclickedpair == pairNo && lastclickedassociate == associateNo){
                    clickcount = 0;
                    //alert("same card clicked");
                }else{
                    
                    score = score+1;
                    $('#score').html(score);
                    pair2 = pairNo;
                    clickBlocker('on');
                    if(pair1 == pair2){ //correct pair
                    playAudio('sound/correct.wav');                           
                        setTimeout(function(){
                            $("div[pair='"+pair1+"']").empty();
                            $("div[pair='"+pair1+"']").removeClass("card card-front").addClass("card-match");
                            correctPairs = correctPairs+1;                            
                            resetCards();
                            if(correctPairs>=Math.floor(maxCards/2)){
                                removeContainerContent();
                                endGameScore();
                            }
                            clickBlocker('off');                                
                            clickcount=0;
                        }, 1000);
                    }else if(clickcount>=1){ //No Pair Found
                        setTimeout(function(){
                            resetCards();
                            clickBlocker('off');
                            clickcount=0;
                        }, 1000);                        
                    }

                    

                }//end of same card click

            }//end of second card click
            clickcount = clickcount+1;
            //i++;
        }); 
    }
    function randomCardsArray(noOfCards){
        var cardsArray = new Array(noOfCards);
        var j = 0;
        for (var k = 0; k < cardsArray.length; k++) {
            if(j == 2){
                j = 0;
            }
            cardsArray[k] = new Array(2);
            cardsArray[k] = [Math.floor(k/2),j];
            j++;
        }
        for(var l = cardsArray.length; l > 0;) {
            var random = parseInt(Math.random() * l);
            var temp = cardsArray[--l];
            cardsArray[l] = cardsArray[random];
            cardsArray[random] = temp;
        }
        return cardsArray;
    }
    function clickBlocker(status){
        if(status == "on"){
            $('body').prepend( '<div id="bg"></div>' );
        }else if(status == "off"){
            $('#bg').remove();
        }
    }
    function resetCards(){
        $('.card').removeClass("card-front").addClass("card-back");
        $('.card').empty();
    }
    function associationInfo(dif){
        if(dif == "hard"){
            removeContainerContent();
            $('.container').html('<div class="assocInfoTitle"><div class="memory-title">Find the Associated Pairs</div></div><div class ="assocInfoContent"><div class="assocInfoHeader">Example</div><div class="assocInfoPanel"><div class="assocInfoLeft"><img src="img/associate/car.png"></div><div class="assocInfoCenter">+</div><div class="assocInfoRight"><img src="img/associate/wheel.png"></div></div><div class="clear"></div><div class="assocInfoPanel"><p class="assocInfoText"><span style="color: #F9FF00;">Car</span> is to <span style="color: #0A1D80;">Wheel</span> as <span style="color: #E40D0D;">Paper</span> is to <span style="color: #B300EA;">Pen</span></p><p class="assocInfoText">Now You Try.</p></div><div class="smallButton" id="next">Continue</div></div>');           
            
            $('#next').click(function(){
                playAudio('sound/button.mp3');
                newMemoryGame(dif);
            });                  
        }else{
            newMemoryGame(dif);
        }
    }