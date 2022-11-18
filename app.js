//////--------- Class Imports ---------//////
import { GameState } from './Classes/GameState.js';
import { ZombieHorde } from './Classes/ZombieHorde.js';
import { Plant } from './Classes/Plant.js'

//////--------- Game Helper Functions ---------//////
import { getRndInteger } from './functions/getRndInteger.js';

//////--------- Game State & Player Variables ---------//////

let gameState = new GameState()

let mrPothead = new Plant("Mr. Pothead", 35, 8, .9)

////Called with startGame()
const generateZombieHorde = (zombieUnitType, hordeName, numberOfZombies) => {
    gameState.zombieHorde = new ZombieHorde(zombieUnitType);
    gameState.zombieHorde.releaseZombies(numberOfZombies, `${hordeName}#`);
    console.log(`${numberOfZombies} undead ${zombieUnitType} from ${hordeName} have appeared!!`)
    gameState.message += `${numberOfZombies} undead ${zombieUnitType} from ${hordeName} have appeared!!`
    updateEventMessageBoard(gameState.message);
}

//////--------- Game Battle Flow Functions ---------//////

const attackSequence = (player=gameState.currentPlayer, enemy=gameState.currentEnemy) => {
    
    if (gameState.doesPlayerWantToFightNextOpponent == true){
        gameState.doesPlayerWantToFightNextOpponent = null;
    }
    
    gameState.hasBattleRoundBegun = true
    gameState.message = `The battle has begun. The player ${player.name} has engaged the enemy ${enemy.name}.`
    console.log(gameState.message)
    
    gameState.message += "<br>"
    gameState.message += `The player ${player.name} has attacked the enemy ${enemy.name}.`
    console.log(`The player ${player.name} has attacked the enemy ${enemy.name}.`)
    
    //////////// Battle Animation
    let playerCharacterImage = document.getElementById("playerCharacterImage")
        playerCharacterImage.classList.add("attacking") 
    let enemeyCharacterImage = document.getElementById("enemyCharacterImage")
        enemeyCharacterImage.classList.add("defending")
    /////////// Successful Attack Sequence
    let tempPlayerAttack = player.attack()
    enemy.health = enemy.health - tempPlayerAttack

    if(tempPlayerAttack != 0){
        gameState.message += "<br>"
        gameState.message += `Successful hit with ${tempPlayerAttack}`
        console.log(`Successful hit with ${tempPlayerAttack}`)
    }
    else if(tempPlayerAttack == 0){
        gameState.message += "<br>"
        gameState.message += `The attack missed!`
        console.log(`The attack missed!`)
    }

    updateEventMessageBoard(gameState.message)

    if (enemy.health <0){
        enemy.health = 0;
    }

    updateCharacterBattleView(player, enemy)

    if (enemy.health <= 0){
        gameState.message += "<br>"
        gameState.message += `The battle has ended. <br> The player ${player.name} has defeated the enemy ${enemy.name}.`
        updateEventMessageBoard(gameState.message)
        console.log('%c' + gameState.message,  'color: lawngreen')
        console.log('%c' + "Will you engage the next enemy ship? Type Y for yes and N for no.", 'color: orange')
        enemy.image = "images/Zombie/ZombieDie.gif"
        enemy.cry()
        updateCharacterBattleView(player, enemy)
        gameState.isBattleRoundComplete = true
        gameState.didPlayerWinBattleRound = true
        gameState.playerWins++
        if(gameState.playerWins == gameState.zombieHorde.hordeRoster.length){
            gameState.didPlayerDefeatAllEnemies = true
            gameState.message += "<br>"
            gameState.message += `You have defeated all enemies!`
            gameState.message += "<br>"
            gameState.message += `You win!!!`
        }
    }
    //// Enemy Attack
    else{
        gameState.message += "<br>"
        gameState.message += `The enemy ${enemy.name} survived and retalitated against the player ${player.name}.`
        console.log(`The enemy ${enemy.name} survived and retalitated against the player ${player.name}.`)

        let tempEnemyAttack = enemy.attack()
        player.health = player.health - tempEnemyAttack

        if(tempEnemyAttack != 0){
            gameState.message += "<br>"
            gameState.message += `Successful hit with ${tempEnemyAttack}`
            console.log(`Successful hit with ${tempEnemyAttack}`)
        }
        else if(tempEnemyAttack == 0){
            gameState.message += "<br>"
            gameState.message += `The attack missed!`
            console.log(`The attack missed!`)
        }
        if (player.health <0){
            player.health = 0;
        }
        updateCharacterBattleView(player, enemy)
        if(player.health <= 0){
            gameState.message += "<br>"
            gameState.message += `The battle has ended. The enemy ${enemy.name} has defeated the player ${player.name}.`
            console.log(`The battle has ended. The enemy ${enemy.name} has defeated the player ${player.name}.`)
            gameState.isBattleRoundComplete = true
            gameState.didEnemyWinBattleRound = true
            gameState.playerLoses++
            player.cry()
        }
    }
    updateEventMessageBoard(gameState.message)
    updateDOM()
    console.log(gameState)
}

