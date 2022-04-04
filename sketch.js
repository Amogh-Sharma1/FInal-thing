var jet, jetimg
var run, runimg
var sky, skyimg
var bird, birdimg
var bullet, bulletimg
var bulletG, birdG
var score=0
var gamestate = "play"

function preload() {
  jetimg = loadImage("Jet.png")
  runimg = loadImage("Runaway.jpg") 
  skyimg = loadImage("Sky.jpg")
  bulletimg = loadImage("bullet-removebg-preview.png")
  birdimg = loadImage("depositphotos_240669998-stock-illustration-front-view-flying-sparrow-bird-removebg-preview.png")
}
  function setup() {
  createCanvas(windowWidth ,windowHeight);
  sky = createSprite(400, 200,width,height ) 
  sky.addImage(skyimg)
  sky.scale = 10
  sky.velocityY = 10
  
  jet = createSprite(width/2,height/2)
  jet.addImage(jetimg)

    bulletG = new Group()
    birdG = new Group()


}

function draw() {
  background(255,255,255);  
  drawSprites(); 
  if(gamestate==="play"){

  
  bird()
  gun()
  if(sky.y >height){
    sky.y = height/2
  }

  if(keyDown("D")){
    jet.position.x = jet.position.x + 10
  }
  if(keyDown("A")){
    jet.position.x = jet.position.x - 10
  }
  if(keyDown("S")){
    jet.position.y = jet.position.y + 10
  }
  if(keyDown("W")){
    jet.position.y = jet.position.y - 10
  }
  

if(jet.isTouching(birdG)){ 
  gamestate = "end"
}
bulletG.collide(birdG,dead)
    textSize(70)
  fill("white")
text("SCORE:"+score,jet.position.x-150,jet.position.y+250)
}
if(gamestate === "end"){
  textSize(100)
  fill("red")
  text("DED",jet.position.x-150,jet.position.y+350)
  birdG.destroyEach()
  sky.velocityY=0
}
}

function bird() {
  if (frameCount % 10 === 0){
    var bird = createSprite(random(0,width),0)
    bird.addImage(birdimg)
    bird.scale = 0.3
    bird.velocityY = + 1
    birdG.add(bird)
    bird.lifetime = 500
  }
}
function gun(){
  if(keyDown("space")){
    var bullet = createSprite(jet.x,jet.y)
    bullet.addImage(bulletimg)
    bullet.scale = 0.1
    bullet.velocityY = - 10
    bulletG.add(bullet)
    bullet.lifetime = 100
  }

}
function dead(bullet,bird){
  bird.remove()
  bullet.remove()
  score = score + 1
}