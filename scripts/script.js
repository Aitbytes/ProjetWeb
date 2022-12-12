const VALEURES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'Q', 'K'];
const COULEURES = ['♠','♥','♦','♣'];

console.log(VALEURES);

let deck = class {

    constructor() {
        let D =[];
        for (const val in VALEURES) {
            for (const coul in COULEURES) {
                D.push({valeure:VALEURES[val], couleur:COULEURES[coul], shown: false});
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


/*
let player = class {

    constructor() {
        this.cards = [];
        this.money = 0;
        this.
    }
};


function turn() {
    det();
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