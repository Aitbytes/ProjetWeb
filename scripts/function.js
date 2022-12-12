
const DEALER = document.getElementById("dealer") ; 
const PLAYER = document.getElementById("player") ; 
const Hit_BUTTON = document.getElementById("hit_button") ; 
const Pass_BUTTON = document.getElementById("pass_button") ; 


function testDealer(D){
    dealer = new player;
    dealer.draw(D);
    dealer.draw(D);
    dealer.turnCard(0);
    console.log(dealer.cards);
}


/*
function dealHand(Deck) {
    let dealerhand=[];
    dealerhand[0]=Deck.pullRandomCard();
    dealerhand[1]=Deck.pullRandomCard();

    dealerhand[0].turnCard();
    console.log(dealerhand);
} 
*/

