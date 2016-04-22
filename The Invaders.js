window.onload=function(){
	myGame();
}


  var game,background,backVelocity,boundry=38,player
  ,playerVelocity,playerBullets,pBTime=0
  ,fireButton,input,bulletVelocity,enemies,
  explosions,livingEnemies = [],enemyBullet
  ,firingTimer = 0 ,score = 0,scoreString = ''
  ,GameOv = '' ,lives ,Nx = 5 ,Ny = 4 ,Speed = 3000
  ,numBullets = 2500 ,numLifes = 3;

  var audio = new Audio('background.mp3');
  var shoot = new Audio('powerup.wav');
  var exp = new Audio('Explosion5.wav');
  var over = new Audio('fanfare.mp3');
 


function myGame(){
  
   game = new Phaser.Game(512,512,Phaser.CANVAS,'gameContainer');

    
  var mainState={
    
    preload:function(){
      
       game.load.image('space','assets/space.jpg');
       game.load.image('ship','assets/ship.png');
       game.load.image('mybullets','assets/Bullets.png');
       game.load.image('enemyBullet','assets/asteroid7.png');
       game.load.image('enemy','assets/asteroid1.png');
       game.load.spritesheet('boom', 'assets/explode.png', 26, 26, 5);


    },
    
    create:function(){
      
      //background
      background= game.add.tileSprite(0,0,512,512,'space'); 
      backVelocity=2;
      audio.play();
      
      //player
      player = game.add.sprite(game.world.centerX,game.world.centerY+180,'ship');
      player.anchor.setTo(0.5, 0.5);
      game.physics.enable(player, Phaser.Physics.ARCADE);
      playerVelocity=200;
      player.rotation=4.7;
      player.scale.x=1.7;
      player.scale.y=1.7;
       
      //bullets
      playerBullets=game.add.group();
      playerBullets.enableBody=true;
      game.physics.enable(playerBullets, Phaser.Physics.ARCADE);
      playerBullets.createMultiple(30,'mybullets');
      playerBullets.setAll('anchor.x', 0.5);
      playerBullets.setAll('anchor.y', 1);
      playerBullets.setAll('outOfBoundsKill', true);
      playerBullets.setAll('checkWorldBounds', true);
      bulletVelocity=300;

      //enemies
      enemies = game.add.group();
      enemies.enableBody = true;
      enemies.physicsBodyType = Phaser.Physics.ARCADE;
      CreateEnemies(Nx ,Ny ,Speed);

      //enemy bullets
      enemyBullets = game.add.group();
      enemyBullets.enableBody = true;
      enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBullets.createMultiple(30, 'enemyBullet');
      enemyBullets.setAll('anchor.x', 0.5);
      enemyBullets.setAll('anchor.y', 1);
      enemyBullets.setAll('outOfBoundsKill', true);
      enemyBullets.setAll('checkWorldBounds', true);


     //explosion
     explosions = game.add.group();
     explosions.createMultiple(30, 'boom');
     explosions.forEach(setupInvader, this);

     //score
     scoreString = 'Score : ';
     scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Impact, Charcoal, sans-serif', fill: '#fff' });



      //inputs 
      input = game.input.keyboard.createCursorKeys();
      fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      //lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives ', { font: '34px Impact, Charcoal, sans-serif', fill: '#fff' });

    for (var i = 0; i < 3; i++) 
    {
        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.7;
    }

     

    },

    update:function(){

      game.physics.arcade.overlap(playerBullets, enemies, collision, null, this);
      game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);

    	  //moving background
        background.tilePosition.y+=backVelocity;

        //moving player
        player.body.velocity.x=0;
        if(input.left.isDown){
        	if(player.x>boundry)
           		player.body.velocity.x=-playerVelocity;    	    
        }
        if(input.right.isDown){
        	if(player.x<game.width-boundry)
           		player.body.velocity.x=playerVelocity;
        }

       //firing bullets
       if(fireButton.isDown){
      	  myFire();
        }

        if (game.time.now > firingTimer)
        {
            EnemyFire(numBullets);
        }
    }

  } 

    var menuState={

      preload:function(){
         game.load.image('startMenu','startmenu.jpg');


      },
      create:function(){
        game.add.image(0,0,'startMenu');
        startButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      },
      update:function(){
         if(startButton.isDown){
          game.state.start('mainState');
  
        }

      }

    }


     
     game.state.add('menuState',menuState);
     game.state.add('mainState',mainState);
     game.state.start('menuState')

     
   document.getElementById('closeModel').onclick = function() {
      game.state.start('menuState');
      }


}

