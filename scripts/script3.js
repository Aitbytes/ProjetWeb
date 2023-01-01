const VALEURES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'Q', 'K'];
const COULEURES = ['♠','♥','♦','♣'];




let calcValue = function(hand){
    let pointsArray = []
    pointsArray = hand.map(x=>x.worth());
    let sum = 0;
    let ptsi = 0;
    let numberOfAces=0;
    for (let i in pointsArray){
        ptsi = pointsArray[i];
        sum += ptsi;
        if ( ptsi == 1) {
            numberOfAces+=1;
        }
    }
    for (let i=0; i<numberOfAces && (sum+10)<=21;i++ ){ sum+=10 };
    return sum;
}



let card = class {
    constructor(value, color){
        this.value = value;
        this.color = color;
        this.display = document.createElement("div");
        this.display.classList.add("card");
        if (this.color=='♥' || this.color == '♦') this.display.setAttribute("data_red","true");
        this.display.innerHTML= `${this.value} ${this.color}`;

    }
    worth(){
        if (this.value=='A'){
            return 1
        }
        let parse=parseInt(this.value)
        return parse || 10;
    }

}

let deck = class {

    constructor() {
        let D =[];
        for (const val in VALEURES) {
            for (const coul in COULEURES) {
                let new_card = new card(VALEURES[val], COULEURES[coul]);
                D.push(new_card);
            }
        }
        this.liste = D;
    }
    pullRandomCard() {
        let location = Math.floor(Math.random()*this.liste.length);
        return this.liste.splice(location,1)[0];
    }
    putCardsIn(cards){
        this.liste= this.liste.concat(cards);
    }
    Esperance(){
        return this.liste.reduce((total, current)=> (total+current.worth()),0)/this.liste.length
    }
    

};

let player = class {

    constructor(documentElement) {
        this.documentElement = documentElement;
        this.cards = [];
        this.money = 0;
        this.bet = 0;

    }
    draw(D, howMany){
        for (let i=0; i< howMany; i++){
            let aNewCard = D.pullRandomCard()
            this.cards.push(aNewCard);
            this.documentElement.appendChild(aNewCard.display);
            
        } 
        
    }
    returnCards(D){
        D.putCardsIn(this.cards);
        this.cards=[];
    }
    ClearTable(D){
        this.documentElement.innerHTML='';
    }

    win(D){
        this.money += this.bet;
        this.bet = 0;
        this.returnCards(D);
        NOTICE_TEXT.innerHTML="you won";
    }
    getMoneyBack(D){
        this.bet = 0;
        this.returnCards(D);
        NOTICE_TEXT.innerHTML="it's a draw";
    }
    lay(D){        
        this.money-= this.bet;
        this.bet = 0;
        this.returnCards(D);
        NOTICE_TEXT.innerHTML="you lost";
    }
    hit(D){
        if (hitPhase){
            this.draw(D, 1);
        }
    }


};

function displayHiddenElement(Element){Element.style.display="flex"};
function HideElement(Element){Element.style.display="none"};




const DEALER = document.getElementById("dealer");
const PLAYER = document.getElementById("player");
const HIT_BUTTON = document.getElementById("hit-button");
const PASS_BUTTON = document.getElementById("pass-button");
const BUTTON_CONTAINER = document.getElementById("button-container");

const BETTING_PMPT = document.getElementById("betting-prompt");
const START_GAME_PMPT = document.getElementById("menu");
const TURN_END_PMPT = document.getElementById("notice");

const NEX_HAND_BUTTON = document.getElementById("next-hand-button");
const BET_BUTTON = document.getElementById("bet-amount-button");
const START_GAME_BUTTON = document.getElementById("start-game-button");
const MENU_BUTTON= document.getElementById("back-to-menu-button");

const BET_INPUT = document.getElementById("bet-input");
const MONEY_INPUT = document.getElementById("money-input");

const NOTICE_TEXT = document.getElementById("notice-text");
const MONEY = document.querySelector(".moneyDisplay")

