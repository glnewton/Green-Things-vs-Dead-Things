import { Creature } from "./Creature.js"
import { getRndInteger } from "./getRndIntegerFunction.js"

export class Zombie extends Creature{
    constructor(name){
        super(name)
        this.health = this.generateZombieHealthValue()
        this.strength = this.generateZombieStrengthValue()
        this.accuracy = this.generateZombieAccuracyValue()
        this.allegiance = "Dead Things"
        this.image = "images/Zombie/1.gif"
        this.audio = new Audio("audio/groan3.mp3")
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
    cry(){
        this.audio.play()
    }
}