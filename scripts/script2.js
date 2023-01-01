const VALEURES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'Q', 'K'];
const COULEURES = ['♠','♥','♦','♣'];



const DEALER = document.getElementById("dealer");
const PLAYER = document.getElementById("player");
const HIT_BUTTON = document.getElementById("hit-button");
const PASS_BUTTON = document.getElementById("pass-button");
const BUTTON_CONTAINER = document.getElementById("button-container");
const NOTICE = document.getElementById("notice");
const NEX_HAND_BUTTON = document.getElementById("next-hand-button");

let hitPhase=false;

let calcValue = (hand) => {
    let value = 0;
    let hasAce = 0;
    hand.forEach((card) => {
        if (card.length === 2) {
            if (card[0] === 'A') {
                hasAce += 1
            } else {
                (card[0] === 'K' || card[0] === 'Q' || card[0] === 'J') ? value += 10 : value += Number(card[0])
            }
        } else {
            value += 10
        }
    })
    if (hasAce > 0) {
        value + 11 > 21 ? value += 1 : value += 11;
        value += (hasAce-1)*1;
    }
    return value;
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
        this.documentElement.innerHTML='';
    }

    win(D){
        this.money += this.bet*2;
        this.returnCards(D);
        console.log("you won");
    }
    getMoneyBack(D){
        this.money += this.bet;
        this.returnCards(D);
        console.log("it's a draw");
    }
    lay(D){
        
        this.bet = 0;
        this.returnCards(D);
        console.log("you lost")
    }
    hit(D){
        if (hitPhase){
            this.draw(D, 1);
        }
    }


};

let game = class {

    constructor(){
        
        this.Human= new player(PLAYER)
        this.Dealer = new player(DEALER)
        this.deck= new deck;
    }
    bet(){}

    Choices(){
        hitPhase = true;
        HIT_BUTTON.addEventListener("click", ()=>(this.Human.hit(this.deck)) );
        PASS_BUTTON.addEventListener("click", ()=>this.completeTurn(this));
    }


    turn(){
        this.bet()
        this.Human.draw(this.deck,2);
        this.Dealer.draw(this.deck,1);

        if (calcValue(this.Human.cards)==21)  {this.Human.win(this.deck)};

        this.Choices();

 
    }
    completeTurn(Game) {
        hitPhase=false;
        console.log(Game.Human);
        let humanHand= calcValue(Game.Human.cards)
        
        if (humanHand>21) {Game.Human.lay(Game.deck)};
        while (calcValue(Game.Dealer.cards)<17) Game.Dealer.draw(Game.deck,1);
        
        let DealerHand= calcValue(Game.Dealer.cards)

        if (humanHand < DealerHand) {Game.Human.lay(this.deck)}
        else if (humanHand == DealerHand) {Game.Human.getMoneyBack(this.deck)}
        else {Game.Human.win(this.deck)};
    }


    endTurn(){
        this.Human.returnCards(this.deck);
        this.Dealer.returnCards(this.deck);
    }

};

function TestAction(){
    console.log("test succesful");
}



function Test() {
    TheGame=new game;
    TheGame.turn();
}


Test();

