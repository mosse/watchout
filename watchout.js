// start slingin' some d3 here.


var height = 500;
var width = 750;
var numEnemies = 30;

var updateEnemies = function(numEnemies) {
  var result = [];

  for ( var i = 0; i < numEnemies; i++ ) {
    var enemy = {
      id: i,
      top: randomPosition(height),
      left: randomPosition(width)
    };

    result.push(enemy);
  }

  return result;
};

var randomPosition = function(limit) {
  return Math.floor(Math.random() * limit);
};

var player = [{
  id: player,
  top: height / 2,
  left: width / 2
}]

var enemies = updateEnemies(numEnemies);
var asteroids = d3.select('.gameboard').selectAll('.asteroid').data(enemies);

var spaceship = d3.select('.gameboard').selectAll('.player').data(player);

var drag = d3.behavior.drag()
  .on('drag', function() {
    if ( d3.event.y > 0 && d3.event.y < height ) {
        spaceship
          .style({
            top: function(){ return d3.event.y + 'px'},
          })
    }
    if ( d3.event.x > 0 && d3.event.x < width ) {
        spaceship
          .style({
            left: function(){ return d3.event.x + 'px'}
          })
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
        return randomPosition(height) + 'px';
      },
      left: function(d){
        return randomPosition(width) + 'px';
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
  // for our asteroids
  // check position bounding box against spaceship box
  // if position + width > position of ship
  //
  // if x + width > target.x || x > target.x + target.width
  // AND
  // if y + width > target.y || y > target.y + target.width
  //
  var asteroidDivs = document.getElementsByClassName('asteroid');
  var playerDiv = document.getElementsByClassName('player');
  for ( var = i; i < asteroidDivs.length; i++) {

  }
}, 200);