const retreatSequence = (player=gameState.currentPlayer, enemy=gameState.currentEnemy) => {
    let retreatConsequence = getRndInteger(1,3)
    switch(retreatConsequence) {
        case 1:
            console.log("You tried to escape...and got away without a scratch!")  
            break;
        case 2:
            player.health = Math.round(player.health/2)
            console.log("You tried to escape and the zombie ripped off an arm and a leg in the process. BUT you survived!")
            updateCharacterBattleView(player, enemy)
            break;
        case 3:
            player.health = 0
            console.log("You tried to escape and the zombie ripped off your head and ate your brains. Resistance is BRAINS!!!!!!!!!!!")
            updateCharacterBattleView(player, enemy)
            if(player.health <= 0){
                gameState.message += "<br>"
                gameState.message += `The game has ended. The enemy zombies defeated the player ${player.name}.`
                console.log(`The game has ended. The enemy zombies defeated the player ${player.name}.`)
                player.cry2()
            } 
            break;
            default:
      }
    updateDOM()
}

const fightNextEnemy = () => {
    gameState.doesPlayerWantToFightNextOpponent = true

    gameState.didEnemyWinBattleRound = null;
    gameState.didPlayerWinBattleRound = null

    gameState.zombieHordeUnitCounter++
    gameState.roundNumber++
    
    console.log("zombieHorde")
    console.log(gameState.zombieHorde)    
    console.log(gameState.zombieHordeUnitCounter)
    gameState.currentEnemy = gameState.zombieHorde.hordeRoster[gameState.zombieHordeUnitCounter]

    updateDOM()
    console.log("gameState.currentEnemy")
    console.log(gameState.currentEnemy)
    updateCharacterBattleView()
}

//////--------- DOM Button OnClick Functions ---------//////

const startButton = document.getElementById("startButton")
      startButton.onclick = function(){
        startGame()
        console.log("Start button was pushed")
        }
const attackButton = document.getElementById("attackButton")
      attackButton.onclick = function(){
        attackSequence()
        console.log("Attack button was pushed")
        }
const fightNextEnemyButton = document.getElementById("fightNextEnemyButton")
      fightNextEnemyButton.onclick = function(){
        fightNextEnemy()
        console.log("Fight Next Enemy button was pushed")
      }
const retreatButton = document.getElementById("retreatButton")
      retreatButton.onclick = function(player=gameState.currentPlayer){
        retreatSequence()
        console.log("Retreat button was pushed")  
        }
const quitGameButton = document.getElementById("quitGameButton")
      quitGameButton.onclick = function(){
        quitGame()
        console.log("Quit Game button was pushed")  
      }
const playAgainButton = document.getElementById("playAgainButton") 
      playAgainButton.onclick = function(){
        playAgain();
        gameState.doesPlayerWantToPlayAgain = true
        console.log(gameState)
        console.log("Play Again button was pushed")
      }

//////--------- DOM Update Functions ---------//////

