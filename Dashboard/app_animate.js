var mincompany_code = d3.min(company, d => d.company_code);
var width = 400;
var height = 400;
var maxcompany_code =d3.max(company, d => d.company_code);

//sampling out the data which doesn't have the min_company_code -- for now -- for initial screen




  var path = d3.arc()
             .outerRadius(width / 2 - 10)
             .innerRadius(width / 4); 



var companies = ['health_safety', 'wages', 'recommended'];


//each parameter gets a different colour

var colorScale = d3.scaleOrdinal()
                   .domain(companies)
                   .range(['blue','black','green']);


var tooltip = d3.select("body")
                .append("div")
                .classed("tooltip", true);


d3.select('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')
    .classed('chart', true);



d3.select('input')
  .property('min', mincompany_code)
  .property('max', maxcompany_code)
  .property('value', mincompany_code)
  .on('input', function(){
    makeGraph(+d3.event.target.value);
  });  

  d3.select('svg')
    .append('text')
    .classed('title', true)
    .text("Company " + mincompany_code)
    .attr('x',width/8)
    .attr('y', 30)
    .style('text-anchor','middle')
    .style('font-size', '1.3em');  



makeGraph(mincompany_code);


function makeGraph(code){
  var company_codeData = company.filter(d => d.company_code === code);
  var parameters = [company_codeData[0]['health_safety'], company_codeData[0]['wages'], company_codeData[0]['recommended']];
  var companies = ['Health & Safety', 'Wages', 'Recommended'];

  var arcs = d3.pie()(parameters);  

  var path = d3.arc()
             .outerRadius(width / 2 - 10)
             .innerRadius(width / 4);

  var update = d3.select('.chart')
                  .selectAll('.arc')
                  .data(arcs);
  

  update
    .exit()
    .remove();

  update
    .enter()
    .append('path')
      .classed('arc', true)
    .merge(update)
      .attr('fill', function(d, i){
        return data[i].color;
      })
      .attr('stroke', 'black')
      .attr('d', path)
    .transition()
    .ease(d3.easeLinear)
    .duration(550)
    .attrTween('d', pieTween2)
    .on("start", function(){
      d3.select('.title')
        .text(company[code-1]['company_name'])
    });

  update
  .enter()
    .append('path')
      .classed('arc', true)
    .merge(update)
      .attr('fill', function(d, i){
        return data[i].color;
      })
      .attr('stroke', 'black')
      .attr('d', path)
      .on("mousemove", function(d, i){
      tooltip
        .style("opacity", 1)
        .style("left", d3.event.x + "px")
        .style("top", d3.event.y + "px")
        .text(companies[i]);

    })
    .on("mouseout", function(){
      tooltip
        .style("opacity", 0);
    });
}





function pieTween(b){
  b.innerRadius=0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) {return path(i(t));};
}

function pieTween2(b){
  
  var i = d3.interpolate(b.startAngle+0.1, b.endAngle);
   return function(t) {
       b.endAngle = i(t);
     return path(b);
   }
}














