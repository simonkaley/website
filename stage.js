//const World = require("./libraries/matter");


    // module aliases
    var Engine = Matter.Engine,
   // Render = Matter.Render,
    Body = Matter.Body,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Mouse = Matter.Mouse, 
    MouseConstraint=Matter.MouseConstraint;


var engine;
var world;
var canvas;
var popcornArr=[];
var ground;
var sensor;
var mConstraint;
var kernel1;
var matchstick1;
var kernelExists = true; 

var arrowImg;
var arrowRightImg;
var backgroundImg;
var kernelsImg;
var matchstickImg;
var panGif;
var popcornImg;
var vignetteImg;

var popSound; 

function preload() {
    arrowImg = loadImage('assets/arrow.png');
    arrowRightImg = loadImage('assets/arrowRight.png');
    backgroundImg = loadImage('assets/background.png');
    kernelsImg = loadImage('assets/kernels.png');
    matchstickImg = loadImage('assets/matchstick.png');
    panGif = loadImage('assets/pan.gif');
    popcornImg = loadImage('assets/popcorn.png');
    vignetteImg = loadImage('assets/vignette.png');

    popSound = loadSound('assets/popSound.mp3');
    
}

function setup() {

    canvas = createCanvas(1200,600);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x,y);

    engine = Engine.create();
    world = engine.world;

    //matchstick
    block = Bodies.rectangle(canvas.width/2-5,174,265,14, { isStatic: true });

    //borders
    ceiling = Bodies.rectangle(canvas.width/2,0-25,canvas.width,50, { isStatic: true });
    ground = Bodies.rectangle(canvas.width/2,canvas.height+25,canvas.width,50, { isStatic: true });
    wallLeft = Bodies.rectangle(0-25,canvas.height/2,50,canvas.height, { isStatic: true });
    wallRight = Bodies.rectangle(canvas.width+25,canvas.height/2,50,canvas.height, { isStatic: true });

    //create pan hitbox
    panLeft1 = new PanSide(canvas.width/2-240,canvas.height-95,20,100,radians(-30));
    panLeft2 = new PanSide(canvas.width/2-140,canvas.height-25,20,160,radians(-70));
    panLeftEdge = new PanSide(canvas.width/2-279,canvas.height-139,10,20,radians(-90));

    panRight1= new PanSide(canvas.width/2+240,canvas.height-95,20,100,radians(30));
    panRight2= new PanSide(canvas.width/2+140,canvas.height-25,20,160,radians(70));
    panRightEdge = new PanSide(canvas.width/2+279,canvas.height-139,10,20,radians(90));

    //sensor
    sensor = Bodies.rectangle(canvas.width/2,canvas.height-40,100,50, {isSensor: true, isStatic: true });
   

    Engine.run(engine);

    //add objects to stage
    Composite.add(world,block);
    Composite.add(world,ceiling);
    Composite.add(world,ground);
    Composite.add(world,wallLeft);
    Composite.add(world,wallRight);
    Composite.add(world,sensor);

    var options = {
        friction: 0.4,
        restitution: 0.7
    }

    //add kernel
    kernel1=new Kernel(canvas.width/2,110,244,114);


    var canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRatio=pixelDensity(); 
    var options = {
        mouse: canvasMouse
    }
    
    mConstraint = MouseConstraint.create(engine,options);
    Composite.add(world,mConstraint);

    //collision event
    Events.on(engine, 'collisionStart', function(event) {
        var pairs = event.pairs;
        
        for (var i=0;i<pairs.length;i++) {
            var pair = pairs[i];

            if (pair.bodyA === sensor) {
                //remove sensor, kernel1, and block
                Composite.remove(world, kernel1.body);
                Composite.remove(world, sensor);
                Composite.remove(world, block);
                //create matcstick
                matchstick1 = new Matchstick(canvas.width/2,174,265,14);
                //popcorn explosion
                popSound.play();
                popcornArr.push(new Popcorn(canvas.width/2,canvas.height-50,110,62));
                popcornArr.push(new Popcorn(canvas.width/2,canvas.height-50,110,62));
                popcornArr.push(new Popcorn(canvas.width/2,canvas.height-50,110,62));
                popcornArr.push(new Popcorn(canvas.width/2,canvas.height-50,110,62));
                
                popcornArr.push(new Popcorn(canvas.width/2-50,canvas.height-100,110,62));
                popcornArr.push(new Popcorn(canvas.width/2-50,canvas.height-100,110,62));
                popcornArr.push(new Popcorn(canvas.width/2-50,canvas.height-100,110,62));
                popcornArr.push(new Popcorn(canvas.width/2-50,canvas.height-100,110,62));

                popcornArr.push(new Popcorn(canvas.width/2+50,canvas.height-100,110,62));
                popcornArr.push(new Popcorn(canvas.width/2+50,canvas.height-100,110,62));
                popcornArr.push(new Popcorn(canvas.width/2+50,canvas.height-100,110,62));g
                popcornArr.push(new Popcorn(canvas.width/2+50,canvas.height-100,110,62));
            } 
            
        }
    });

    
}

//center window
function windowResized() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x,y);
}




function draw() {
    //background color
    //background(51);
    //draw background
    imageMode(CENTER)
    image(backgroundImg,canvas.width/2,canvas.height/2,canvas.width,canvas.height);

    //draw popcorn
    for (var i=0;i<popcornArr.length;i++) {
        popcornArr[i].show();
    }
    //draw kernel
    oArr = Composite.allBodies(world)
    kernelExists = false;
    for (var i=0;i<oArr.length;i++) {
        if (oArr[i] == kernel1.body){
            kernelExists = true;
        }
    }
    if (kernelExists==true)
    {
        //draw matchstick
        imageMode(CENTER)
        image(matchstickImg,canvas.width/2,170,318,76);
        //draw arrow
        image(arrowImg,canvas.width/2,400,36,49);
        image(arrowRightImg,canvas.width/2-170,110,49,36);
        //rect(canvas.width/2-5,174,265,14)

        //draw name kernels
        kernel1.show();
    

    }
    else 
    {
        matchstick1.show();
    }

    rectMode(CENTER);
    
    fill(104, 101, 192, 127);
   
   

    /*
    //ceiling
    rect(canvas.width/2,0,canvas.width,50);
    //ground
    rect(canvas.width/2,canvas.height,canvas.width,50);
    //walls
    rect(0,canvas.height/2,50,canvas.height);
    rect(canvas.width,canvas.height/2,50,canvas.height);
    */
    //sensor
    fill(204, 101, 192, 127);

    //draw pan
    imageMode(CENTER)
    image(panGif,canvas.width/2,canvas.height-60,584,171);
    //draw sensor hitbox
    //rect(canvas.width/2,canvas.height-40,100,50)
   
    //draw vignette
    imageMode(CENTER)
    image(vignetteImg,canvas.width/2,canvas.height/2,canvas.width,canvas.height);
    
   
   /*
    panLeft1.show();
    panLeft2.show();
    panLeftEdge.show();

    panRight1.show();
    panRight2.show();
    panRightEdge.show();
    */
     //reset kernel1 to starting position if it leaves the room
    if (kernel1.body.position.y>canvas.height || kernel1.body.position.y<0) 
    {
        Composite.remove(world, kernel1.body);
        kernel1=new Kernel(canvas.width/2,110,244,114);
    }

}



