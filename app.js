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

$("#reset_btn").on('click',function(){
    $(".memory-game").empty();
    $(".memory-game").append(" <div class='card1' id='card'><img src='img/agent.png\'><h3>Who is the spy?</h3><p>Text</p></div>");})
$("#num_btn").on('click',function (){
   let num = $("#Num_Card").val();
    if((num!="")&&(num%2===0)){
        $(".card1").remove();
        num=($(".memory-game").length-1+num)/2
       for(let i=1;i<=num;i++){
           createCard(i);
           createCard(i);
       }
       $("#Num_Player").val("");
    }
    else{
        alert("Empty Input is not valid");
    }
});
function createCard(idNr){
    console.log(idNr)
    let new_card = "<div class='memory-card' id='"+idNr+"' onclick='flipCard(this)' match='false'>" +
        "<p class='front-face'>"+idNr+"</p><img class='back-face' src='img/agent.png'/></div>";
    $(".memory-game").append(new_card);
}
let secondClick = false
let firstCard;
let secondCard;
function flipCard(elem){
    console.log("match: "+elem.getAttribute("match"))
    if(elem.getAttribute("match")=="false"){
        elem.classList.add('flip')
        if(!secondClick){ //first click
            secondClick=true;
            firstCard=elem;
        }else{
            secondClick=false; //second click
            secondCard=elem;
            //console.log(F_card.id)
            //console.log(S_card.id)
            match_checking(firstCard, secondCard);
        }
    }
}
function match_checking(f_card,s_card){
    if(f_card.id===s_card.id){
        f_card.setAttribute("match","true")
        console.log(f_card.getAttribute("match"))
        s_card.setAttribute("match","true")
        console.log(s_card.getAttribute("match"))
    }
    else{
        setTimeout(()=>{
            console.log("Kein Match");
            f_card.classList.remove('flip')
            s_card.classList.remove('flip')

            console.log(f_card.getAttribute("match"))

            console.log(s_card.getAttribute("match"))
        },1000)
    }
}
