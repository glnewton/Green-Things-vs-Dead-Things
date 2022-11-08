//////--------- Classes ---------//////

//add in speed?

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
            console.log(`Successful hit with ${this.strength}`)
            return this.strength
        }
        else{
            console.log(`The attack missed!`)
            return 0;
        }
    }
}

class Plant extends Creature{
    constructor(name, health, strength, accuracy){
        super(name, health, strength, accuracy)
        this.allegiance = "Green Things"    
    }
}

class Zombie extends Creature{
    constructor(name, health, strength, accuracy){
        super(name, health, strength, accuracy)
        this.allegiance = "Dead Things"    
    }
}

//////--------- Game Flow Functions ---------//////

const battleRound = (player, enemy) => {
    let message = `The battle has begun. The player ${player.name} has engaged the enemy ${enemy.name}.`
    //updateDOM(player, enemy, message)
    console.log(message)

    while(enemy.health >= 1 && player.health >= 1){
        console.log(`The player ${player.name} has attacked the enemy ${enemy.name}.`, 'color: green')
        enemy.health = enemy.health - player.attack()
        updateCharacterBattleView(player, enemy)
        if (enemy.health <= 0){
            message = `The battle has ended. The player ${player.name} has defeated the enemy ${enemy.name}.`
            console.log('%c' + message,  'color: lawngreen')
            console.log('%c' + "Will you engage the next enemy ship? Type Y for yes and N for no.", 'color: orange')
            updateCharacterBattleView(player, enemy)
        }
        else{
            console.log('%c' + `The enemy ${enemy.name} survived and retalitated against the player ${player.name}.`, 'color: red')
            player.health = player.health - enemy.attack()
            updateCharacterBattleView(player, enemy)
            if(player.health <= 0){
                console.log('%c' + `The battle has ended. The  enemy ${enemy.name} has defeated the player ${player.name}.`, 'color: red')
            }
        }
    }
}


//////--------- DOM Event Listen Functions ---------//////

const attackButton = document.getElementById("attackButton")
      attackButton.onclick = function(){
        battleRound(mrPothead, deadGirlfriend)
        console.log("Attack button was pushed")
    }

const startButton = document.getElementById("startButton")
    startButton.onclick = function(){
        updateCharacterBattleView(mrPothead, deadGirlfriend)
        console.log("Start button was pushed")
  }


//////--------- DOM Update Functions ---------//////

const updateGameStatusBar = () => {

}

const updateCharacterBattleView = (player, enemy) => {
    updateEnemyDOM(enemy);
    updatePlayerDOM(player);
}

const updatePlayerUI = () => {

}

const updateEventMessageBoard = (message) => {
    let messageOutput = document.getElementById("messageOutput");
    messageOutput.innerHTML = `${message}`;
}

const updateEnemyDOM = (enemy) =>{
    let enemyCharacterName = document.getElementById("enemyCharacterName");
    let enemyHealth = document.getElementById("enemyHealth");
    let enemyStrength = document.getElementById("enemyStrength");
    let enemyAccuracy = document.getElementById("enemyAccuracy");
        enemyCharacterName.innerHTML = enemy.name
        enemyHealth.innerHTML = `Health: ${enemy.health}`;
        enemyStrength.innerHTML = `Strength: ${enemy.strength}`;
        enemyAccuracy.innerHTML = `Accruracy: ${enemy.accuracy}`;
}
const updatePlayerDOM = (player) =>{
    let playerCharacterName = document.getElementById("playerCharacterName");
    let playerHealth = document.getElementById("playerHealth");
    let playerStrength = document.getElementById("playerStrength");
    let playerAccuracy = document.getElementById("playerAccuracy");
        playerCharacterName.innerHTML = player.name
        playerHealth.innerHTML = `Health: ${player.health}`;
        playerStrength.innerHTML = `Strength: ${player.strength}`;
        playerAccuracy.innerHTML = `Accruracy: ${player.accuracy}`;
}

const onPageLoad = () => {
    updateEventMessageBoard("Click Start to begin")
}

// const updateResultsDOM = (message="Click Fight to Begin") =>{
//     let results = document.getElementById("results");
//         results.innerHTML = `${message}`;
// }

// const updateAndReturnMessage = (text, style) => {
//     message = text;
//     updateResultsDOM(message)
//     console.log( '%c' +  message, style)
// }

// const updateRoundAndGameInfo = (roundNumber) => {
//     let round = document.getElementById("round");
//     round.innerHTML = `Round ${roundNumber}`
// }


//////--------- Onload Function ---------//////



//////--------- Main Function ---------//////





const mrPothead = new Plant("Mr. Pothead", 50, 10, .8)

const deadGirlfriend = new Zombie("Dead Girlfriend", 65, 8, .7)

//battleRound(mrPothead, deadGirlfriend)

onPageLoad();

