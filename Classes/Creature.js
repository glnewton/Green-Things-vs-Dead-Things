export class Creature {
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
            return this.strength
        }
        else{
            return 0;
        }
    }
}