var Game = function() {  
  //List of charaters to be selected on the main menu
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
  
  //Lis of difficulty levels to be selected on the main menu
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
  
  //Default character
  this.character = {
    id: "A",
    pic: "images/char-boy.png"  
  };
  
  //Default level
  this.level = {
    id: 1, 
    name: "Easy"
  };
  
  //Invalid coordinates for the up key
  //obstacles are in those coordinates
  this.invalidUpCoordinates = [{
      x: 707,
      y:238
    },
    {
      x: 909,
      y: 238
  }];
  
  //Invalid coordinates for the down key
  //obstacles are in those coordinates
  this.invalidDownCoordinates = [{
    x:707,
    y:72
  },
  {
    x:909,
    y:72
  }];
  
  //Invalid coordinates for the left key
  //obstacles are in those coordinates
  this.invalidLeftCoordinates = [{
    x:808,
    y:155
  }];
  
  //Invalid coordinates for the right key
  //obstacles are in those coordinates
  this.invalidRightCoordinates = [{
    x:606,
    y:155
  },
  {
    x:808,
    y:155
  }];
  
  //Star power coordinates
  this.starCoordinates = [{
    x:909,
    y:72
  }];
  
  //Winning coordinates
  //Coordinates to bring the star power back
  this.winningCoordinates = [{
    x:0,
    y:487
  }];
  
  this.isRunning = true;
  
  //Find character by Id, if it does not exist return undefined
  this.findCharacter = function(id) {
    for(var i=0; i< this.characters.length; i++) {
      if(this.characters[i].id.toLowerCase() === id.toLowerCase()) {
        return this.characters[i];
      }
    }
    return undefined;
  };
  
  //Find level by Id, if it does not exist return undefined
  this.findLevel = function(id) {
    for(var i=0; i< this.levels.length; i++) {
      if(this.levels[i].id.toLowerCase() === id.toLowerCase()) {
        return this.levels[i];
      }
    }
    return undefined;  
  };
  
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
  
  //Stop game
  this.stop = function() {
    ctx.clearRect(0,0, game.width, game.height);
    this.isRunning = false;
  }
  
  //Start game
  this.start = function() {
    this.isRunning = true;    
  }
  
  
  this.banner = function() {
    ctx.fillStyle = "#fff4cc";
    ctx.fillRect(0,0, 1010, 50);

    ctx.fillStyle = "#ffe070";
    ctx.fillRect(0,0, 10, 50);

    ctx.fillStyle = "#ffe070";
    ctx.fillRect(1000, 0, 10, 50);
    
    ctx.font = "25px Helvetica";
    ctx.fillStyle = "#4d4e53";
    ctx.fillText("GET THE POWER OF THE STAR AND BRING IT HOME", 20, 35);
  };
  
  this.powerBanner = function() {
    ctx.fillStyle = "#fff4cc";
    ctx.fillRect(0,0, 1010, 50);

    ctx.fillStyle = "#ffe070";
    ctx.fillRect(0,0, 10, 50);

    ctx.fillStyle = "#ffe070";
    ctx.fillRect(1000, 0, 10, 50);
    
    ctx.font = "25px Helvetica";
    ctx.fillStyle = "#4d4e53";
    ctx.fillText("I'VE GOT THE POWER, LETS GO HOME", 20, 35);
  };
  
  //Method to be overriden on the engine to launch main method
  this.launch = function() {};
  
  this.render = function() {
    //Defined this of Game
    var myGame = this;  

    myGame.ctx.font = "48px Impact";
    myGame.ctx.fillStyle = "#f5f5f5";
    myGame.ctx.strokeStyle = "#000000";
    myGame.ctx.lineWidth = 2;

    var imagesLength = myGame.characters.length * 101;
    var marginPosition = myGame.canvas.width / 2 - imagesLength / 2; 
    var startPosition = myGame.canvas.width / 2 - imagesLength / 2;

    var bgImage = new Image();
    bgImage.onload = function() {
      ctx.drawImage(bgImage,0,0);

      ctx.fillText("SELECT YOUR CHARACTER",startPosition, 70);
      ctx.strokeText("SELECT YOUR CHARACTER",startPosition, 70);

      for(var i=0; i<myGame.characters.length; i++) {
        var image = new Image();
        image.character = myGame.characters[i];
        image.onload = function() {
          ctx.drawImage(this, startPosition, 50);         
          ctx.fillText(this.character.id , startPosition + 40, 230);
          ctx.strokeText(this.character.id , startPosition + 40, 230);        
          startPosition = startPosition + 101;
        };
        image.src = image.character.pic;
      }

      ctx.fillText("SELECT LEVEL",startPosition, 312);
      ctx.strokeText("SELECT LEVEL",startPosition, 312);

      ctx.font = "30px Impact";

      ctx.fillText("1. EASY",startPosition, 370);
      ctx.strokeText("1. EASY",startPosition, 370);

      ctx.fillText("2. MEDIUM",startPosition, 420);
      ctx.strokeText("2. MEDIUM",startPosition, 420);

      ctx.fillText("3. HARDCORE",startPosition, 470);
      ctx.strokeText("3. HARDCORE",startPosition, 470);

      ctx.font = "48px Impact";

      var selectionLeft = marginPosition + 58;

      //SELECT CHARACTER
      ctx.fillText("SELECT YOUR CHARACTER", selectionLeft, 570);
      ctx.strokeText("SELECT YOUR CHARACTER", selectionLeft, 570);

      //SELECT LEVEL
      ctx.fillText("SELECT YOUR LEVEL", selectionLeft, 620);
      ctx.strokeText("SELECT YOUR LEVEL", selectionLeft, 620);

      ctx.fillText("PRESS SPACEBAR", selectionLeft, 670);            
      ctx.strokeText("PRESS SPACEBAR", selectionLeft, 670);

      //SELECTED CHARACTER    
      var selectedCharacter = new Image();
      selectedCharacter.onload = function() {
        ctx.drawImage(this, marginPosition, 520, 48, 48);
      }
      selectedCharacter.src = myGame.character.pic;

      //SELECTED LEVEL
      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#ffffff";
      ctx.strokeText(myGame.level.id , marginPosition, 620);
      ctx.fillText(myGame.level.id, marginPosition, 620);
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
    this.multiplier = this.setSpeed();
};

Enemy.prototype.setSpeed = function() {
  return Math.floor((Math.random() * 10) + 1);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If it goes off the screen bring back to the left and reset speed
    if(this.x > 1060) {
      //
      this.x = -101;
      this.multiplier = this.setSpeed();
    }
    
    this.x = this.x + 101 * dt * this.multiplier;
    
    //If an enemy position and a player occurs 
    //then reset the player position and put the star back   
    if(this.y === player.y && (this.x >= (player.x-50)) && (this.x <= (player.x+50))) 
    {
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

//Create Player class I dont see a reason why prototype would be useful 
//as there will always be a single player class
var Player = function() {
  //Default values
  this.x = 0;
  this.y = 487;
  this.sprite = 'images/char-cat-girl.png';
  this.hasStar = false;
  
  //Return player coordinates object
  this.coordinates = function() {
    var coor = {
      x: this.x, 
      y: this.y
    };
    
    return coor;
  };
  
  //Return player home
  this.goHome = function() {
    this.x = 0;
    this.y = 487;
  }
  
  //Manage player movement and prevent the player 
  //to move when agains objects 
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
  
  //check the player position for the star
  this.update = function() {    
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
  };
  
  //Render player on the screen
  this.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.hasStar) {
      ctx.drawImage(Resources.get("images/Star.png"), this.x, this.y + 70, 50, 85);
    }
  };
  
  //Check coordinates to make sure is valid
  this.isValid = function(coordinates) {                
      for(var i=0; i<coordinates.length; i++) {
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
var game = new Game();
var player = new Player();
var allEnemies = [];

//I've created the enemies in the engine class
//to be able to modify the number of enemies based
//on the difficulty

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  // Pass down key
  game.handleInput(e.key);

  // Just to avoid the error
  player.handleInput(allowedKeys[e.keyCode]);
});