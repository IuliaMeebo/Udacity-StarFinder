'use strict';

/**
* @description class that implements game main menu
* characters, difficulty levels, invalid coordinates,
* star coordinates and winning coordinates
* @constructor
**/
var Game = function() {
  /**
  * @description list of available characters
  * @return array of character objects
  **/
  this.characters = [{
      id: 'A',
      pic: "images/char-boy.png"  
    },
    {
      id: 'B',
      pic: "images/char-cat-girl.png"
    },
    {
      id: 'C',
      pic: "images/char-horn-girl.png"
    },
    {
      id: 'D',
      pic: "images/char-pink-girl.png"
    },
    {
      id: 'E',
      pic: "images/char-princess-girl.png"
  }];
    
  /**
  * @description list of available difficulty levels
  * @return array of level objects
  **/
  this.levels = [
    {
      id: '1',
      name: "Easy"
    },
    {
      id: '2',
      name: "Medium"
    },
    {
      id: '3',
      name: "Hardcore"
  }];
  
  /**
  * @description selected character
  * @return selected character object
  **/
  this.character = {
    id: "A",
    pic: "images/char-boy.png"  
  };
    
  /**
  * @description selected difficulty level
  * @return difficulty level object
  **/
  this.level = {
    id: 1, 
    name: "Easy"
  };
    
  /**
  * @description invalid UP coordinates
  * @return array of coordinates object
  **/
  this.invalidUpCoordinates = [{
      x: 707,
      y:238
    },
    {
      x: 909,
      y: 238
  }];
    
  /**
  * @description invalid DOWN coordinates
  * @return array of coordinates object
  **/
  this.invalidDownCoordinates = [{
    x:707,
    y:72
  },
  {
    x:909,
    y:72
  }];
  
  /**
  * @description invalid LEFT coordinates
  * @return array of coordinates object
  **/
  this.invalidLeftCoordinates = [{
    x:808,
    y:155
  }];
  
  /**
  * @description invalid RIGHT coordinates
  * @return array of coordinates object
  **/
  this.invalidRightCoordinates = [{
    x:606,
    y:155
  },
  {
    x:808,
    y:155
  }];
  
  /**
  * @description star power coordinates
  * @return array of coordinates object
  **/
  this.starCoordinates = [{
    x:909,
    y:72
  }];
  
  /**
  * @description winning coordinates
  * @return array of coordinates object
  **/
  this.winningCoordinates = [{
    x:0,
    y:487
  }];
  
  this.isRunning = false;
  
  /**
  * @description find single character object by Id
  * @param {string} id - Character Id
  * @return character object
  **/
  this.findCharacter = function(id) {
    for(var i=0, l=this.characters.length; i<l; i++) {
      if(this.characters[i].id.toLowerCase() === id.toLowerCase()) { 
        return this.characters[i]; 
      }
    }
    return undefined;
  };
  
  /**
  * @description find single difficulty level by Id
  * @param {string} id - level Id
  * @return level object
  **/
  this.findLevel = function(id) {
    for(var i=0, l=this.levels.length; i<l; i++) {
      if(this.levels[i].id.toLowerCase() === id.toLowerCase()) {
        return this.levels[i];
      }
    }
    return undefined;  
  };
  
  /**
  * @description handle key input on main menu  
  **/
  this.handleInput = function(key) {    
    var character = this.findCharacter(key);
    var level = this.findLevel(key);

    //If the code is a character 
    //assign character to the game
    if(character !== undefined) {
      this.character = character;
      this.render();  
    }

    //If the code is a level
    //assign level to the game
    if(level !== undefined) {
      this.level = level;
      this.render();  
    }

    //if spaced is pressed and character and level selected launch triggered
    if(key === " " && this.level !== undefined && this.character !== undefined) {        
      this.start();
      this.launch();
    }

    //If Escape is pressed go back to main menu
    if(key.toLowerCase() === "escape") {      
      this.stop();
      this.render();
    }    
  };
  
  /**
  * @description Stop the game from running, usually to display the main menu
  **/
  this.stop = function() {
    this.isRunning = false;
    ctx.clearRect(0,0, game.width, game.height);    
  };
  
  /**
  * @description Start the game usually to run the game
  **/
  this.start = function() {
    this.isRunning = true;    
  };
  
  /**
  * @description Draw regular banner at the top of the canvas
  **/
  this.banner = function() {
    ctx.fillStyle = "#fff4cc";
    ctx.fillRect(0,0, 1010, 50);
    ctx.fillStyle = "#ffe070";
    ctx.fillRect(0,0, 10, 50);
    ctx.fillStyle = "#ffe070";
    ctx.fillRect(1000, 0, 10, 50);    
    ctx.font = "bold 25px Helvetica";
    ctx.fillStyle = "#4d4e53";
    ctx.fillText("GET THE POWER OF THE STAR AND BRING IT HOME", 20, 35);
  };
  
  /**
  * @description Draw power banner to instruct the user what to do
  **/
  this.powerBanner = function() {
    ctx.fillStyle = "#fff4cc";
    ctx.fillRect(0,0, 1010, 50);
    ctx.fillStyle = "#ffe070";
    ctx.fillRect(0,0, 10, 50);
    ctx.fillStyle = "#ffe070";
    ctx.fillRect(1000, 0, 10, 50);    
    ctx.font = "bold 25px Helvetica";
    ctx.fillStyle = "#4d4e53";
    ctx.fillText("I'VE GOT THE POWER, LETS GO HOME", 20, 35);
  };
  
  /**
  * @description Draw banner with key shortcuts at the bottom of the canvas
  **/
  this.instructionsBanner = function() {    
    var heightPosition = (689 - 20);    
    ctx.fillStyle = "#fff4cc";
    ctx.fillRect(0, heightPosition, 1010, 50);
    ctx.fillStyle = "#ffe070";
    ctx.fillRect(0, heightPosition, 10, 50);
    ctx.fillStyle = "#ffe070";
    ctx.fillRect(1000, heightPosition, 10, 50);    
    ctx.font = "bold 15px Helvetica";
    ctx.fillStyle = "#4d4e53";
    ctx.fillText("ESC => MAIN MENU", 20, heightPosition + 15);
  };
    
  /**
  * @description Method overriden at engine js to encapsulate main method and init functionality
  **/
  this.launch = function() {
    // TODO: Override at engine js 
  };
  
  /**
  * @description Render main menu on the canvas
  **/
  this.render = function() {
    //Defined this of Game
    var myGame = this;      
    var imagesLength = myGame.characters.length * 101;
    var marginPosition = myGame.canvas.width / 2 - imagesLength / 2; 
    var startPosition = myGame.canvas.width / 2 - imagesLength / 2;

    var bgImage = new Image();
    bgImage.onload = function() {
      myGame.ctx.drawImage(bgImage,0,0);
      
      myGame.ctx.font = "48px Impact";
      myGame.ctx.fillStyle = "#f5f5f5";
      myGame.ctx.strokeStyle = "#000000";
      myGame.ctx.lineWidth = 2;
      
      myGame.ctx.fillText("SELECT YOUR CHARACTER",startPosition, 70);
      myGame.ctx.strokeText("SELECT YOUR CHARACTER",startPosition, 70);

      for(var i=0, l=myGame.characters.length; i<l; i++) {
        var image = new Image();
        image.character = myGame.characters[i];
        image.onload = function() {
          myGame.ctx.drawImage(this, startPosition, 50);         
          myGame.ctx.fillText(this.character.id , startPosition + 40, 230);
          myGame.ctx.strokeText(this.character.id , startPosition + 40, 230);        
          startPosition = startPosition + 101;
        };
        image.src = image.character.pic;
      }      
      
      myGame.ctx.fillText("SELECT LEVEL",startPosition, 312);
      myGame.ctx.strokeText("SELECT LEVEL",startPosition, 312);

      myGame.ctx.font = "30px Impact";      
      
      myGame.ctx.fillText("1. EASY",startPosition, 370);
      myGame.ctx.strokeText("1. EASY",startPosition, 370);

      myGame.ctx.fillText("2. MEDIUM",startPosition, 420);
      myGame.ctx.strokeText("2. MEDIUM",startPosition, 420);

      myGame.ctx.fillText("3. HARDCORE",startPosition, 470);
      myGame.ctx.strokeText("3. HARDCORE",startPosition, 470);

      myGame.ctx.font = "48px Impact";

      var selectionLeft = marginPosition + 58;

      //SELECT CHARACTER
      myGame.ctx.fillText("SELECT YOUR CHARACTER", selectionLeft, 570);
      myGame.ctx.strokeText("SELECT YOUR CHARACTER", selectionLeft, 570);

      //SELECT LEVEL
      myGame.ctx.fillText("SELECT YOUR LEVEL", selectionLeft, 620);
      myGame.ctx.strokeText("SELECT YOUR LEVEL", selectionLeft, 620);

      myGame.ctx.fillText("PRESS SPACEBAR", selectionLeft, 670);            
      myGame.ctx.strokeText("PRESS SPACEBAR", selectionLeft, 670);

      //SELECTED CHARACTER    
      var selectedCharacter = new Image();
      selectedCharacter.onload = function() {
        ctx.drawImage(this, marginPosition, 520, 28, 48);
      }
      selectedCharacter.src = myGame.character.pic;

      //SELECTED LEVEL
      myGame.ctx.fillStyle = "#000000";
      myGame.ctx.strokeStyle = "#f5f5f5";
      myGame.ctx.strokeText(myGame.level.id , marginPosition, 620);
      myGame.ctx.fillText(myGame.level.id, marginPosition, 620);
    }

    bgImage.src = "images/bg.jpg";
  };
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    var rows = [321, 238, 155, 72];
    var randomRow = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    this.x = -101;
    this.y = rows[randomRow];
    this.sprite = 'images/enemy-bug.png';

    //Random speed
    this.speed = this.setSpeed();
};

