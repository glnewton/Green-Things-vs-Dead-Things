import { Zombie } from "./Zombie.js";

export class ZombieHorde{

    
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

