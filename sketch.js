var userPaddle, computerPaddle, computerScore, playerScore, gameState, ball,scoreSound, wall_hitSound, hitSound;

function setup() {
  
createCanvas(400,400);

//create a user paddle sprite
userPaddle = createSprite(390,200,10,70);
userPaddle.shapeColor="yellow";

//create a computer paddle sprite
computerPaddle = createSprite(10,200,10,70);
computerPaddle.shapeColor="yellow";

//create the pong ball
ball = createSprite(200,200,12,12);
ball.shapeColor="red";

computerScore = 0;
playerScore = 0;
gameState = "serve";
}

function draw() {  
  //fill the computer screen with white color
  background("lightblue");
  edges = createEdgeSprites();

  textSize(20);
  fill(0);
  textAlign(CENTER);

  //display Scores
  text(computerScore,170,20);
  text(playerScore, 230,20);

  //draw dotted lines
  for (var i = 0; i < 400; i+=20) {
     line(200,i,200,i+10);
  }

  if (gameState === "serve") {
    text("Press Space to Serve",200,180);
  }

  if (gameState === "over") {
    text("Game Over!",200,160);
    text("Press 'R' to Restart",200,180);
  }

  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }


  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = random(6,10);
    ball.velocityY = random(6,10);
    gameState = "play";
  }

  //make the userPaddle move with the mouse
  userPaddle.y = World.mouseY;



  //make the ball bounce off the user paddle
  if(ball.isTouching(userPaddle)){
    //hitSound.play();
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }

  //make the ball bounce off the computer paddle
  if(ball.isTouching(computerPaddle)){
    //hitSound.play();
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }

  //place the ball back in the centre if it crosses the screen
  if(ball.x > 400 || ball.x < 0){
    //scoreSound.play();

  if (ball.x < 0) {
      playerScore++;
    }
    else {
      computerScore++;
    }

    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";

    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }

  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
   // wall_hitSound.play();
  }

  //add AI to the computer paddle so that it always hits the ball
  computerPaddle.y = ball.y;
  drawSprites();
}
