var score = 0;
var currentQuestion = 0;
var questions = [
    {
        title: "Who was the first avenger?",
        answers: ['Captain America','Ant-Man','Iron Man','Captain Marvel'],
        correct: 0
    },
    {
        title: "What color is the Hulk?",
        answers: ['Blue','Red','Green','Orange'],
        correct: 2

    },
    {
        title: "What avenger uses a hammer?",
        answers: ['Hulk','Hawkeye','Black Widow','Thor'],
        correct: 3
    },
    {
        title: "Who is Tony Stark?",
        answers: ['Captain America','Star-Lord','Dr. Strange','Iron-Man'],
        correct: 3
    }
];
var clockRunning = false;
var timeLeft= 30;

$(document).ready(function(){

    $(".start button").click(function(a){
     a.preventDefault();
     $(".start").hide();
     $(".quiz").show();
     showQuestion();
     runTimer();
     
    });

    $(".quiz ul").on("click", "li", function(){
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".quiz button").click(function(a){

        a.preventDefault();

        if($("li.selected ").length) {

            var guess= parseInt($("li.selected").attr("id"));

            checkAnswer(guess);
        
        } else{

            alert("Answer not selected");

        }

    });

    $(".restart").click(function(a){

        a.preventDefault();
        restartQuiz();

    });


});


function showQuestion(){
    var question = questions[currentQuestion];

    $(".quiz h2").text(question.title);

    $(".quiz ul").html('');

    for(i = 0; i< question.answers.length; i++){
        $(".quiz ul").append("<li id ='"+i+"'>" + question.answers[i] + "</li>");
    }

}

function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }

function runTimer(){
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
      } 
}

function count() {

    timeLeft--;

    var converted = timeConverter(timeLeft);

    $(".timer").text(converted);

    if(timeLeft === 0){
        showScore();
    }
    
  }

function checkAnswer(guess){
    var question = questions[currentQuestion];

    if(question.correct === guess){
        score++;
    }
    currentQuestion++;

    if(currentQuestion >= questions.length){
        showScore();
    }
    else{
        showQuestion();
    }

}

function showScore(){

    $(".quiz").hide();
    $(".score").show();
    $(".score p").text("You got " + score + " out of " + questions.length + " correct.");

}

function restartQuiz() {

        $(".score").hide();
        $(".quiz").show();
        score = 0;
        currentQuestion=0;
        timeLeft = 30;
        showQuestion();
        runTimer();

}