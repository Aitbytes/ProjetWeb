const VALEURES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'Q', 'K'];
const COULEURES = ['♠','♥','♦','♣'];
const CLASSIC = "Human vs DealerAI"

<<<<<<< HEAD


function argMax(array) {
    return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}
=======
const DEALER = document.getElementById("dealer");
// j'ai vu que t'as déjà mis la classe player , const PLAYER = document.getElementById("player");
const HIT_BUTTON = document.getElementById("hit-button");
const PASS_BUTTON = document.getElementById("pass-button");
const BUTTON_CONTAINER = document.getElementById("button-container");
const NOTICE = document.getElementById("notice");
const NEX_HAND_BUTTON = document.getElementById("next-hand-button");

console.log(VALEURES);
>>>>>>> b1b8caa6f04a750fb0f40a673eddcd8c08765609

let card = class {
    constructor(value, color){
        this.value = value;
        this.color = color;
        this.shown = false;
    }
    turnCard(){
        this.shown= !(this.shown);
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
    seeRandomCard() {
        let location = Math.floor(Math.random()*this.liste.length);
        let selectedCard=this.liste[location];
        return selectedCard;
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

    constructor() {
        this.cards = [];
        this.money = 0;
        this.bet = 0;
        this.type= "AI"
        this.count = 0
    }
    draw(D, howMany){
        for (let i=0; i< howMany; i++){
            this.cards.push(D.pullRandomCard());
            
            
        } 
        
    }
    returnCards(D){
        D.putCardsIn(this.cards);
        this.cards=[];
    }

    turnCard(N){
        this.cards[N].turnCard();
    }
    betAmount() {
        if (this.type=="Human Player"){
            let amount= parseInt(prompt("how much do you want to bet?"))
            if (amount>this.money){
                console.log("You broke nigga");
                this.betAmount();
            }
            else{
                this.bet = amount;
                this.money = this.money-this.bet;
            }  
        }
        else if (this.type=="AI") {
            let amount = Math.floor(Math.random()*this.money);
            this.bet= amount;
            this.money = this.money-amount;
        }
    }
    doubleDown(D){
        if (this.type=="Human Player" && confirm("Do you want to double down ?")){
            if (this.bet>this.money){
                console.log("You broke nigga");
            }
            else{
                this.money = this.money-this.bet;
                this.bet = 2*this.bet;
                this.draw(D,1);
            }
        } else if (this.type="AI" && this.bet< this.money/2 && this.count()+D.Esperance()< 21) {
            this.money = this.money-this.bet;
            this.bet = 2*this.bet;
            this.draw(D,1);

        }
        if (this.count()>21) this.lay(D);
    }
    drawAnotherCard(D){
        if (this.type=="Human Player") {
            while (confirm("Do you want to draw another card")) this.draw(D,1);
            if (this.count()>21) this.lay(D);
        }
        else if (this.type=="AI"){
            let Esperance = 0;        
            while (true){
                Esperance = D.Esperance();
                if (Esperance + this.count() <= 21) {
                    this.draw(D,1);
                }
                else break;
            }
            if (this.count()>21) this.lay(D);
        }
    }
    lay(D){
        
        this.bet = 0;
        this.returnCards(D);
    }
    count(){
        let pointsArray = []
        pointsArray = this.cards.map(x=>x.worth());
        pointsArray.sort((a,b)=> b-a );
        let sum = 0;
        let j = 0;
        let ptsi = 0
        let choice =0;
        for (let i in pointsArray){
            ptsi = pointsArray[i];

            if ( ptsi != 1) {
                sum += ptsi;
            }
            else {
                if (this.type=="Human Player"){
                    choice = confirm(`do you want to give a value of eleven (11) to your ${j+1}'th ace`) ? 11 : 1;
                    sum+=choice;
                }
                else {
                    sum += (sum + 11 > 21) ? 1: 11;
                }
            }
        }
        return sum;
    }
    blackJacks(){

        this.money+=this.bet*2;
        this.bet = 0;
        if (this.type=="Human Player"){
            alert('Congratulations, you got a Blackjack ');
            this.returnCards();
        }
        
    }
    win(D){
        this.money += this.bet*2;
        this.returnCards(D);
    }
    getMoneyBack(D){
        this.money += this.bet;
        this.returnCards(D)
    }

};

function initPlayers_1vsAI(){
    let list = [];
    list[0] = new player;
    list[0].type = "Human Player"
    list[0].money = parseInt(prompt("how much money to begin with"));
    return list;
}

let game = class {

    constructor(){
        this.playerList=[];
        this.deck=[];
        this.dealer = new player;
        this.dealer.type="Dealer";
    }

    initDeck(){
        this.deck = new deck;

    }
    initPlayers(mode){
        if (mode=="Human vs DealerAI"){
            this.playerList=initPlayers_1vsAI();
        }
    }
    initGame(mode){
        this.initDeck();
        this.initPlayers(mode);
    }
    betting(){
        this.playerList.map(x=>x.betAmount());
    }
    cardDistribution(){
        this.playerList.map(x=>{x.draw(this.deck,2)} ) ;
        this.playerList.map(x=>{ x.cards.map(x=>x.turnCard()) } ) ;
        this.dealer.draw(this.deck,1);
    }
    blackJacks(){
        for (let i in this.playerList){
            if (this.playerList[i].count()==21){
                this.playerList[i].blackJacks();
            }
        }
    }
    getPlayersChoices() {
        for ( let Player of this.playerList){
            if (Player.bet==0){
                continue;
            }
            Player.doubleDown(this.deck);
            Player.drawAnotherCard(this.deck);
            if(Player.type =="Human Player" && confirm("Do you want to lay ?")) Player.lay();
        }
    }
    getWinner(){
        let Points = Array.from(this.playerList)
    }
    dealerDraws(){
        while (this.dealer.count<17) this.dealer.draw(this.deck,1);
        let dealerCount = this.dealer.count();
        if(dealerCount>21) this.playerList.map((x,i)=>x.win(this.deck));
        
        else {
            for (let Player of this.playerList) {
                if (Player.count() < dealerCount) Player.lay(this.deck);
                else if (Player.count() == dealerCount) Player.getMoneyBack(this.deck);
                else Player.win(this.deck);
            } 
        }
        this.dealer.returnCards(this.deck);
    }

    playTurn(mode){
        this.initGame(mode);
        this.betting();
        this.cardDistribution();
        this.blackJacks()
        this.getPlayersChoices();
        this.dealerDraws();

    }
};

function Test(){
    thegame = new game;
    thegame.playTurn(CLASSIC);
}

<<<<<<< HEAD
Test();

=======
// la fonction pour calculer le montant des cartes 

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
>>>>>>> b1b8caa6f04a750fb0f40a673eddcd8c08765609


/*    distribution();
    dealHand();
    playerChoice();
    close();
*/

/*
function playerChoice() {
    for (Player in PlayersList) {

    }
}

*/
