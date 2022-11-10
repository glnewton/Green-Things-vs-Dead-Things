//////--------- Classes ---------//////

class Creature {
    constructor(name, health, strength, accuracy) {
      this.name = name;
      this.health = health;
      this.strength = strength;
      this.accuracy = accuracy;
      this.type = null
      this.allegiance = null;
      this.weakness = null;
    }
    attack(){
        if (Math.random() < this.accuracy) {
            message += "<br>"
            message += `Successful hit with ${this.strength}`
            console.log(`Successful hit with ${this.strength}`)
            updateEventMessageBoard(message)

            return this.strength
        }
        else{
            message += "<br>"
            message += `The attack missed!`
            console.log(`The attack missed!`)
            return 0;
        }
    }
}
class Plant extends Creature{
    constructor(name, health, strength, accuracy){
        super(name, health, strength, accuracy)
        this.allegiance = "Green Things";
        this.image = "images/Peashooter/Peashooter.gif";
        this.attackSound = null;

    }
}
class Zombie extends Creature{
    constructor(name){
        super(name)
        this.health = this.generateZombieHealthValue()
        this.strength = this.generateZombieStrengthValue()
        this.accuracy = this.generateZombieAccuracyValue()
        this.allegiance = "Dead Things"
        this.image = "images/Zombie/1.gif"
        this.attackSound = null;     
    }
    generateZombieHealthValue(){
        let healthValue = getRndInteger(3,6);
        return healthValue;
    }
    generateZombieStrengthValue(){
        let strengthValue = getRndInteger(2,4);
        return strengthValue;
    }
    generateZombieAccuracyValue(){
        let accuracyValue = getRndInteger(6,8);
        accuracyValue*= 0.1
        accuracyValue = Number(accuracyValue.toFixed(1))
        return accuracyValue;
    }

}
class ZombieHorde{
    constructor(factoryType) {
        this.factoryType = factoryType;
        this.hordeRoster = [];
        
      }
    releaseZombies(numberOfZombies=1, batchName="Zombie Grunt ") {
        for(let i = 0; i <numberOfZombies; i++ ){
            let name = `${batchName}` + `${i+1}`
            const newZombie = new Zombie(name);
            this.hordeRoster.push(newZombie);
        }
    }
    printHorde() {
        for (let zombie of this.hordeRoster) {
            console.log(zombie);
        }
    }
}

//////--------- Class Imports ---------//////

//////--------- Game State Variables ---------//////

let gameState = {

    isGameStarted: null,

    hasBattleRoundBegun: null,
    isBattleRoundComplete: null,
    didEnemyWinBattleRound: null,
    didPlayerWinBattleRound: null,
    doesPlayerWantToFightNextOpponent: null,
    didPlayerDefeatAllEnemies: null,
    didPlayerRetreat: null,

    didPlayerQuitGame: null,    
    doesPlayerWantToPlayAgain: null,

    playerWins: 0,
    playerLoses: 0,
    roundNumber: 0,

    currentPlayer: null,
    currentEnemy: null,

    zombieHordeUnitCounter: 0

}

let zombieHorde;
let zombieHordeUnitCounter = 0

//////--------- Game Helper Functions ---------//////

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//////--------- Game Flow Functions ---------//////

const attackSequence = (player, enemy) => {
    gameState.hasBattleRoundBegun = true
    message = `The battle has begun. The player ${player.name} has engaged the enemy ${enemy.name}.`
    console.log(message)
    
    message += "<br>"
    message += `The player ${player.name} has attacked the enemy ${enemy.name}.`
    console.log(`The player ${player.name} has attacked the enemy ${enemy.name}.`)

    enemy.health = enemy.health - player.attack()
    updateCharacterBattleView(player, enemy)

    if (enemy.health <= 0){
        message += "<br>"
        message += `The battle has ended. <br> The player ${player.name} has defeated the enemy ${enemy.name}.`
        updateEventMessageBoard(message)
        console.log('%c' + message,  'color: lawngreen')
        console.log('%c' + "Will you engage the next enemy ship? Type Y for yes and N for no.", 'color: orange')
        enemy.image = "images/Zombie/ZombieDie.gif"
        updateCharacterBattleView(player, enemy)
        gameState.isBattleRoundComplete = true
        gameState.didPlayerWinBattleRound = true
        gameState.playerWins++
        if(gameState.playerWins == zombieHorde.hordeRoster.length){
            gameState.didPlayerDefeatAllEnemies = true
            message += "<br>"
            message += `You have defeated all enemies!`
            message += "<br>"
            message += `You win!!!`
        }
    }
    else{
        message += "<br>"
        message += `The enemy ${enemy.name} survived and retalitated against the player ${player.name}.`
        console.log(`The enemy ${enemy.name} survived and retalitated against the player ${player.name}.`)

        player.health = player.health - enemy.attack()
        updateCharacterBattleView(player, enemy)
        if(player.health <= 0){
            message += "<br>"
            message += `The battle has ended. The enemy ${enemy.name} has defeated the player ${player.name}.`
            console.log(`The battle has ended. The enemy ${enemy.name} has defeated the player ${player.name}.`)
            gameState.isBattleRoundComplete = true
            gameState.didEnemyWinBattleRound = true
            gameState.playerLoses++
        }
    }
    updateEventMessageBoard(message)
    updateDOM()
    console.log(gameState)
}

