export class Creature {

    name: string;
    health: number;
    strength: number;
    accuracy: number;
    type: string;
    allegiance: string;
    weakness: any;
    
    constructor(name, health, strength, accuracy) {
      this.name = name;
      this.health = health;
      this.strength = strength;
      this.accuracy = accuracy;
      this.type = "null"
      this.allegiance = "null";
      this.weakness = null;
    }
    attack(){
        if (Math.random() < this.accuracy) {
            return this.strength
        }
        else{
            return 0;
        }
    }
    
}