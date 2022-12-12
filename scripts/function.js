
const DEALER = document.getElementById("dealer") ; 
const PLAYER = document.getElementById("player") ; 
const Hit_BUTTON = document.getElementById("hit_button") ; 
const Pass_BUTTON = document.getElementById("pass_button") ; 

 
const dealHand = (deck) => {
    const dealerhand=[deck.pullRandomCard(), deck.pullRandomCard()]
    dealerhand[0].shown= (true)
    dealerhand.forEach((deck))
    console.log(dealerhand)
    
