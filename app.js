const navSlide=()=>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks=document.querySelectorAll('.nav-links li')
    burger.addEventListener('click',()=>{
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation='';
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
}
navSlide();
let cardsList = []; // List of all created Cards
let lockBoard = false
let secondClick = false
let startedGame = false
let firstCard;
let secondCard;
let time = 30000;
let cal_time;
let numMatching = 0;

$("#reset_btn").prop('disabled', true)
$("#reset_btn").on('click',function(){
    $(".memory-game").empty();
    $(".memory-game").append("<div class='card1' id='card'><img src='img/agent.png\'><h3>Who is the spy?</h3><p>Text</p></div>");
    $("#select_btn").prop('disabled',false);
    cardsList = [];
    numMatching = 0;
    clearInterval(cal_time);
    time = 30000;
    document.getElementById("timer").style.color ="#ec5252";
    document.getElementById("timer").innerHTML ="";
    $("#Num_Card").val("");
    $("#reset_btn").prop('disabled', true)
})
$("#select_btn").on('click',function (){
   let inputNum = $("#Num_Card").val();
    if((inputNum!="")&&(inputNum%2===0)){
        $(".card1").remove();
        inputNum = inputNum/2
       for(let i=0;i<inputNum;i++){
           let mathProblem = generateRandomMathProblem()
           createCard(i,mathProblem+" = ");
           createCard(i, Math.round(eval(mathProblem) * 100) / 100);
       }
        $("#Num_Card").val("");
        let shuffled = shuffle(cardsList)
        $(".memory-game").append(shuffled);
        $("#select_btn").prop('disabled',true);
        $("#reset_btn").prop('disabled', false);
        cal_time = setInterval(function() {
            time = time - 1000;
            let seconds = Math.floor((time % (1000 * 60)) / 1000);
            let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("timer").innerHTML ="Timer: "+minutes+"m "+seconds+ "s "
            if (time == 0) {
                clearInterval(cal_time);
                lockBoard = true;
                alert("Time Out!! the bomb exploded")
            }
            if(numMatching === cardsList.length/2){
                clearInterval(cal_time);
                document.getElementById("timer").innerHTML ="Timer: "+minutes+"m "+seconds+ "s => Success";
                document.getElementById("timer").style.color ="darkseagreen";
            }
        }, 1000);
        console.log(shuffled)
        console.log($(".memory-card").get())
    }
    else{
        alert("Empty Input is not valid");
    }
});

function createCard(idNr,content){
    console.log(idNr)
    let new_card = "<div class='memory-card' id='"+idNr+"' onclick='flipCard(this)' match='false'>" +
        "<p class='front-face' style='font-weight: bold'>"+content+"</p><img class='back-face' src='img/agent.png'/></div>";
    cardsList.push(new_card);
}

function flipCard(elem){
    console.log(elem)
    if(lockBoard){return;} //locking the board --> no access
    if(elem === firstCard){return;} //avoid double click problems
    console.log("match: "+elem.getAttribute("match"))
    if(elem.getAttribute("match") == "false"){
        elem.classList.add('flip')
        if(!secondClick){ //first click
            secondClick = true;
            firstCard = elem;
        }else{
            secondClick = false; //second click
            secondCard = elem;
            match_checking(firstCard, secondCard);
        }
    }
}
function match_checking(f_card,s_card){
    if(f_card.id === s_card.id){
        console.log("Match gefunden");
        f_card.setAttribute("match","true")
        console.log(f_card.getAttribute("match"))
        s_card.setAttribute("match","true")
        console.log(s_card.getAttribute("match"))
        f_card.style.color = "#2eff00";
        s_card.style.color = "#2eff00";
        numMatching = numMatching + 1;
    }
    else{
        lockBoard = true;
        firstCard = null;
        setTimeout(()=>{
            console.log("Kein Match");
            f_card.classList.remove('flip')
            s_card.classList.remove('flip')
            lockBoard = false;
            console.log(f_card.getAttribute("match"))
            console.log(s_card.getAttribute("match"))
        },1000)
    }
}
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function getRandomInt(min,max){
    let result = (Math.round(Math.random()*max)+min)
    if(result<0){result= "("+result+")"}
    return (result)
}
function generateRandomMathProblem(){
    let equation = "";
    let minValue = -20;
    let maxValue = 100;
    let num = getRandomInt(0,4); // number of numbers in an equation
    for(let i = 0; i < num; i++){
        equation = equation + getRandomInt(minValue,maxValue) + randomSign()
    }
    equation = equation+getRandomInt(minValue,maxValue)
    return equation;
}

function randomSign() {
    let signNum = getRandomInt(0, 3);
    let result = "";
    switch (signNum) {
        case 0:
            result = " + ";
            break;
        case 1:
            result = " - ";
            break;
        case 2:
            result = " * ";
            break;
        case 3:
            result = " / ";
            break;
        default:
            console.log("");
    }
    return result;
}
