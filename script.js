const enemyHull = document.querySelector("#enemyHull");
const enemyFirePower =  document.querySelector("#enemyFirePower");
const enemyAccuracy =  document.querySelector("#enemyAccuracy");

const playerHull = document.querySelector("#playerHull");
const playerirePower =  document.querySelector("#playerFirePower");
const playerAccuracy =  document.querySelector("#playerAccuracy");


let currentEnemy = 0;
let gameOver = false;

const gameStates = {
    start:'start',
    attack: 'attack',
    takeDamage: 'takeDamage',
    retreat: 'retreat',
    end: 'end'
};

let gameState = gameStates.start;


function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive 
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
  

class ship  {
    constructor(hull, firePW, acc){
        this.hull = hull;
        this.firePW = firePW;
        this.acc = acc
    };
    getHull (){
        return this.hull;
    };
    getFirePower () {
        return this.firePW;
    };
    getAccuracy (){
        return this.acc;
    };
    takeDamage(value){
        console.log(this.hull);
        console.log("This the damage points " + value);
        this.hull-=value;
        console.log(this.hull);
    }

}

const player = new ship(20, 5, .7);
playerHull.textContent = "Hull :" +  player.getHull();
playerirePower.textContent = "Fire Power : " + player.getFirePower();
playerAccuracy.textContent = "Accuracy : " + player.getAccuracy();

const alienFleet = [];
const numberOfEnimeis = 6;

for(let i = 0; i < numberOfEnimeis; i++){
    let hull = getRandomNumber(3,6);
    let firePW = getRandomNumber(2,4);
    let acc = getRandomNumber(6,8)/10;
    alienFleet.push(new ship(hull, firePW, acc));
}


function updateEnemyStatus(){
    enemyHull.textContent = "Hull :" + alienFleet[currentEnemy].getHull();
    enemyFirePower.textContent = "Fire Power : " + alienFleet[currentEnemy].getFirePower();
    enemyAccuracy.textContent = "Accuracy : " + alienFleet[currentEnemy].getAccuracy();
}
updateEnemyStatus();

do{
    let AlienAttackSuccesfull = true;
    let playerSelection = null;
    let popupBoxType = 'confirm';

    

    switch(gameState){
        case gameStates.start:
            
            console.log(alienFleet[currentEnemy].getHull());
            alienFleet[currentEnemy].takeDamage(player.getFirePower());
            enemyHull.textContent = "Hull : " + alienFleet[currentEnemy].getHull();
            if(alienFleet[currentEnemy].getHull() <= 0){
                message = "You have destroyed an alien ship.";
                currentEnemy++;
            }else{
                message = "You have attacked an alien ship.";
            }
            popupBoxType = "alert";
            gameState = gameStates.takeDamage;
            break;
        case gameState.attack:
            message = "You have attacked";
        break;
        case gameStates.takeDamage:
            updateEnemyStatus();
            console.log(alienFleet[currentEnemy].getFirePower());
            if (Math.random() < alienFleet[currentEnemy].getAccuracy()) { 
                message = 'You have been hit!';
                player.takeDamage(alienFleet[currentEnemy].getFirePower());
                playerHull.textContent = "Hull : " + player.getHull();
            }else{
                message = 'Enemy has missed! You are Lucky!';
            }
            popupBoxType = 'alert';
            gameState = gameStates.attack;
            break;
        case gameStates.retreat:
            gameOver = true;
        break;
        default:
            popupBoxType = 'prompt';
            break;
    }
    if (popupBoxType === 'prompt'){
        playerSelection = prompt(message);
    } else if (popupBoxType ===  'confirm'){
        confirm(message);
    } else {
        alert(message);
    }
    

}while(gameOver === false)
