/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="references/constants.ts" />
/// <reference path="states/gameplay.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/diver.ts" />
/// <reference path="objects/shark.ts" />
/// <reference path="objects/fish.ts" />

/*
    The game ts is built from the base version provided in the class, some functions in the game are from the base code as itself
    https://github.com/tsiliopoulos/COMP397-MailPilot - Original Base code
*/

// Global game Variables
var canvas;
var stage: createjs.Stage;
var assets: createjs.LoadQueue;
var assetLoader: createjs.LoadQueue;
var currentScore = 0;
var highScore = 0;

// Game State Variables
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;

var gamePlay: states.GamePlay;
var gameOver: states.GameOver;
var menu: states.GameMenu;
var instructions: states.GameInstruction;

/* Game images and audio files*/
var manifest = [
    { id: "logo", src: "assets/images/logo.png" },
    { id: "gameover", src: "assets/images/gameover.png" },
    { id: "shark", src: "assets/images/shark.png" },
    { id: "fish", src: "assets/images/fish.png" },
    { id: "ocean", src: "assets/images/ocean.jpg" },
    { id: "diver", src: "assets/images/diver.png" },
    { id: "playButton", src: "assets/images/playButton.png" },
    { id: "tryAgainButton", src: "assets/images/tryAgainButton.png" },
    { id: "menuButton", src: "assets/images/menuButton.png" },
    { id: "instructionsButton", src: "assets/images/instructionsButton.png" },
    { id: "underwater", src: "assets/audio/underwater_sound.mp3" },
    { id: "life", src: "assets/audio/lost_life.wav" },
    { id: "caught", src: "assets/audio/fish_caught.wav" }
];

/* Prealoding the game images and audio*/
function Preload() {
    assetLoader = new createjs.LoadQueue(); // create a new preloader
    assetLoader.installPlugin(createjs.Sound); // need plugin for sounds
    assetLoader.on("complete", init, this); // when assets finished preloading - then init function
    assetLoader.loadManifest(manifest);
}


function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    currentState = constants.MENU_STATE;
    changeState(currentState);
}

/* Main game loop, this is constantly checked to see if there is any state change or change to 
   game object positions*/
function gameLoop() {

    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }

   
}

function changeState(state: number): void {
    // Launch Various "screens"
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            menu = new states.GameMenu();
            currentStateFunction = menu;
            break;

        case constants.PLAY_STATE:
            // instantiate game play screen
            gamePlay = new states.GamePlay();
            currentStateFunction = gamePlay;
            break;

        case constants.GAME_INSTRUCTION_STATE:
            // instantiate game instruction screen
            instructions = new states.GameInstruction();
            currentStateFunction = instructions;
            break;

        case constants.GAME_OVER_STATE:
            // instantiate game over screen
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;
    }
}