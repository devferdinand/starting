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
        this.gameOver = false;
        this.currentRow;
        this.currentCol;
    }

    // print the elements in 2-D array
    prettyPrint(){
        this.data.forEach(row => console.log(row.join(" ")));
    }

    // find user location
    findStarLocation(){
        for(let row = 0; row < this.data.length; row++){
            for(let col = 0; col < this.data[row].length; col++){
                if(this.data[row][col] == pathCharacter){
                    return {row, col};
                }
            }
        }
        return null;
    }

    // is current location hat, hole, or out-of-bounds
    isHatHoleOOB(row, col){
        // check for out-of-bounds
        if(row >= this.data.length || col >= this.data[row].length || row < 0 || col < 0){
            console.log('Out of bounds instruction');
            this.gameOver = true;
            return true;
        } // check for hat
        else if(this.data[row][col] == hat){
            console.log('Congrats, you found your hat');
            this.gameOver = true;
            return true;
        } // check for hole
        else if(this.data[row][col] == hole){
            console.log('Sorry, you fell down a hole');
            this.gameOver = true;
            return true;
        }
        // if here then not hat, hole, or out-of-bounds
        return false;
    }

    // update the field
    updateField(direction){
        // if input is not valid, notify user with correct format
        if(direction != 'r' && direction != 'd' && direction != 'l' && direction != 'u'){
            console.log('That\'s not a valid input. Please use \'r\' for right, \'d\' for down, \'l\' for left, \'u\' for up');
        }
        // if user wants to go right and the space is not occupied by hat, hole, or out-of-bounds
        else if(direction == 'r' && !this.isHatHoleOOB(this.currentRow, this.currentCol + 1)){
            this.currentCol = this.currentCol+1;
            this.data[this.currentRow][this.currentCol] = pathCharacter;
            this.prettyPrint();
        } // if user wants to go down and there is available space
        else if(direction == 'd' && !this.isHatHoleOOB(this.currentRow + 1, this.currentCol)){
            this.currentRow = this.currentRow + 1;
            this.data[this.currentRow][this.currentCol] = pathCharacter;
            this.prettyPrint();
        } // if user wants to go left and there is available space
        else if(direction == 'l' && !this.isHatHoleOOB(this.currentRow, this.currentCol - 1)){
            this.currentCol = this.currentCol - 1;
            this.data[this.currentRow][this.currentCol] = pathCharacter;
            this.prettyPrint();
        }
        else if(direction == 'u' && !this.isHatHoleOOB(this.currentRow - 1, this.currentCol)){
            this.currentRow = this.currentRow - 1;
            this.data[this.currentRow][this.currentCol] = pathCharacter;
            this.prettyPrint();
        }
    }

    // start the game
    start(){
        // find user whereabouts
        const userLocation = this.findStarLocation();
        this.currentRow = userLocation.row;
        this.currentCol = userLocation.col;
        // print field
        this.prettyPrint();
        // while game is not over
        while(!this.gameOver){
            // prompt user for direction
            let userInput = prompt('Where to> ');
            this.updateField(userInput);
            //console.log('gameOver', this.gameOver);
        }
    }
}

// create an instance of the Field class
const myField = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter]
])

// start game
myField.start();