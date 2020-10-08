var start=0,play=1,end=2, gamestate=start;

var ghost,ghostSt,ghostJu,ghostSound;
var tower,towerImg;
var door,doorImg,doorGroup;
var railing,railingI,railGroup;
var invrail,invrailGrp;
var score=0;

function preload(){
  ghostSt=loadAnimation("ghost-standing.png");
  ghostJu=loadAnimation("ghost-standing.png","ghost-jumping.png");
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  railingI=loadImage("climber.png");
  ghostSound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);

  
  tower=createSprite(300,300,10,10);
  
  tower.addImage(towerImg);
  tower.scale=1;
  
   ghost=createSprite(300,300,10,10);
  ghost.addAnimation("Stand",ghostSt);
   ghost.addAnimation("jump",ghostJu);
  ghost.scale=0.4;
  
  doorGroup=new Group();
  railGroup=new Group();
  invrailGrp=new Group();
  
}
function draw(){
  background("black");

  if(gamestate===start){
    ghost.velocityY=0;
    tower.velocityY=0;
    
    if(keyDown("enter")){
      gamestate=play;
    }
  }
  if(gamestate===play){
    
     ghostSound.play();
    tower.velocityY=5;
    if(keyDown("space")){
    ghost.velocityY=-10;
    ghost.changeAnimation("Stand",ghostSt);
  }
    ghost.velocityY=ghost.velocityY+1;
     if(keyDown("LEFT")){
    ghost.x=ghost.x-3;
    ghost.changeAnimation("jump",ghostJu);
  }
    if(keyDown("RIGHT")){
    ghost.x=ghost.x+3;
    ghost.changeAnimation("jump",ghostJu);
  }
    if(tower.y>600){
    tower.y=300;
  }
  if(ghost.isTouching(railGroup)){
    ghost.velocityY=0;
  }
    
    
 spawnDoors();
    
    if(ghost.isTouching(invrailGrp)||ghost.y>600){
      gamestate=end;
    }
  }
  if(gamestate===end){
    doorGroup.destroyEach();
    invrailGrp.destroyEach();
    railGroup.destroyEach();
    ghost.destroy();
    tower.destroy();
    stroke(100);
    fill("white");
    textSize(30);
    text("GAME OVER",250,250);
    fill("white");
    text("Your score:"+score,250,350);
    ghostSound.stop();
  }
  
 
  
  drawSprites();
  
}

function spawnDoors(){
  if(frameCount%100===0){
    door=createSprite(Math.round(random(100,500)),10,10,10);
    door.velocityY=5;
    door.addImage(doorImg);
    doorGroup.add(door);
    
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    
    railing=createSprite(door.x,70,1,1);
    railing.addImage(railingI);
    railing.velocityY=5;
    railGroup.add(railing);
    
    invrail=createSprite(railing.x,85,railing.width,2);
    invrailGrp.add(invrail);
    invrail.velocityY=5;
    invrail.visible=false;
    if(ghost.depth>door.depth){
       score=score+3;
    }
   
  }
}