//////--------- DOM Button OnClick Functions ---------//////

const startButton = document.getElementById("startButton")
      startButton.onclick = function(){
        startGame()
        updateCharacterBattleView(gameState.currentPlayer, gameState.currentEnemy)
        updateDOM()
        updateEventMessageBoard("Press Attack")
        console.log("Start button was pushed")
  }
const attackButton = document.getElementById("attackButton")
      attackButton.onclick = function(){
        if (gameState.doesPlayerWantToFightNextOpponent == true){
            gameState.doesPlayerWantToFightNextOpponent = null;
        }
        attackSequence(gameState.currentPlayer, gameState.currentEnemy)
        console.log("Attack button was pushed")
}
const fightNextEnemyButton = document.getElementById("fightNextEnemyButton")
      fightNextEnemyButton.onclick = function(){
        gameState.doesPlayerWantToFightNextOpponent = true

        gameState.didEnemyWinBattleRound = null;
        gameState.didPlayerWinBattleRound = null

        gameState.zombieHordeUnitCounter++
        gameState.roundNumber++
        
        console.log("zombieHorde")
        console.log(zombieHorde)
        console.log(zombieHordeUnitCounter)
        gameState.currentEnemy = zombieHorde.hordeRoster[zombieHordeUnitCounter]

        updateDOM()
        console.log("gameState.currentPlayer")
        console.log(gameState.currentPlayer)
        console.log("gameState.currentEnemy")
        console.log(gameState.currentEnemy)
        updateCharacterBattleView(gameState.currentPlayer,gameState.currentEnemy)
        
        console.log("Fight Next Enemy button was pushed")
    }

const retreatButton = document.getElementById("retreatButton")
      retreatButton.onclick = function(){
        //didPlayerRetreat = true,
        let retreatConsequence = getRndInteger(1,3)
        if(retreatConsequence)
        updateDOM()
        console.log("Retreat button was pushed")  
      }
const quitGameButton = document.getElementById("quitGameButton")
      quitGameButton.onclick = function(){
        gameState.didPlayerQuitGame = true;
        updateDOM()
        console.log("Quit Game button was pushed")  
      }
const playAgainButton = document.getElementById("playAgainButton") 
      playAgainButton.onclick = function(){
        playAgain();
        gameState.doesPlayerWantToPlayAgain == true
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
            close();
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


//////--------- Onload Function ---------//////

const generateZombieHorde = (zombieUnitType, hordeName, numberOfZombies) => {
    zombieHorde = new ZombieHorde(zombieUnitType);
    zombieHorde.releaseZombies(numberOfZombies, `${hordeName}#`);
    console.log(`${numberOfZombies} alien ${zombieUnitType} from ${hordeName} have appeared!!`);
}

const onPageLoad = () => {
    updateEventMessageBoard("Click Start to begin")
    updateDOM()
}

const startGame = () => {
    gameState.isGameStarted = true
    gameState.roundNumber++

    zombieUnitType = "Zombie Footballer"
    numberOfZombies = getRndInteger(3,3)
    hordeName = "undeadAthlete"

    generateZombieHorde(zombieUnitType, hordeName, numberOfZombies)

    gameState.currentPlayer = mrPothead
    gameState.currentEnemy = zombieHorde.hordeRoster[0]
    console.log(zombieHorde)
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



    onPageLoad();
}

const playAgain = () => {
    resetGame();
    console.log("Game was reset.")
    startGame();
    console.log("Game has restarted.")
    gameState.doesPlayerWantToPlayAgain = null
    updateDOM();
    updateCharacterBattleView(gameState.currentPlayer, gameState.currentEnemy);
}

// const clearCurrentEnemy = () => {

// }

// const fightNextEnemy = () => {

// }


//////--------- Main Function ---------//////

var mrPothead = new Plant("Mr. Pothead", 50, 20, .8)


onPageLoad();

//----Click Play Again --> 
