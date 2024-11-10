const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(twoDArray){
        // validate 2-D array is passed in
        if(!Array.isArray(twoDArray) || !twoDArray.every(row => Array.isArray(row))){
            throw new Error('The input passed in constructor must be 2-dimensional array');
        }
        // if here then input is valid
        this.data = twoDArray;
    }

    // print the elements in 2-D array
    prettyPrint(){
        this.data.forEach(row => console.log(row.join(" ")));
    }
}

// create an instance of the Field class
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░']
])

// print myField
myField.prettyPrint();