let state="";

var sound_shuffle = new Audio("shuffle.mp3");
sound_shuffle.loop =false;



function Game(){
    let Human= new player(PLAYER)
    let Dealer = new player(DEALER)
    let theDeck= new deck;
    let DealerHand=0
    let HumanHand=0
    state="Menu";

    let GameStart= function(){

        if (state=="Menu" && MONEY_INPUT.valueAsNumber>=0) {
            state="bettingPhase";
            Human.money=MONEY_INPUT.valueAsNumber
            HideElement(START_GAME_PMPT);
            displayHiddenElement(BETTING_PMPT);
        }
        else if (MONEY_INPUT.valueAsNumber==NaN){
            alert("Please insert an ammount");
        }
        else if (state=="TurnEnd" && Human.money>0){
            state="bettingPhase";
            HideElement(TURN_END_PMPT);
            displayHiddenElement(BETTING_PMPT);
            Human.ClearTable();
            Dealer.returnCards(theDeck);
            Dealer.ClearTable();
            console.log(Human.money);
        }
        updateMoney();
    }

    displayHiddenElement(START_GAME_PMPT);

    START_GAME_BUTTON.addEventListener("click", GameStart);

    BET_BUTTON.addEventListener("click", function GameStart(){
        if (state=="bettingPhase" && BET_INPUT.valueAsNumber<=Human.money) {
            state="cardDrawing";
            Human.bet=BET_INPUT.valueAsNumber;
            HideElement(BETTING_PMPT);
            sound_shuffle.play();
            setTimeout(function(){
                Human.draw(theDeck,2);
                Dealer.draw(theDeck,1);
                if (calcValue(Human.cards)==21)  {
                    Human.win(theDeck)
                    state="TurnEnd"
                    setTimeout(()=>(displayHiddenElement(TURN_END_PMPT)),2000 );
                }
                else {
                    state="HitPhase"
                }
            }, 4000);
            
        }
        else if (MONEY_INPUT.valueAsNumber==NaN || MONEY_INPUT.valueAsNumber> Human.money){
            alert("Please insert a valid amount");
        }
    });

    HIT_BUTTON.addEventListener("click", function(){
        if (state=="HitPhase"){
            Human.draw(theDeck,1);
        }
    });
    PASS_BUTTON.addEventListener("click", function(){
        HumanHand=calcValue(Human.cards)
        console.log(`human hand : ${HumanHand}`)
        if (state=="HitPhase" && HumanHand<=21){
            state="DealerTurn";
            DealerHand= calcValue(Dealer.cards)
            console.log(`dealer's hand : ${DealerHand}`)
            while (DealerHand<17) {
                Dealer.draw(theDeck,1);
                DealerHand= calcValue(Dealer.cards)
                console.log(`dealer's hand : ${DealerHand}`)
                
            }
            setTimeout(function(){
                if (DealerHand>21 || HumanHand > DealerHand) {Human.win(theDeck)}
                else if (HumanHand < DealerHand) {Human.lay(theDeck)}
                else if (HumanHand == DealerHand) {Human.getMoneyBack(theDeck)}
                displayHiddenElement(TURN_END_PMPT);
                state="TurnEnd";
                updateMoney();
            }, 3000);
            
        }
        else if (state=="HitPhase" && HumanHand>21){
            Human.lay(theDeck);
            state="TurnEnd"
            displayHiddenElement(TURN_END_PMPT);
        }
    });

    NEX_HAND_BUTTON.addEventListener("click", GameStart);
    
    MENU_BUTTON.addEventListener("click",function(){
        state="Menu";
        HideElement(TURN_END_PMPT);
        displayHiddenElement(START_GAME_PMPT);
        Human.ClearTable();
        Dealer.returnCards(theDeck);
        Dealer.ClearTable();
        Human.money=0;
    })

    function updateMoney(){
        MONEY.innerHTML= String(Human.money);
    }


}

function TestAction(){
    console.log("test succesful");
}



function Test() {
    
}


Test();

Game();