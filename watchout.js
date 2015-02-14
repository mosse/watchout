// start slingin' some d3 here.



// for asteroids n, generate an array
// for each i until n - 1, push random tuples
var initPositions = function(n) {
  var array = [];

  for ( var i = 0; i < n; i++ ) {
    var enemy = {
      id: i,
      top: randomPosition(),
      left: randomPosition()
    };

    array.push(enemy);
  }

  return array;
};

var randomPosition = function() {
  return Math.floor(Math.random() * 100);
};

var positions = initPositions(1);

// place asteroids (ENTER)
d3.select('.gameboard')
  .selectAll('.asteroid')
  .data(positions)
  .enter()
  .append('div')
  .style('top', function(d){
    return d.top + '%';
  })
  .style('left', function(d){
    return d.left + '%';
  })
  .attr('class', 'asteroid');

// make them move
d3.selectAll('.asteroid')
  // .data(positions)
  .transition()
  .delay(2000)
  .duration(2000)
  .style('top', '0')
  .style('left', '0');


  // selection.style('top', function(d){ return randomPosition(); })
