//Maths Functions
            function addMathsGameContent(){
                removeContainerContent();
                $('.container').html("<h1>What is</h1><div class = 'maths-container'><div class = 'mathsbox box1'> 1 </div><div class = 'mathsbox box2'> + </div><div class = 'mathsbox box3'> 2 </div><div class = 'mathsbox box4'> = </div><div class = 'mathsbox box5'> ? </div><div class = 'clear'></div></div><div class='answers-container'><div class = 'answerbox answer1'></div><div class = 'answerbox answer2'></div><div class = 'answerbox answer3'></div><div class = 'answerbox answer4'></div><div class = 'clear'></div></div><div id='myProgress'><div id='myBar'></div></div><div class='right-wrong-box'><div class='rightNo'><img class='smallImg' src='img/tick.png'></img><span id='score'>0</span></div><div class='wrongNo'><img class='smallImg' src='img/cross.png'></img><span id='wrong'>0</span></div></div>");
            }
            function newMathsGame(dif){
                addMathsGameContent();
                if(questionNo>maxQuestionNo){
                    endGameScore();
                }
                difficulty = dif;
                resetAnswers();
                var questionPercent = 100/maxQuestionNo;
                var progress = questionPercent * questionNo;

                $('#myBar').css( 'width', progress+'%' );


                //$('#questionNo').html(questionNo);
                $('#maxQuestionNo').html(maxQuestionNo);
                $('#score').html(score);
                $('#wrong').html(wrong);

               // var maxValue = 12;
                var operator = 1;
                var operatorString;
                var maxAddition = 12;
                var maxSubtraction = 12;
                var maxDivision = 12;
                var maxMultiplication =12;

                if(difficulty == 'medium'){
                    //maxValue = 8;
                    maxAddition = 50;
                    maxSubtraction = 12;
                    operator = 2;
                }else if(difficulty == 'hard'){
                    //maxValue = 12;
                    maxAddition = 100;
                    maxSubtraction = 100;
                    maxDivision = 50;
                    maxMultiplication = 12;
                    operator = 4;
                }

                var element1;
                var element2 = getRandomNumber(1, operator);
                var element3;

                if(element2 == 1){

                    element1 = getRandomNumber(1, maxAddition);
                    element3 = getRandomNumber(1, maxAddition);

                    answer = element1 + element3;
                    operatorString = '+';
                }else if(element2 == 2){
                    element1 = getRandomNumber(1, maxSubtraction);
                    element3 = getRandomNumber(1, maxSubtraction);

                    if(element3 > element1){
                        var temp = element1;
                        element1 = element3;
                        element3 = temp;
                    }
                    answer = element1 - element3;
                    operatorString = '-';
                }else if(element2 == 3){
                    element1 = getRandomNumber(1, maxMultiplication);
                    element3 = getRandomNumber(1, maxMultiplication);

                    answer = element1 * element3;
                    operatorString = 'X';
                }else if(element2 == 4){
                    element1 = getRandomNumber(1, maxDivision);
                    element3 = getRandomDivisor(element1);

                    answer = element1 / element3;
                    operatorString = '%';

                }

                 $('.box1').html(element1);
                 $('.box2').html(operatorString);
                 $('.box3').html(element3);
                 $('.box4').html('=');
                 //$('.box5').html(answer);

                 var wrongAnswer1 = answer -1;
                 var wrongAnswer2 = answer -2;
                 var wrongAnswer3 = answer +3;

                 var answerArray = new Array();
                 answerArray.push(answer);
                 answerArray.push(wrongAnswer1);
                 answerArray.push(wrongAnswer2);
                 answerArray.push(wrongAnswer3);


                 for (var i = answerArray.length; i > 0;) {
                    var random = parseInt(Math.random() * i);
                    var temp = answerArray[--i];
                    answerArray[i] = answerArray[random];
                    answerArray[random] = temp;
                }

                $('.answer1').attr("answer",answerArray[0]).html(answerArray[0]);
                $('.answer2').attr("answer",answerArray[1]).html(answerArray[1]);
                $('.answer3').attr("answer",answerArray[2]).html(answerArray[2]);
                $('.answer4').attr("answer",answerArray[3]).html(answerArray[3]); 

                $('.answerbox').off('click');
                $(".answerbox").click(function(){
                    if(answer == $(this).attr("answer")){
                        correctAnswers(answer);
                        setTimeout(function(){
                            score = score + 1;
                            questionNo = questionNo +1;
                            newMathsGame(difficulty);
                        }, 2000);
                    }else{
                        correctAnswers(answer);
                        setTimeout(function(){
                            wrong = wrong + 1;
                            questionNo = questionNo +1;
                            newMathsGame(difficulty);
                        }, 2000);
                    }
                });      
            }
            function getRandomDivisor(num){
               var divisors = [];
                for (i = 1; i <= num; i++) {
                    if (num % i == 0) {
                        divisors.push(i);
                    }
                }
                
                var randomDivisor;
                if(divisors.length > 2){
                    randomDivisor = getRandomNumber(2, divisors.length-1);
                }else{
                    randomDivisor = getRandomNumber(1, divisors.length);
                }
                return divisors[randomDivisor-1];
            }
            function correctAnswers(answer){
                $('.answerbox').each(function () {
                    if($(this).attr("answer") == answer){
                        this.style.setProperty( 'background-color', '#90FD72', 'important' );
                    }else{
                        this.style.setProperty( 'background-color', '#FF5759', 'important' );
                    }
                });
            }
            function resetAnswers(){
                $('.answerbox').each(function () {
                    this.style.setProperty( 'background-color', '#eee', 'important' );
                });
            }