async function LaunchGame(){
//  J'appelle ma main de départ qui sera dispo dans tous le game
    const result = await fetch('/startHand');
    const cards = await result.json()
// Je prépare ma requête pour piocher une carte
    async function  tirerCarte(){
        const result = await fetch('/pick');
        const nouvelleCarte = await result.json()

        const carte = document.createElement('section');
        carte.classList.add('gameHand');
        carte.classList.add('pickedCard');
        function changeClass(){
            carte.classList.remove('pickedCard');
            carte.classList.add('pickedCardEnd')
            function changeClasseEnd(){
                carte.classList.remove('pickedCardEnd')
            }
            setTimeout(changeClasseEnd,1000)
        }
        setTimeout(changeClass,1000);

        carte.innerHTML =  `
        <img src="/images/cards-img/embleme.webp" class="gameCardEmbleme" alt="">
        <div class="gameHeaderCard">
            <h4 class="gameTitleCard" id="displayCardTitle">&nbsp&nbsp ${nouvelleCarte.name}</h4><p class="displayCardCost" id="displayCardCost">Cout :${nouvelleCarte.cost}</p>
        </div>
        <img src="${nouvelleCarte.image}" alt="" class="gameHandCardImage">
        
        <p class="gameCardType" id="displayCardType">${nouvelleCarte.type}</p>
        <p class="gameCardDescription" id="displayCardDescription">${nouvelleCarte.aptitudes} <br><i>
        ${nouvelleCarte.description}</i></p>

        <div class="gamefootercard">
            <p class="gamecardrarity" id="displayCardRarity">${nouvelleCarte.rarity}</p>
            <p class="gameCardPV" id="displayCardPV">${nouvelleCarte.value_attaque}/${nouvelleCarte.value_defense}</p>
          
        </div>`
        zoomCarteHover(carte)
        jouerCarte(carte,nouvelleCarte)
        document.querySelector('.cardsPage2').appendChild(carte)
    }
// Je défini et j'insière les PV et MANA de chaque joueur. Variables globales.

let playerPv = 20;
let playerMana = 3;
const maxCards = 8 ;


const zonePV = document.getElementById('vosPV')
const addPV = document.createElement('h2')
addPV.textContent=playerPv
zonePV.appendChild(addPV)

const zonemana = document.getElementById('vosmana')
const addMANA = document.createElement('h2')
addMANA.textContent=playerMana
zonemana.appendChild(addMANA)

// Je récupère mes zones HTML pour y insérer les cartes par la Suite.
const gameHands = document.querySelectorAll('.cardsPage2');
const playdisplay = document.getElementById("playerDisplay");
// De même avec mes zones interactives 
const startGame = document.getElementById('startBTN');
const piocherCarte = document.getElementById('pickCard');
const zoneCaractPlayer = document.getElementById('caract');
zoneCaractPlayer.style.display="none"


// La partie se lance  et j'insère ma main dans le Display du joueur.
    startGame.addEventListener('click',()=>{
        zoneCaractPlayer.style.display=""
        startGame.style.display="none"
            cards.forEach(card => {
                const carte = document.createElement('section');
                carte.classList.add('gameHand');
                carte.innerHTML =  `
                <img src="/images/cards-img/embleme.webp" class="gameCardEmbleme" alt="">
                <div class="gameHeaderCard">
                    <h4 class="gameTitleCard" id="displayCardTitle">&nbsp&nbsp ${card.name}</h4><p class="displayCardCost" id="displayCardCost">Cout :${card.cost}</p>
                </div>
                <img src="${card.image}" alt="" class="gameHandCardImage">
                
                <p class="gameCardType" id="displayCardType">${card.type}</p>
                <p class="gameCardDescription" id="displayCardDescription">${card.aptitudes} <br><i>
                ${card.description}</i></p>
        
                <div class="gamefootercard">
                    <p class="gamecardrarity" id="displayCardRarity">${card.rarity}</p>
                    <p class="gameCardPV" id="displayCardPV">${card.value_attaque}/${card.value_defense}</p>
                  
                </div>`
                zoomCarteHover(carte)
                jouerCarte(carte,card)
                document.querySelector('.cardsPage2').appendChild(carte)
                
            });
          
})
    
//  Je défini des attitudes "click" et Hover pour les cartes au cour du jeu.
function zoomCarteHover (carte){
    carte.addEventListener('mouseenter', () => {
        carte.classList.add('zoomed'); 
    });
    carte.addEventListener('mouseleave', () => {
        carte.classList.remove('zoomed'); 
    });
}
function jouerCarte(carte,card){
    
    carte.addEventListener('click', () => {
        
        carte.classList.toggle('zoomed')

        if(card.cost<= playerMana){
        playdisplay.appendChild(carte)
        carte.style.display='none'
        carte.classList.remove('gameHand')
        carte.classList.add('cardPlayed')
        carte.classList.toggle('zoomed')
        playerMana -= card.cost
        addMANA.textContent=playerMana
        socket.emit('carte joué', card);
       
     
        } else{
            manqueMana()

        }
    })
}
// Ajout d'un listener pour la pioche
let pick = false;
piocherCarte.addEventListener('click',()=>{
    const nbrcard = document.querySelectorAll('.gameHand')
    if((nbrcard.length <maxCards) && pick===false){
        tirerCarte()
        pick= true
    }else{
        if(pick===true)
      { dejaPioche()}
        else {
            tropDeCarte()
        }
    }
    


      
})

// Création d'une fonction de Warning, pour prévenir le joueur du manque de Mana
function manqueMana(){
    
        const warning = document.createElement('div')
        warning.classList.add('warning')
        const warningtext= document.createElement('h2')
        warningtext.textContent = "Désolé, tu n'as pas assez de mana !"
        warning.appendChild(warningtext)
        playdisplay.appendChild(warning)
        function warningout(){
            warning.style.display='none'
            
        }
        setTimeout(warningout,1500)
}
function tropDeCarte(){
    
    const warning = document.createElement('div')
    warning.classList.add('warning')
    const warningtext= document.createElement('h2')
    warningtext.textContent = "Désolé, tu as trop de cartes en main !"
    warning.appendChild(warningtext)
    playdisplay.appendChild(warning)
    function warningout(){
        warning.style.display='none'
        
    }
    setTimeout(warningout,1500)
}
function dejaPioche(){
    
    const warning = document.createElement('div')
    warning.classList.add('warning')
    const warningtext= document.createElement('h2')
    warningtext.textContent = "Tu as déjà pioché une carte!"
    warning.appendChild(warningtext)
    playdisplay.appendChild(warning)
    function warningout(){
        warning.style.display='none'
        
    }
    setTimeout(warningout,1500)
}
}
LaunchGame()