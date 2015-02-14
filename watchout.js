// start slingin' some d3 here.


var boardY = 500;
var boardX = 750;
var numEnemies = 2;
var asteroidDimension = 20;
var playerHeight = 37.5;
var playerWidth = 50;
var gameStats = {
  score: 0;
  highScore: 0;
  collisions: 0;
};

var updateEnemies = function(numEnemies) {
  var result = [];

  for ( var i = 0; i < numEnemies; i++ ) {
    var enemy = {
      id: i,
      top: randomPosition(boardY),
      left: randomPosition(boardX)
    };

    result.push(enemy);
  }

  return result;
};

var randomPosition = function(limit) {
  return Math.floor(Math.random() * limit);
};

var resetScore = function() {
  // reset the score
  // check against high score
};

// init player in middle of board
var player = [{
  id: player,
  top: boardY / 2,
  left: boardX / 2
}]

var enemies = updateEnemies(numEnemies);
var asteroids = d3.select('.gameboard').selectAll('.asteroid').data(enemies);
var spaceship = d3.select('.gameboard').selectAll('.player').data(player);

var drag = d3.behavior.drag()
  .on('drag', function() {
    if ( d3.event.y > 0 && d3.event.y < boardY ) {
        spaceship
          // .attr('top', d3.event.y)
          .style({
            top: function(){ return d3.event.y + 'px'}
          });
    }
    if ( d3.event.x > 0 && d3.event.x < boardX ) {
        spaceship
          // .attr('left', d3.event.x)
          .style({
            left: function(){ return d3.event.x + 'px'}
          });
    }
});

// place asteroids (ENTER)
asteroids
  .enter()
  .append('div')
  .style({
    top: function(d){
      return d.top + 'px';
    },
    left: function(d){
      return d.left + 'px';
    }
  })
  .attr('class', 'asteroid');

// make them move (TRANSITION)
setInterval(function(){
  asteroids
    .transition()
    .duration(2000)
    .style({
      top: function(d){
        return randomPosition(boardY) + 'px';
      },
      left: function(d){
        return randomPosition(boardX) + 'px';
      }
  });
}, 2000);

// place spaceship
spaceship
  .enter()
  .append('div')
  .style({
    top: function(d){
      return d.top + 'px';
    },
    left: function(d){
      return d.left + 'px';
    }
  })
  .attr('class', 'player')
  .call(drag);

// check for collision
  // this is an iterator
  // compare  height of our asteroid to the height of ship
  // compare width, too
  // find length of the hypotenuse of these
  // (square root of x*x + y*y)
  // if the length = < radius of spaceship, then collision


setInterval(function(){
  var asteroidDivs = document.getElementsByClassName('asteroid');
  var playerDiv = document.getElementsByClassName('player');
  // increment score counter

  for ( var i = 0; i < asteroidDivs.length; i++) {
    // console.log('i' + i);
    var asteroidX = parseInt(asteroidDivs[i].style.left);
    var asteroidY = parseInt(asteroidDivs[i].style.top);
    var playerX = parseInt(playerDiv[0].style.left);
    var playerY = parseInt(playerDiv[0].style.top);

    if ( playerX > asteroidX - playerWidth &&
          playerX < asteroidX + asteroidDimension &&
          playerY > asteroidY - playerHeight &&
          playerY < asteroidY + asteroidDimension ) {
      playerDiv[0].style.border = "thin solid yellow";
      console.log('collision with:  ' + i);

      // call reset score fn

    } else {
      playerDiv[0].style.border = "thin solid red";
    }
  }
}, 100);

