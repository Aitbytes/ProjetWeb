const VALEURES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'Q', 'K'];
const COULEURES = ['♠','♥','♦','♣'];
const CLASSIC = "Human vs DealerAI"

const DEALER = document.getElementById("dealer");
// j'ai vu que t'as déjà mis la classe player , const PLAYER = document.getElementById("player");
const HIT_BUTTON = document.getElementById("hit-button");
const PASS_BUTTON = document.getElementById("pass-button");
const BUTTON_CONTAINER = document.getElementById("button-container");
const NOTICE = document.getElementById("notice");
const NEX_HAND_BUTTON = document.getElementById("next-hand-button");

console.log(VALEURES);

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

};


let player = class {

    constructor() {
        this.cards = [];
        this.money = 0;
        this.bet = 0;
        this.type= "AI"
    }
    draw(D, howMany){
        for (let i=0; i< howMany; i++){
            this.cards.push(D.pullRandomCard());
        }
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
            amount = math.random()*this.money;
            this.bet= amount;
            this.money = this.money-amount;
        }
    }
    doubleDown(){
        if (this.type=="Human Player"){
            if (this.bet>this.money){
                console.log("You broke nigga");
            }
            else{
                this.money = this.money-this.bet;
                this.bet = 2*this.bet;
            }
        } else if (this.type="AI" && this.bet< this.money/2 && Math.random()< 0.5) {
            this.money = this.money-this.bet;
            this.bet = 2*this.bet;
        }
        
    }
    lay(){
        
        this.money = this.money-this.bet;
        this.cards = [];
    }
    count(){
        let total =0;
        this.cards= this.cards.sort((a,b)=> (b.worth() - a.worth()) );
        /*
        for (i in this.cards){
            if (this.cards[i].value != '1'){
                total =+ parseInt(this.cards[i].value);
            }
            else {
                if (this.type =="Human Player"){

                }
            }
        }
        */
    }


};

function initPlayers_1vsAI(){
    list=[]
    list[0] = new player;
    list[0].money = Infinity;
    list[0].type = "Dealer";

    list[1] = new player;
    list[1].type = "Human Player"
    list[1].money = parseInt(prompt("how much money to begin with"));
    return list;
}

let game = class {

    constructor(){
        this.playerList=[];
        this.deck=[];
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
    }

    playTurn(mode){
        this.initGame(mode);
        this.betting()
        this.cardDistribution()
    }
};


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
