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
    // .delay(2000)
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
  .attr('class', 'player');

  // selection.style('top', function(d){ return randomPosition(); })
