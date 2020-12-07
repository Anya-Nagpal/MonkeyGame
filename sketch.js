var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var survivalTime = 0;
var score = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4
  ground.x = ground.width / 2;


function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.15;
  
  console.log(ground.x);
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background("lightblue");
   

  if (keyDown("space") && monkey.y >= 159) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time:" + survivalTime,100,50);
  
  text("Score:" + score , 100,100);
  food();
  spawnObstacles();
  monkey.collide(ground);
  
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 1;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    text("Game Over!!!",200,200);
  }
  drawSprites();
}

function food(){
  if(frameCount % 80 === 0) {
    var banana = createSprite(400,400,10,40);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200))
    banana.lifetime = 300;
    banana.velocityX = -(6 + 3*score/100);
    FoodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,310,10,40);
    obstacle.debug = true;
    obstacle.setCollider("rectangle",0,0,80,80);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}