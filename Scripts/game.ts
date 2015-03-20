/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />


/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/diver.ts" />
/// <reference path="objects/shark.ts" />
/// <reference path="objects/fish.ts" />


// Global game Variables
var canvas;
var stage: createjs.Stage;
var assets: createjs.LoadQueue;
var assetLoader: createjs.LoadQueue;


// Game Objects 
var diver: objects.Diver;
var fish: objects.Fish;
var ocean: objects.Ocean;
var shark: objects.Shark;
var sharks: objects.Shark[] = [];

var manifest = [
    { id: "shark", src: "assets/images/shark.png" },
    { id: "fish", src: "assets/images/fish.png" },
    { id: "ocean", src: "assets/images/ocean.jpg" },
    { id: "diver", src: "assets/images/diver.png" }
];


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

    main();
}

function gameLoop() {
    
    ocean.update();
    diver.update();
    fish.update();

    for (var shark = 2; shark >= 0; shark--) {
        sharks[shark].update();
        checkCollision(sharks[shark]);
    }

    checkCollision(fish);
    stage.update(); // Refreshes our stage
}

 // DISTANCE CHECKING METHOD
 function  distance(p1: createjs.Point, p2: createjs.Point): number {
    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
} //Distance Method

 // CHECK COLLISION METHOD
 function checkCollision(collider: objects.GameObject) {
         var planePosition: createjs.Point = new createjs.Point(diver.x, diver.y);
         var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
         var theDistance = this.distance(planePosition, objectPosition);
         if (theDistance < ((diver.height * 0.5) + (collider.height * 0.5))) {
             if (collider.isColliding != true) {
                 //createjs.Sound.play(collider.sound);
                 if (collider.name == "shark") {
                     diver.reset();
                     setInterval(function () {
                         diver.x = 640 - diver.getBounds().width;
                     }, 2000);
                    
                    // this.scoreboard.lives--;
                 }
                 if (collider.name == "fish") {
                     fish.reset();
                    // this.scoreboard.score += 100;
                 }
             }
             collider.isColliding = true;
         } else {
             collider.isColliding = false;
         }
     
 } // checkCollision Method


// Our Game Kicks off in here
function main() {

    //Ocean object
   ocean = new objects.Ocean();
   stage.addChild(ocean);  

    //Fish object
   fish = new objects.Fish();
   fish.name = "fish";
    stage.addChild(fish);


    //Diver object
    diver = new objects.Diver();
    stage.addChild(diver);

    //Shark object
    for (var shark = 2; shark >= 0; shark--) {
        sharks[shark] = new objects.Shark();
        stage.addChild(sharks[shark]);
    }
}