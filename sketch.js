//Kanye Quest

// MAKE BRANCH FOR:
//(PROM EDITION) - 3 keys, once collected go to boss door
//                 Fight enemy to save princess, defeat
//                 enemy,
//(SPACE THEMED) - Explore the universe and go to prom with me (or something like that I guess)

var GRAVITY = .4; //Constant
var JUMP = -10; //constant
var GROUND, BG, PLAYER, BOSS_CASTLE, ENEMIES, FIRE, STRUCTURES, CLOUDS; //Sprites
var GroundImg, BgImg, PlayerImg, EnemyImg, FireImg; //Images

function preload() {

    // GroundImg = loadImage('http://i.imgur.com/p6L1baG.png');
    //
    // FireImg = loadImage('http://i.imgur.com/0NUZboL.png');
    //
    // PlayerImg = loadImage('http://i.imgur.com/AljRUIL.png');

}

function setup() {
  createCanvas(700,600);
  //Length of game strip: 4,000 pixels
  //start @ x = 0
  //end @ x = 4000

  //Sizing is tmp for mechanics:      width height
  GROUND = createSprite(width/2, 550, 1400, 100);
  // GROUND.addImage(GroundImg);

  //BG = createSprite();

  PLAYER = createSprite(width/2, 475, 50, 50);
  // PLAYER.addImage(PlayerImg);
  PLAYER.setCollider("circle", 0,0,50);

  BOSS_CASTLE = createSprite(3500, 475, 400, 400);
  BOSS_CASTLE.setCollider();

  ENEMIES = new Group();
  FIRE = new Group();
  STRUCTURES = new Group();
  CLOUDS = new Group();

}

function draw() {
  background(100, 150, 200);
  textAlign(CENTER);
  PLAYER.velocity.y += GRAVITY;

  //Says that CAMERA will always follow PLAYER
  camera.position.x = PLAYER.position.x;
  // camera.position.y = PLAYER.position.y - 150;

  //My better-than-alex's attempt to get the ground to wrap with movement
  if(camera.position.x > GROUND.position.x + width / 4) {
    GROUND.position.x += GROUND.width / 6;
  } else if(camera.position.x < GROUND.position.x - width / 4) {
    GROUND.position.x -= GROUND.width / 6;
  }

  //Player movement | abilities

    //  Left | Right
  if(keyDown(65)) {
    PLAYER.position.x -= 4;
    PLAYER.mirrorX(1);
    if(keyDown(16)) {
      PLAYER.position.x -= 4.5;
    }
  } else if(keyDown(68)) {
    PLAYER.position.x += 4;
    PLAYER.mirrorX(-1);
    if(keyDown(16)) {
      PLAYER.position.x += 4.5;
    }
  }

    //  Jump
  if(keyWentDown(87)) {
    PLAYER.velocity.y = JUMP;

    if(PLAYER.position.y < 370) {
      PLAYER.position.y = 370;
    }
  }

    //  Player spits fire
  if(keyWentDown(32)) {
    var fire = createSprite(PLAYER.position.x - 20 * PLAYER.mirrorX(), PLAYER.position.y);
    // fire.addImage(FireImg);
    fire.life = 40;
    if(PLAYER.mirrorX() === -1) {
      fire.setSpeed(15, 0);
      fire.mirrorX(1);
    } else {
      fire.setSpeed(-15, 0);
      fire.mirrorX(-1);
    }
    FIRE.add(fire);

  }

  //Prevents player from falling through ground (?)
  if(PLAYER.collide(GROUND)) {
    PLAYER.velocity.y = 0;
  }

  //Check values here
  console.log("camera: " + camera.position.x);
  console.log("ground: " + GROUND.position.x);

  //Environment sprites

    //  Create Enemies
  for(var i = ENEMIES.length; i < 4; i++) {
    var posX = random(PLAYER.position.x - (width/2), PLAYER.position.x + (width/2));
    var posY = 475;
    createEnemy(posX, posY);

    // if(ENEMIES.get(i).overlap(STRUCTURES)) {
    //   if(ENEMIES.get(i).getDirection == 180) {
    //     ENEMIES.get(i).setSpeed(1, 0);
    //   } else {
    //     ENEMIES.get(i).setSpeed(-1, 0)
    //   }
    // }
  }

    //  Remove Enemies
  for (var i = 0; i < ENEMIES.length; i++) {
    if(ENEMIES[i].position.x + (ENEMIES[i].width / 2) < PLAYER.position.x - (width / 2) || ENEMIES[i].position.x - (ENEMIES[i].width / 2) > PLAYER.position.x + (width / 2)) {
      ENEMIES[i].remove();
    }
  }

    //  Structures
  if(frameCount % 60 == 0) {

  }

    //  Create Clouds
  for(var i = CLOUDS.length; i < 21; i++) {

    var posY = random(height / 3, 0);

    var j = CLOUDS.length;
    var k = CLOUDS.length;
    if(j <= 10) {
      var posX = random(camera.position.x - (width / 2) + 50, camera.position.x + (width / 2) + 50);
      createCloud(posX, posY);
      j++
    } else if( k > 10 || k <= 21) {
      if (PLAYER.mirrorX() === -1) {
        var posX = random(camera.position.x - (width / 2) + width, camera.position.x + (width / 2) + width);
        createCloud(posX, posY);
        k++
      } else {
        var posX = random(camera.position.x - (width / 2) - width, camera.position.x + (width / 2) - width);
        createCloud(posX, posY);
      }
    }
  }

    //  Remove Clouds
  for(var i = 0; i < CLOUDS.length; i++) {
    if(CLOUDS[i].position.x + (CLOUDS[i].width / 2) < PLAYER.position.x - (width / 2)  || CLOUDS[i].position.x - (CLOUDS[i].width / 2) > PLAYER.position.x + (width / 2)) {
      CLOUDS[i].remove();
    }
  }



  //Debug
  GROUND.debug = true;
  PLAYER.debug = true;
  BOSS_CASTLE.debug = true;


  drawSprites();
}

//Creates an enemy
function createEnemy(x, y) {
  var enemy = createSprite(x, y, 50, 50);
  //add img for enemy here (?)

  enemy.setSpeed(-1, 0);
  enemy.debug = true;
  enemy.setCollider("circle", 0,0,50);
  ENEMIES.add(enemy);

  return enemy;
}

function createCloud(x, y) {
  var newCloud = createSprite(x ,y, random(50, 75), random(16, 32));
  // newCloud.setCollider("rectangle");
  CLOUDS.add(newCloud);

  return newCloud;
}
