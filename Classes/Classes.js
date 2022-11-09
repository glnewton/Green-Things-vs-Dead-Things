// class Creature {
//     constructor(name, health, strength, accuracy) {
//       this.name = name;
//       this.health = health;
//       this.strength = strength;
//       this.accuracy = accuracy;
//       this.type = null
//       this.allegiance = null;
//       this.weakness = null;
//     }
//     attack(){
//         if (Math.random() < this.accuracy) {
//             console.log(`Successful hit with ${this.strength}`)
//             return this.strength
//         }
//         else{
//             console.log(`The attack missed!`)
//             return 0;
//         }
//     }
// }

// class Plant extends Creature{
//     constructor(name, health, strength, accuracy){
//         super(name, health, strength, accuracy)
//         this.allegiance = "Green Things"    
//     }
// }

// class Zombie extends Creature{
//     constructor(name, health, strength, accuracy){
//         super(name, health, strength, accuracy)
//         this.allegiance = "Dead Things"    
//     }
// }