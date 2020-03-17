const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const lbox = document.getElementById("lbox");
const rbox = document.getElementById("rbox");
const choiceA = document.getElementById("G");
const choiceB = document.getElementById("E");
const choiceC = document.getElementById("L");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
aa=document.getElementById("a")
bb=document.getElementById("b")
cc=document.getElementById("c")
dd=document.getElementById("d")
ee=document.getElementById("e")
ff=document.getElementById("f")
gg=document.getElementById("g")
hh=document.getElementById("h")


//Generation random number
var a,b,c,d,arr=[],answers=[],j=0;
function randnum(){

    a=Math.floor(Math.random() * 9)+1;
    b=Math.floor(Math.random() * 9)+1;
    c=Math.floor(Math.random() * 9)+1;
    d=Math.floor(Math.random() * 9)+1;
    return a+b+c+d;
    arr=[a,b,c,d];
    
    
}

// create some variables

const lastQuestion = 9;
let runningQuestion = 0;
let count = 0;
const questionTime = 5; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let l =randnum(); 
    
        aa.innerHTML=a;
        bb.innerHTML=b;
        cc.innerHTML=c;
        dd.innerHTML=d;
    
    let r =randnum(); 
    
    ee.innerHTML=a;
    ff.innerHTML=b;
    gg.innerHTML=c;
    hh.innerHTML=d;
    

    if(l>r)
    answers.push(">");
    else if(l==r)
        answers.push("=");
    else
        answers.push("<");    
        

    
    //question.innerHTML = "<p>"+ q.question +"</p>";
    //qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = ">";
    choiceB.innerHTML = "=";
    choiceC.innerHTML = "<";
}
start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    instructions.style.display="none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == answers[runningQuestion]){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/10);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}


