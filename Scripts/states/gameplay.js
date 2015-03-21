/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/fish.ts" />
var states;
(function (states) {
    var GamePlay = (function () {
        function GamePlay() {
            this.sharks = [];
            this.game = new createjs.Container();
            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);
            //Fish object
            this.fish = new objects.Fish();
            this.game.addChild(this.fish);
            //Diver object
            this.diver = new objects.Diver();
            this.game.addChild(this.diver);
            for (var shark = 2; shark >= 0; shark--) {
                this.sharks[shark] = new objects.Shark();
                this.game.addChild(this.sharks[shark]);
            }
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);
            stage.addChild(this.game);
        }
        /* update method to update all the game objects and their positions*/
        GamePlay.prototype.update = function () {
            this.ocean.update();
            this.diver.update();
            this.fish.update();
            for (var shark = 2; shark >= 0; shark--) {
                this.sharks[shark].update();
                this.checkCollision(this.sharks[shark]); // call the method that check collision 
            }
            this.scoreboard.update(); // updates scoreboard
            if (this.scoreboard.lives < 1) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE; // change game state to game over
                stateChanged = true;
            }
            this.checkCollision(this.fish);
            stage.update(); // Refreshes our stage
        };
        // DISTANCE CHECKING METHOD
        GamePlay.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }; //Distance Method
        // CHECK COLLISION METHOD
        GamePlay.prototype.checkCollision = function (collider) {
            var planePosition = new createjs.Point(this.diver.x, this.diver.y);
            var objectPosition = new createjs.Point(collider.x, collider.y);
            var theDistance = this.distance(planePosition, objectPosition);
            if (theDistance < ((this.diver.height * 0.5) + (collider.height * 0.5))) {
                if (collider.isColliding != true) {
                    createjs.Sound.play(collider.sound);
                    if (collider.name == "shark") {
                        this.scoreboard.lives--; // reduce lives
                    }
                    if (collider.name == "fish") {
                        this.fish.reset(); // reset fish
                        this.scoreboard.score += 100; // update score
                    }
                }
                collider.isColliding = true;
            }
            else {
                collider.isColliding = false;
            }
        }; // checkCollision Method
        return GamePlay;
    })();
    states.GamePlay = GamePlay; // GamePlay Class
})(states || (states = {})); // States Module 
//# sourceMappingURL=gameplay.js.map