import { Creature } from "./Creature.js"

export class Plant extends Creature{
    constructor(name, health, strength, accuracy){
        super(name, health, strength, accuracy)
        this.allegiance = "Green Things";
        this.image = "images/Peashooter/Peashooter.gif";
        this.attackSound = null;
        this.audio = new Audio("audio/lawnmower.mp3")
        this.audio2 = new Audio("audio/scream.mp3")
    }
    cry(){
        this.audio.play()
    }
    cry2(){
        this.audio2.play()
    }
}