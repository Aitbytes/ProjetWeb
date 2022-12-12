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
        return this.liste.splice(location,1);
    }

    

};


let player = class {

    constructor() {
        this.cards = [];
        this.money = 0;
        this.bet = 0;
    }
    draw(D){
        this.cards.push(D.pullRandomCard());
    }
    turnCard(N){
        this.cards[N][0].turnCard();
    }

};

/*
function turn() {
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