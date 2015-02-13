// start slingin' some d3 here.

var asteroids = [[25, 55], [50, 33], [75, 77]];

// generate n asteroids, each with tuple of
// random position top,left

// place dots
d3.select('body')
  .selectAll('.asteroid')
  .data(asteroids)
  .enter()
  .append('div')
  .style('top', function(d){
    return d[0] + '%';
  })
  .style('left', function(d){
    return d[1] + '%';
  })
  .attr('class', 'asteroid');

// d3.select('.asteroids');
