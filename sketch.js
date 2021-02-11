const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;


var balloon1;
var database;
var position;
var backgroundImg;
var balloon1Img,balloon2Img;
var candies=[];
var maxcandies=100;
var candy1;
var bird,birdImage;
var gameState="play"

function preload(){

    backgroundImg=loadImage("backgroundImg.png")
    balloon1Img=loadImage("Hot Air Ballon-01.png")
    balloon2Img=loadImage("Hot Air Ballon-02.png")
    birdImage=loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png",
    "bird5.png","bird6.png","bird7.png","bird8.png","bird9.png");
}



function setup(){
    database=firebase.database();
    console.log(database);
    
    createCanvas(600,600);
    engine = Engine.create();
    world = engine.world;
  
    balloon1 = createSprite(300,300,10,10);
    balloon1.shapeColor = "black";
    balloon1.addImage(balloon1Img);
    balloon1.scale=0.5;


    var balloon1Position = database.ref('balloon/position');
    balloon1Position.on("value",readPosition, showError);

    
for(var i = 0; i < maxcandies; i++){

    candies.push(candy1=new Candy(random(0,600),random(0,600)))

}

    Engine.run(engine);


}




function draw(){
    background(backgroundImg);
    if(gameState==="play"){
    textSize(20)
    push ()
    fill("green");
    text("You are welcome to the world's largest candyland",50,50)
    pop ();
    push();
    fill("violet");
    text("We hope you enjoy the Hot Air Balloon ride!",50,80)
    pop();
    fill("orange")
    text("*Use the arrow keys to move your Hot Air Balloon",50,110)
}


    if(frameCount%250===0){
        bird=createSprite(-50,50,20,20);
        bird.addAnimation("birdflying",birdImage);
        bird.scale=0.6;
        bird.velocityX=4;
        bird.lifetime=200;
    }


    drawSprites();

    
    if(keyDown(LEFT_ARROW)){
        gameState="end";
        writePosition(-10,0);
        //balloon1.x=balloon1.x-10;
    }
    else if(keyDown(RIGHT_ARROW)){
        gameState="end";
        writePosition(10,0);
        //balloon1.x=balloon1.x+10;
    }
    else if(keyDown(UP_ARROW)){
        gameState="end";
        writePosition(0,-10);
        //balloon1.y=balloon1.y-10;
    }
    else if(keyDown(DOWN_ARROW)){
        gameState="end";
        writePosition(0,+10);
        //balloon1.y=balloon1.y+10;
    }


if(keyDown(UP_ARROW)){
    balloon1.addImage(balloon2Img)
    balloon1.scale=balloon1.scale -0.01;
}


if(keyDown(DOWN_ARROW)){
    balloon1.addImage(balloon1Img)
    balloon1.scale=balloon1.scale +0.01;
  
}



for(var i = 0; i < maxcandies; i++){

    candies[i].updatePosition();
    candies[i].showCandy();

}

}


function writePosition(x,y){
    database.ref('balloon/position').set({
        'x': position.x + x,
        'y': position.y + y
    })
   
}

function readPosition(data){
position=data.val();
balloon1.x=position.x;
balloon1.y=position.y;


}

function showError(){
    console.log("Error in writing to the database");
  }



 