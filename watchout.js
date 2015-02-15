// GAME SETTINGS


var settings = {
  boardY: 500,
  boardX: 750,
  numAsteroids: 15,
  asteroidDimension: 20,
  playerHeight: 37.5,
  playerWidth: 50,
  duration: 1000
};

var gameStats = {
  score: 0,
  highScore: 0,
  collisions: 0
};

// Helper functions
var pixelize = function(val){
  return val + 'px';
};

var randomPosition = function(limit) {
  return Math.floor(Math.random() * limit);
};

var updateScore = function() {
  d3.select('.scoreboard .current span').text(gameStats.score);
  d3.select('.scoreboard .highscore span').text(gameStats.highScore);
  d3.select('.scoreboard .collisions span').text(gameStats.collisions);

};

var board = d3.select('.gameboard').style({
  width: pixelize(settings.boardX),
  height: pixelize(settings.boardY)
});


var player = {
  top: pixelize(settings.boardY / 2),
  left: pixelize(settings.boardX / 2)
};

d3.select('.player').style({
    top: player.top,
    left: player.left
  });

var mouseLeft = 0;
var mouseTop = 0;

board.on('mousemove', function(){
  var loc = d3.mouse(this);
  player = { left: loc[0], top: loc[1] };
  mouseLeft = loc[0];
  mouseTop = loc[1];
  d3.select('.player').style({
    top: pixelize( player.top ),
    left: pixelize( player.left )
  });
});

  // .call(drag);

// var drag = d3.behavior.drag()
//   .on('drag', function() {
//     console.log('player' + player);
//     if ( d3.event.y > 0 && d3.event.y < settings.boardY ) {
//         player.style.top = pixelize(d3.event.y);
//     }
//     if ( d3.event.x > 0 && d3.event.x < settings.boardX ) {
//         player.style.left = pixelize(d3.event.x);
//     }
// });

var asteroids = board.selectAll('.asteroid')
  .data(d3.range(settings.numAsteroids))
  .enter().append('div')
  .attr('class', 'asteroid')
  .style({
    top: pixelize(randomPosition(settings.boardY)),
    left: pixelize(randomPosition(settings.boardX))
  });

var move = function(element) {
  element
    .transition()
    .duration(settings.duration)
    .style({
      top: pixelize(randomPosition(settings.boardY)),
      left: pixelize(randomPosition(settings.boardX))
    }).each('end', function(){
      move(d3.select(this));
    });
};
move(asteroids);

var scoreTicker = function() {
  gameStats.score = gameStats.score + 1;
  gameStats.highScore = Math.max(gameStats.score, gameStats.highScore);
  updateScore();
};
setInterval(scoreTicker, 100);

var prevCollision = false;

var detectCollision = function(){
  var collision = false;

  asteroids.each(function(){
    var asteroidX = parseInt(this.style.left);
    var asteroidY = parseInt(this.style.top);

    if ( mouseLeft > asteroidX - settings.playerWidth &&
          mouseLeft < asteroidX + settings.asteroidDimension &&
          mouseTop > asteroidY - settings.playerHeight &&
          mouseTop < asteroidY + settings.asteroidDimension ) {
      console.log('COLLISION');
      collision = true;
    }
  });

  if (collision) {
    gameStats.score = 0;
    d3.select('.player').style.border = 'thin solid yellow';
    if ( prevCollision != collision ) {
      gameStats.collisions = gameStats.collisions + 1;
    }
  } else {
    d3.select('.player').style.border = 'thin solid red';
  }
  prevCollision = collision;
};

d3.timer(detectCollision);

