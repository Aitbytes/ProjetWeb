const VALEURES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'Q', 'K'];
const COULEURES = ['♠','♥','♦','♣'];

console.log(VALEURES);

let deck = class {

    constructor() {
        let D =[];
        for (const val in VALEURES) {
            for (const coul in COULEURES) {
                D.push({valeure:VALEURES[val], couleur:COULEURES[coul]});
            }
        }
        this.liste = D;
    }

    shuffle(n){
        for (let i=0; i<n; i++ ){
            let l1 = Math.floor(Math.random()*this.liste.lenght);
            let l2 = Math.floor(Math.random()*this.liste.lenght);
            let temp = this.liste[l1];
            this.liste[l1]=deck[l2];
            this.liste[l2]=temp;
        }
    }

};