const updateDOM = () => {
    updateGameStatusBar()
    updatePlayerUI()
}
const updateGameStatusBar = () => {
    let roundCounterDisplay = document.getElementById("roundCounterDisplay");
        roundCounterDisplay.innerHTML = `Round: ${gameState.roundNumber}`
    let playerWinsDisplay = document.getElementById("playerWinsDisplay");
        playerWinsDisplay.innerHTML = `Wins: ${gameState.playerWins}`
    let playerLosesDisplay = document.getElementById("playerLosesDisplay");
        playerLosesDisplay.innerHTML = `Loses: ${gameState.playerLoses}`
}
const updateCharacterBattleView = (player=gameState.currentPlayer, enemy=gameState.currentEnemy) => {
    updateEnemyDOM(enemy);
    updatePlayerDOM(player);
}
const updatePlayerUI = () => { 
    if(gameState.doesPlayerWantToPlayAgain == true){
        document.getElementById("startButton").style.display = "block"    
        document.getElementById("attackButton").style.display = "none" 
        document.getElementById("fightNextEnemyButton").style.display = "none"
        document.getElementById("retreatButton").style.display = "none"
        document.getElementById("playAgainButton").style.display = "none"
        document.getElementById("quitGameButton").style.display = "none"        
    }
    if(gameState.isGameStarted !== true){
        document.getElementById("attackButton").style.display = "none"
        document.getElementById("fightNextEnemyButton").style.display = "none"
        document.getElementById("retreatButton").style.display = "none"
        document.getElementById("quitGameButton").style.display = "none"
        document.getElementById("playAgainButton").style.display = "none"
    }
    if(gameState.isGameStarted == true){
        document.getElementById("startButton").style.display = "none"    
        document.getElementById("attackButton").style.display = "block"
        document.getElementById("retreatButton").style.display = "none"
        document.getElementById("quitGameButton").style.display = "none"
        document.getElementById("playAgainButton").style.display = "none"
    }
    if(gameState.isBattleRoundComplete == true && gameState.didPlayerWinBattleRound == true){
        document.getElementById("startButton").style.display = "none"  
        document.getElementById("attackButton").style.display = "none"
        document.getElementById("fightNextEnemyButton").style.display = "block"
        document.getElementById("retreatButton").style.display = "block"
        document.getElementById("quitGameButton").style.display = "block"
    }
    if(gameState.isBattleRoundComplete == true && gameState.didEnemyWinBattleRound == true){
        document.getElementById("startButton").style.display = "none"  
        document.getElementById("attackButton").style.display = "none"
        document.getElementById("fightNextEnemyButton").style.display = "none"
        document.getElementById("playAgainButton").style.display = "block"
        document.getElementById("quitGameButton").style.display = "block" 
    }
    if(gameState.didPlayerQuitGame == true){
        document.getElementById("startButton").style.display = "none"    
        document.getElementById("attackButton").style.display = "none" 
        document.getElementById("fightNextEnemyButton").style.display = "none"
        document.getElementById("retreatButton").style.display = "none"
        document.getElementById("playAgainButton").style.display = "none"
        document.getElementById("quitGameButton").style.display = "none"
        if (confirm("Quit Game?")) {
            window.open('', '_self', '');
            window.close();
        }
        else{
            document.getElementById("playAgainButton").style.display = "block"
            document.getElementById("quitGameButton").style.display = "block"
        }
    }
    if(gameState.doesPlayerWantToFightNextOpponent == true){
        document.getElementById("startButton").style.display = "none"    
        document.getElementById("attackButton").style.display = "block" 
        document.getElementById("fightNextEnemyButton").style.display = "none"
        document.getElementById("retreatButton").style.display = "none"
        document.getElementById("playAgainButton").style.display = "none"
        document.getElementById("quitGameButton").style.display = "none"
    }
    if(gameState.didPlayerDefeatAllEnemies == true){
        document.getElementById("startButton").style.display = "none"    
        document.getElementById("attackButton").style.display = "none" 
        document.getElementById("fightNextEnemyButton").style.display = "none"
        document.getElementById("retreatButton").style.display = "none"
        document.getElementById("playAgainButton").style.display = "block"
        document.getElementById("quitGameButton").style.display = "block"
    }    
}
const updateEventMessageBoard = (message) => {
    let messageOutput = document.getElementById("messageOutput");
    messageOutput.innerHTML = `${message}`;
}
const updateEnemyDOM = (enemy) =>{
    let enemyCharacterName = document.getElementById("enemyCharacterName");
    let enemyCharacterImage = document.getElementById("enemyCharacterImage")
    let enemyHealth = document.getElementById("enemyHealth");
    let enemyStrength = document.getElementById("enemyStrength");
    let enemyAccuracy = document.getElementById("enemyAccuracy");
        enemyCharacterName.innerHTML = enemy.name
        enemyHealth.innerHTML = `Health: ${enemy.health}`;
        enemyStrength.innerHTML = `Strength: ${enemy.strength}`;
        enemyAccuracy.innerHTML = `Accruracy: ${enemy.accuracy}`;
        enemyCharacterImage.src = enemy.image
}
const updatePlayerDOM = (player) =>{
    let playerCharacterName = document.getElementById("playerCharacterName");
    let playerCharacterImage = document.getElementById("playerCharacterImage")
    let playerHealth = document.getElementById("playerHealth");
    let playerStrength = document.getElementById("playerStrength");
    let playerAccuracy = document.getElementById("playerAccuracy");
        playerCharacterName.innerHTML = player.name
        playerHealth.innerHTML = `Health: ${player.health}`;
        playerStrength.innerHTML = `Strength: ${player.strength}`;
        playerAccuracy.innerHTML = `Accruracy: ${player.accuracy}`;
        playerCharacterImage.src = player.image
}

