const DEALER = document.getElementById("dealer") ; 
const PLAYER = document.getElementById("player") ; 
const Hit_BUTTON = document.getElementById("hit_button") ; 
const Pass_BUTTON = document.getElementById("pass_button") ; 

 
const dealHand = () => {
    const hand=[pullRandomCard(), pullRandomCard()]
    hand[0].shown= (true)
    
    console.log(hand)
    
}
