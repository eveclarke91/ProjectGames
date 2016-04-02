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
                var i=0;
                var correctPairs = 0;
                var pair1, pair2;
                var rowLength;

                

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
                    

                    if(i == 0){
                        pair1 = pairNo;
                        pair2 = 5000;
                    }else if(i == 1){
                        score = score+1;
                        $('#score').html(score);
                        pair2 = pairNo;
                        clickBlocker('on');
                        if(pair1 == pair2){                            
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
                                i=0;
                            }, 1000);
                        }else if(i>=1){ //No Pair Found
                            setTimeout(function(){
                                resetCards();
                                clickBlocker('off');
                                i=0;
                            }, 1000);                        
                        }
                    }                   
                    i++;
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