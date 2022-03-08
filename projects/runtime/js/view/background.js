var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'yellow'); // color for background
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('img/moon.png'); //Created a variable called moon. Draw.bitmap
            moon.x = canvasWidth- 300; // moves moon right and left
            moon.y = groundY - 450; // moves moon up and down
            moon.scaleX = 0.5; //scales the moon up and down 
            moon.scaleY = 0.5;
            background.addChild(moon);//adds moon to the background
            
            //Everytime the loop runs it creates a circle with a random x and y respective to the canvas and is added to the background
            for (var  i = 0;i <= 100; i++){
                var circle = draw.circle(3,'white','LightGray',2);//creates a variable called circle that holds each circle
                circle.x = canvasWidth*Math.random();// multiples canvas width times a random decimal .1 and .99 and assigns it to cirlceX
                circle.y = groundY*Math.random();// multiples groundY * a random decimal .1 and .99 and assigns it to cirlceX
                background.addChild(circle);// adds the circle to the background

            }
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i = 0; i < 5; i++) {
                var buildingHeight = 300; // creates a variable called building height that holds the height of the building in pixels
                var building = draw.rect(75,buildingHeight,'LightGray','Black',1); // creates a var called building that holds the data for the drawn building
                building.x = 200*i; // positions the x of each building 200 pixels from the next building on each loop
                building.y = groundY-buildingHeight; // sets the y of the building off the groundY - buildingHeight
                background.addChild(building); // adds building to background so it can be seen
                buildings.push(building); // pushes each individual building to the buildings array
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = 600;
            tree.y = groundY - 120;
            tree.scaleX =  0.5;
            tree.scaleY = 0.5;
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1; //taking the value of tree.x and decreasing by 1 pixel every time the update function runs.

            if(tree.x < -200) { //
             tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax

            //loops the building and moves them to the left by 0.5 pixels
            for (var i = 0; i < buildings.length; i++){
                buildings[i].x = buildings[i].x - 0.5; //moves the building's x position by .5 pixels
                if(buildings[i].x < 0) { //checks to see if the building's x pos is off the left side and if it is resets the 
                    buildings[i].x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