/**
* @description set a random speed of the enemy
**/
Enemy.prototype.setSpeed = function() {
  return Math.floor((Math.random() * 10) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If it goes off the screen bring back to the left and reset speed
    if(this.x > 1060) {      
      this.x = -101;
      this.speed = this.setSpeed();
    }
    
    this.x = this.x + 101 * this.speed * dt;
      
    //If an enemy position and a player occurs 
    //then reset the player position and put the star back   
    if(this.y === player.y && (this.x >= (player.x-50)) && (this.x <= (player.x+50))) {
      player.hasStar = false;
      player.x= 0;
      player.y= 487;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
* @description Create player handle its input and render on the screen
* create Player class I dont see a reason why prototype would be useful 
* as there will always be a single player class
* @constructor
**/
var Player = function() {
  //Default values
  this.x = 0;
  this.y = 487;
  this.sprite = 'images/char-cat-girl.png';
  this.hasStar = false;
  
  /**
  * @description Return coordinates of the player
  **/
  this.coordinates = function() {
    var coor = {
      x: this.x, 
      y: this.y
    };
    
    return coor;
  };
  
  /**
  * @description change position of the player to home
  **/
  this.goHome = function() {
    this.x = 0;
    this.y = 487;
  };
  
  /**
  * @description Handle input of the player and prevent movement beyond borders and invalid coordinates
  **/
  this.handleInput = function(key) {
    if(key === "up" && this.y !== 72 && this.isValid(game.invalidUpCoordinates)) {      
      this.y = this.y - 83;
    }

    if(key === "down" && this.y != 487 && this.isValid(game.invalidDownCoordinates)) {
      this.y = this.y + 83;
    }

    if(key === "left" && this.x !== 0 && this.isValid(game.invalidLeftCoordinates)) {
      this.x = this.x - 101;
    }

    if(key === "right" && this.x !== 909 && this.isValid(game.invalidRightCoordinates)) {
      this.x = this.x + 101;
    }
  };
  
  /**
  * @description Update game banners and check if the player has won
  **/
  this.update = function() {    
    if(game.isRunning) {        
      //Render banners    
      if(this.hasStar) {
        game.powerBanner();  
      }
      else
      {
        game.banner();
      }

      //If you've got the star set star true to render the player with the star
      if(!this.isValid(game.starCoordinates) && this.hasStar == false) {
        player.hasStar = true;
      }

      //If you've won go back to 
      //main menu and put star back to the top
      if(!this.isValid(game.winningCoordinates) && this.hasStar) {  
        this.hasStar = false;
        this.goHome();
        game.stop();
        game.render();
      }
    }
  };
  
  /**
  * @description Render player in its position and render star if it has it
  **/
  this.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.hasStar) {
      ctx.drawImage(Resources.get("images/Star.png"), this.x, this.y + 70, 50, 85);
    }
  };
  
  /**
  * @description check coordinates list, return false if player is on them, true if not
  * @param {array} coordinates
  * @return boolean
  **/
  this.isValid = function(coordinates) {                
      for(var i=0, l=coordinates.length; i<l; i++) {
        if( this.x === coordinates[i].x && this.y === coordinates[i].y ) {
          return false;
        }
      }    
      return true;
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//I've created the enemies in the engine class
//to be able to modify the number of enemies based
//on the difficulty
var game = new Game();
var player = new Player();
var allEnemies = [];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };
      
  game.handleInput(e.key);  
  player.handleInput(allowedKeys[e.keyCode]);
});