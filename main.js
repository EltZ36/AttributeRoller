//default attributes array 
const default_attribute_scores = [15,14,13,12,10,8];

//player class
class Player{
    //constructor for the class 
    constructor(character_name = 'Naruto'){
        this.name = character_name
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        //this is the shuffled array 
        let shuffled_result = shuffle_array(default_attribute_scores);
        //loop thru the key, value which should be like strength, random shuffled value
        //change the key to the popped value of the shuffled array and make the attribute key equal to that value 
        for(const [key,value] of Object.entries(this.attributes)){
            let attribute_value = shuffled_result.pop();  
            this.attributes[key] = attribute_value; 
        }

    }

    
    //other class methods 
    rollAttributes(){
        //roll this six different times 
        for (const key in this.attributes){
            //roll a 6 sided die 4 times 
            let results = dice_roller(4, 6);
            //in place sort that sorts the array with a compare function
            results.sort(function(a,b){return a - b});
            //remove the lowest die roll 
            results.shift(); 
            //sum the rolls together
            let sum = sum_array_elements(results);
            //assign the sum to the current attributes 
            this.attributes[key] = sum;
        }
    }

    printPlayer(){
        console.log(`NAME: ${this.name}`);
        //iterate thru the object elements
        //`` allows you to print text inline with variables and epxressions by using `${[expression]}`
        for (const [key,value] of Object.entries(this.attributes)){
            //slice the attributes to just the first three chars and then make them uppercase
            console.log(`${key.slice(0, 3).toUpperCase()}: ${value}`);
        }
    }
}

//Fisher-Yates algorithm for randomly sorting an array
//from: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
//adapted to JS and reconfigured to return a new (non-changed) array
//comment based on one provided in CMPM 120: Project 00: The Toolset
function shuffle_array(target_array){
    //arrays are reference values and any change to the copy will happen to the original if you use =
    //using array.from in order to avoid it
    let shuffled = Array.from(target_array);
    //reverse for loop 
    for (let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    return shuffled; 
}

function dice_roller(times, sides){
    let results = [];
    //push the results of the dice rolls onto the results array
    for (let i = 0; i < times; i++){
        results.push(Math.floor(Math.random() * sides + 1));
    }

    return results; 
}

//reduce will call a callback function that stores the result as an argument and feed it into the function again to sum the result
//the => is a faster way to declare functions and not have to use return or the function word
function sum_array_elements(array){
    return array.reduce((total, current_number) => total + current_number);
}



const player01 = new Player();
player01.printPlayer();
const player02 = new Player('Son Goku');
player02.rollAttributes();
player02.printPlayer();
