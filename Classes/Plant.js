import { Creature } from "./Creature.s"

export class Plant extends Creature{
    constructor(name, health, strength, accuracy){
        super(name, health, strength, accuracy)
        this.allegiance = "Green Things";
        this.image = "images/Peashooter/Peashooter.gif";
        this.attackSound = null;
        this.audio = new Audio("audio/lawnmower.mp3")
    }
    cry(){
        this.audio.play()
    }
}