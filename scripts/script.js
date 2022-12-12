const VALEURES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'Q', 'K'];
const COULEURES = ['♠','♥','♦','♣'];

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
    draw(D){
        this.cards.push(D.pullRandomCard());
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


};



function initPlayers(){
    
    list[0] = new player;
    list[0].money = Infinity;
    list[0].type = "Dealer";

    list[1] = new player;
    list[1].type = "Human Player"
    list[1].money = parseInt(prompt("how much money to begin with"));
    return list;
}

function bet(){
    for (Player in playerList) {
        if (Player.type=="Player"){
            ;
            Player.betAmount(betAmount);

        }
    }
}

/*
function turn() {

    let PlayersList=initPlayers();
    bet();
    distribution();
    dealHand();
    playerChoice();
    close();

}

function playerChoice() {
    for (Player in PlayersList) {

    }
}

*/