//////--------- Window Onload Function ---------//////

window.addEventListener("load", () => {
    console.log("Loaded")
    updateEventMessageBoard("Click Start to begin")
    updateDOM()
  });

//////--------- Game Initialization, Reset, & Play Again Functions ---------//////

const startGame = (zombieUnitType="zombieGrunt", numberOfZombies=3,hordeName="Unknown") => {
    gameState.isGameStarted = true
    gameState.roundNumber++

    zombieUnitType = "Zombie Footballer"
    numberOfZombies = getRndInteger(1,5)
    hordeName = "undeadAthlete"

    generateZombieHorde(zombieUnitType, hordeName, numberOfZombies)

    gameState.currentPlayer = mrPothead
    gameState.currentEnemy = gameState.zombieHorde.hordeRoster[0]
    console.log(gameState.zombieHorde)

    updateCharacterBattleView()
    updateDOM()

    gameState.message += "<br>"
    gameState.message += "Press Attack"
    
    updateEventMessageBoard(gameState.message)

}

const resetGame = () => {
    gameState.isGameStarted = null;
    gameState.hasBattleRoundBegun = null;
    gameState.isBattleRoundComplete = null;
    gameState.didEnemyWinBattleRound = null;
    gameState.didPlayerWinBattleRound = null;
    gameState.didPlayerQuitGame = null;
    gameState.didPlayerDefeatAllEnemies = null;
    gameState.doesPlayerWantToPlayAgain = null;

    gameState.playerWins = 0;
    gameState.playerLoses = 0;
    gameState.roundNumber = 0;

    gameState.currentEnemy = null

    gameState.zombieHordeUnitCounter = 0

    updateEventMessageBoard("Click Start to begin")
    updateDOM()
}

const playAgain = () => {
    resetGame();
    console.log("Game was reset.")
    startGame();
    console.log("Game has restarted.")
    gameState.doesPlayerWantToPlayAgain = null
    updateDOM();
    updateCharacterBattleView();
}

const quitGame = () => {
    if (confirm("Quit Game?")) {
        window.open('', '_self', '');
        window.close();
    }
    else{
        console.log("Player clicked the Quit Game button, but did not quit.")
    }
}





