// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.sprite == 'images/enemy-bug.png'){
        var nx = 200*dt + this.x;
        if(nx >= 910){
            this.x = 0;
        }else if(nx < 0){
            this.x = 900;
        }else{
            this.x = nx;
        }
    }else{
        var nx = this.x - 200*dt;
        if(nx >= 910){
            this.x = 0;
        }else if(nx < 0){
            this.x = 900;
        }else{
            this.x = nx;
        }
    }
    checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (){
    this.x = 400;
    this.y = 400;
    this.step = 0;
    this.speed = 20;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function checkCollisions(){
    for(var i=0 ; i<3 ; ++i){
        if( Math.abs(allEnemies[i].x-player.x) <= 20 && Math.abs(allEnemies[i].y-player.y) <= 20 ){
            player.x = 400;
            player.y = 400;
        }
        if( Math.abs(allEnemies[i].x-rock.x) <= 80 && Math.abs(allEnemies[i].y-rock.y) <= 20 ){
            if(allEnemies[i].sprite == 'images/enemy-back-bug.png'){
                allEnemies[i].sprite = 'images/enemy-bug.png';
            }else{
                allEnemies[i].sprite = 'images/enemy-back-bug.png';
            }
            allEnemies[i].render();
        }
    }
}

Player.prototype.update = function () {
    if(this.x >=900){
        this.x = 0;
    }
    if(this.x < 0){
        this.x = 805;
    }
    if(this.y >= 400){
        this.y = 400;
    }
    if(this.y < -10){
        this.y = -10;
    }
    if(this.y == -10 && this.sprite == 'images/char-boy.png'){
        alert('Ha ganado el juego!!!');
        this.sprite = 'images/char-smiling-boy.png';
        this.render();
        cont = false;
    }
    checkCollisions();
};

Player.prototype.handleInput = function ( inputKey ) {
    if(cont){
        if(inputKey == 'left'){
            this.sprite = 'images/char-left-boy.png';
            this.render();
            this.x = this.x - 100;
        }else if (inputKey == 'up'){
            this.sprite = 'images/char-back-boy.png';
            this.render();
            this.y = this.y - 82;
        }else if (inputKey == 'right'){
            this.sprite = 'images/char-right-boy.png';
            this.render();
            this.x = this.x + 100;
        }else if (inputKey == 'down'){
            this.sprite = 'images/char-boy.png';
            this.render();
            this.y = this.y + 82;
        }
    }
};

var Rock = function (){
    this.x = 404;
    this.y = 130;
    this.step = 0;
    this.speed = 20;
    this.sprite = 'images/Rock.png';
};

Rock.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 60), new Enemy(-40, 145), new Enemy(-100, 230)];
var player = new Player();
var rock = new Rock();
var cont = true;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
