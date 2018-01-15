//var mincompany_code = d3.min(company, d => d.company_code);
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;




//var width = 400;
//var height = 400;



//var maxcompany_code =d3.max(company, d => d.company_code);

//sampling out the data which doesn't have the min_company_code -- for now -- for initial screen



var path = d3.arc()
             .outerRadius(width / 2 - 10)
             .innerRadius(width / 4); 


d3.select('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')
    .classed('chart', true);

var company_codeData = company.filter(d => d.company_code === 1);
var health = company_codeData[0]['health_safety'];
var parameters = [health, 5 - health];
var parameters2 = [4,1];

var arcs = d3.pie()(parameters);

var path = d3.arc()
             .outerRadius(width / 2 - 10)
             .innerRadius(width / 3);

 d3.select('svg')
    .append('text')
    .classed('title', true)
    .text(health)
    .attr('x',width/2)
    .attr('y', width/1.5)
    .style('text-anchor','middle')
    .style('font-size', '5em'); 

d3.select('svg')
    .append('text')
    .classed('title', true)
    .text("Health")
    .attr('x',width/2)
    .attr('y',height/15)
    .style('text-anchor','middle')
    .style('font-size', '2.3em'); 

d3.select('.chart')
      .selectAll('.arc')
      .data(arcs)
      .enter()
      .append('path')
        .classed('arc', true)
        .attr('fill', function(d, i){
          return data[i].color;
        })
        .attr('stroke', 'black')
        .attr('stroke-width', '1.5')
        .attr('d', path);

















