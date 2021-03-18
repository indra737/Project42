var END=0;
var PLAY=1;
var gameState=PLAY;
var babu,babuImage,babuJumping,babuCollided;
var ground,groundImage,invisibleGround;
var bananas,bananaImage,bananasGroup;
var obstacles,obstaclesImage,obstaclesGroup;
var survivalTime=0;   
var bananasCollected=0;
var restart,restartImage

function preload(){
  babuImage=loadAnimation("Babu_1.png","Babu_2.png","Babu_5.png","Babu_6.png")
 bananaImage= loadImage("banana.png");
  obstaclesImage=loadImage("obstacle.png");
  groundImage=loadImage("ground.png");
  babuJumping=loadImage("Babu_3.png");
  babuCollided=loadImage("Babu_4.png");
  restartImage=loadImage("restart2.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight)
  ground= createSprite(width/2,height+100,100000,20);
  ground.addImage(groundImage)
  ground.scale=1;
  ground.velocityX=10;
  
  invisibleGround= createSprite(width/2,height-50,1000000000000000,30);
  invisibleGround.visible=false;
  ground.setCollider("rectangle",200,0,20000,400);
  babu= createSprite(1230,700,20,20)
  babu.addAnimation("running",babuImage);
  babu.addAnimation("jumping",babuJumping);
  babu.addAnimation("collided",babuCollided);
  babu.scale=0.05;
  babu.setCollider("rectangle",0,0,1500,2600)
  
  restart=createSprite(300,200,0,0);
  restart.addImage(restartImage);
  restart.scale=0.06;
  restart.visible=false;
  
  obstaclesGroup= new Group();
  bananasGroup= new Group();
}

function draw(){
  background("skyblue")
 if(gameState===PLAY){
   survivalTime+=Math.round(frameRate()/61);
 

   if(babu.isTouching(ground)) {
    babu.changeAnimation("running",babuImage);
  }
   else{
    babu.changeAnimation("jumping",babuJumping)
  }
   
   if(keyDown("space")&& babu.y>=250){
   babu.velocityY=-12;
 }
  if(ground.x>400){
    ground.x=200;
  }
  if(babu.isTouching(bananasGroup)){
    bananasCollected++;
    bananasGroup.destroyEach()
    babu.scale+=0.01
  }
   banana();
  rock();
  babu.velocityY+=0.5;
   
   if(babu.isTouching(obstaclesGroup)){
     gameState=END;
   }
 }else if(gameState===END){
  restart.visible=true;
   babu.changeAnimation("collided",babuCollided)
   obstaclesGroup.setVelocityXEach(0);
   bananasGroup.setVelocityXEach(0);
   obstaclesGroup.setLifetimeEach(-1);
   bananasGroup.setLifetimeEach(-1);
   ground.velocityX=0;
   babu.velocityY=0;
   if(mousePressedOver(restart)){
     reset()
   }
 }
  
    
 
  babu.collide(invisibleGround);
  drawSprites();
  textSize(20);
  stroke("red");
 fill("red");
  text("Survival Time: "+ survivalTime,400,50);
   textSize(20);
  stroke("green");
 fill("green");
  text("Bananas Collected: "+ bananasCollected,100,50);
}
function banana(){
 if(frameCount%109==0){
  bananas= createSprite(0,random(200,370),20,20)
  bananas.velocityX=10;
   bananas.addImage(bananaImage)
   bananas.scale=0.13;
   bananasGroup.add(bananas);
   bananas.setCollider("rectangle",0,60,600,200)
   bananas.lifetime=300;
}
}
function rock(){
  if(frameCount%110===0){
    obstacles=createSprite(0,600,20,20)
    obstacles.velocityX=10;
    obstacles.addImage(obstaclesImage)
    obstacles.scale=0.4;
    obstaclesGroup.add(obstacles);
    obstacles.setCollider("circle",0,0,200);
    obstacles.lifetime=300;
  }
}
function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  survivalTime=0;
  bananasCollected=0;
  restart.visible=false;
  ground.velocityX=10;
}