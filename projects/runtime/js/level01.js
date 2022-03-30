var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 115},
                { "type": "sawblade", "x": 700, "y": groundY  - 140},
                { "type": "sawblade", "x": 800, "y": groundY - 20},
                { "type": "sawblade", "x": 1600, "y": groundY - 20},
                { "type": "sawblade", "x": 2500, "y": groundY - 20},
                { "type": "sawblade", "x": 2250, "y": groundY - 20},
                { "type": "sawblade", "x": 3000, "y": groundY - 20},
                { "type": "sawblade", "x": 3500, "y": groundY - 20},


                { "type": "enemy", "x": 800, "y": groundY - 45},
                { "type": "enemy", "x": 1600, "y": groundY - 45},
                { "type": "enemy", "x": 2500, "y": groundY - 45},
                { "type": "enemy", "x": 2000, "y": groundY - 45},
            

                { "type": "reward", "x": 1000, "y": groundY - 80},
                { "type": "reward", "x": 2300, "y": groundY - 80},
                { "type": "reward", "x": 2700, "y": groundY - 80},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y){
            var hitZoneSize = 30; //creates the size of the hitzone to 25 pixels
            var damageFromObstacle = 10; //sets the damage of the obstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the hitzone 
            sawBladeHitZone.x = x; //the x position of the hitzone
            sawBladeHitZone.y = y; //the y position of the hitzone
            game.addGameItem(sawBladeHitZone); //add the hitzone to the game

            var obstacleImage = draw.bitmap('img/Bombddd.png'); //drawing the image and storing in the variable
            sawBladeHitZone.addChild(obstacleImage); //adds the image to the hitzone     
            obstacleImage.x = -40; //tweaks the image 25 pixels to the left
            obstacleImage.y = -50; //tweaks the image 25 pixels up
    
        }
        
        function createEnemy(x,y) {
            var enemy = game.createGameItem('enemy', 25);

            var redSquare = draw.bitmap('img/ggg.png');
            redSquare.x = -20;
            redSquare.y = -40;
            enemy.addChild(redSquare)

            enemy.x= x;
            enemy.y = y;

            game.addGameItem(enemy);

            enemy.velocityX = -1;

            enemy.onPlayerCollision = function() {
                console.log("the enemy had hit halle")
                game.changeIntegrity(-50);
                enemy.fadeOut();
            }

            enemy.onProjectileCollision = function() {
                console.log("the enemy had hit halle")
                game.changeIntegrity(-10);
                game.increaseScore(10);
                enemy.fadeOut();
        
            }

        }

        function createReward(x,y) {
            var reward = game.createGameItem('reward', 25);

            var blueSquare = draw.bitmap('img/reward.png');
            blueSquare.x = -65;
            blueSquare.y = -75;
            reward.addChild(blueSquare)

            reward.x= x;
            reward.y = y;

            game.addGameItem(reward);

            reward.velocityX = -1;

            reward.onPlayerCollision = function() {
                console.log("the reward had hit halle")
                game.changeIntegrity(75);
            }
            
        }

        for(var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];

            if(gameItem.type === "sawblade"){
                createSawBlade(gameItem.x, gameItem.y);
            }

            if(gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y);
            }

            if(gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y);
            }

        }

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
