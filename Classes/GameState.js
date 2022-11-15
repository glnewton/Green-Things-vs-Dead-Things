export class GameState {
    constructor(){
        this.isGameStarted = null;

        this.hasBattleRoundBegun = null;
        this.isBattleRoundComplete = null;
        this. didEnemyWinBattleRound = null;
        this.didPlayerWinBattleRound = null;
        this. doesPlayerWantToFightNextOpponent = null;
        this. didPlayerDefeatAllEnemies = null;
        this.didPlayerRetreat = null;
    
        this.didPlayerQuitGame = null;   
        this.doesPlayerWantToPlayAgain = null;
    
        this.playerWins = 0;
        this.playerLoses = 0;
        this.roundNumber = 0;
    
        this.currentPlayer = null;
        this.currentEnemy = null;
    
        this.zombieHordeUnitCounter = 0;
        this.zombieHorde = null;

        this.message = ""
    }
}