function myFire(){
    
    if(game.time.now>pBTime){
   		bullet = playerBullets.getFirstExists(false); 
   
   		if (bullet)
        {
            bullet.reset(player.x, player.y);
            bullet.body.velocity.y = -bulletVelocity;
            pBTime= game.time.now + 200;
            shoot.play();
        }


    }    

}

function CreateEnemies(nx ,ny ,speed){
  for(var y = 0 ;y < ny ;y++){
    for(var x = 0 ;x < nx ;x++){
     var enemy = enemies.create(x*(Math.floor((Math.random() * 80) + 50)), y*(Math.floor((Math.random() * 30) + 20)), 'enemy');
      enemy.anchor.setTo(0.5,0.5);
      var tween = game.add.tween(enemy).to({x:Math.floor((Math.random() * 250) + 50)},Math.floor((Math.random() * speed) + 1000),Phaser.Easing.Linear.None,true,0,3000,true); //({from x : to ..},speed)
      tween.onLoop.add(descend,this);
      
    }
  }

  enemies.x = 50;
  enemies.y = 50;

}

function setupInvader (invader) {

    invader.anchor.x = 0;
    invader.anchor.y = 0;
    invader.animations.add('boom');

}

function descend(){
  enemies.y +=10;

}

function collision(mybullets,enemy){

  mybullets.kill();
  enemy.kill();
  exp.play();
  var explosion = explosions.getFirstExists(false);
    explosion.reset(enemy.body.x, enemy.body.y);
    explosion.play('boom', 10, false, true);
    score += 10;
    scoreText.text = scoreString + score;

    if (enemies.countLiving() == 0)
    {
    	Nx ++;
    	//Ny ++;
    	Speed += 1000;
        score += 100;
        numBullets -= 300;
        scoreText.text = scoreString + score;

        CreateEnemies(Nx ,Ny ,Speed);

    }




}


function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
        numLifes = numLifes - 1;
        exp.play();
    }
   
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('boom', 30, false, true);

   if (numLifes == 0){
    player.kill();
    exp.play();
    enemyBullets.callAll('kill');
    playerBullets.callAll('kill');

    gameOver();
}

}



function EnemyFire(numBullets){

  enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    enemies.forEachAlive(function(enemy){

        livingEnemies.push(enemy);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);
        var shooter=livingEnemies[random];
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,200);
        firingTimer = game.time.now + numBullets;
    }


}

function enterscore() {
  swal({
    title : "GAME OVER",
    text: "Your score is : " + score,
    type : "input",
    showCancelButton : false,
    closeOnConfirm : false,
    aniation : "slide-from-top",
    inputPlaceholder : "Please enter your name." 
  },function(input){
    if(input === false) return false;
    if(input === '') {
       swal.showInputError("You need to write something!");    
       return false;
    }
    var data = {};
    data.username = input;
    data.score = score;
    $.ajax({
      method : 'POST',
      url : 'score.php',
      data : data,
      success : function() {
        swal({
          title : "GAME OVER",
          text: "Hope you enjoyed the game " + data.username,
          type : "success",
        },function() {
          new Vue({
            el : 'body',
            data : {
              topusers : []
            },
            ready : function(){
              var self = this;
              this.$http.get('gettopusers.php')
              .then(function(response){
                self.$set('topusers',response.data);
                console.log(self.topusers);
              },function(err){
                console.log(err);
              });
            }
          });
          $('#topten').modal('show');
        });
      }
    });
  });
}

function gameOver () {

    enemies.removeAll();
    playerBullets.removeAll();
    GameOv = score;
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ',
     { font: '84px Impact, Charcoal, sans-serif', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.text= GameOv;
    stateText.visible = true;
    audio.pause();
    over.play();
    enterscore();


}




function Living(){

	enemies.forEachAlive(function(enemy){

        living.push(enemy);
    });

    return living.length();
}

