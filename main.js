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
        if(row < 0 || col < 0 || row >= this.data.length || col >= this.data[row].length){
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
        } // if user wants to up and there is available space
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

    // generate random field based on user input for height, width, percentage
    // percentage arg determines what percent of the field should be covered in holes
    static generateRandomField(height, width, percentage){
        const field = [];
        const numOfHoles = Math.round(height * width * (percentage / 100));
        let holesPlaced = 0;
        let characterPlaced = 0;
        let hatPlaced = 0;
        console.log(numOfHoles);
        // create the field with just fieldCharacter
        for(let i = 0; i < height; i++){
            field.push(new Array(width).fill(fieldCharacter));
        }

        // place the holes randomly in the field
        while(holesPlaced < numOfHoles){
            // generate random row and column
            const row = Math.floor(Math.random() * height);
            const col = Math.floor(Math.random() * width);

            // check space is not already a hole
            if(field[row][col] != hole){
                field[row][col] = hole; // place hole
                holesPlaced++;
            }
        }

        // place the character randomly
        while(characterPlaced < 1){
            // generate random row and column
            const row = Math.floor(Math.random() * height);
            const col = Math.floor(Math.random() * width);

            // check space is not already a hole
            if(field[row][col] != hole){
                field[row][col] = pathCharacter; // place character
                characterPlaced++;
            }
        }

        // place the hat randomly
        while(hatPlaced < 1){
            // generate random row and column
            const row = Math.floor(Math.random() * height);
            const col = Math.floor(Math.random() * width);

            // check space is not already a hole and character
            if(field[row][col] != hole && field[row][col] != pathCharacter){
                field[row][col] = hat; // place hat
                hatPlaced++;
            }
        }

        // logic to make sure that pathCharacter can make it to hat (at least one path)
        return field;
    }
}

// create an instance of the Field class
let myField = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter]
])

// start game
//myField.start();
console.log(Field.generateRandomField(5, 5, 50));