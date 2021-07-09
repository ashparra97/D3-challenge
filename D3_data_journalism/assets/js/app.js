// Set up chart 

var svgWidth = 960; 
var svgHeight = 500; 

var margin = {
    top: 20, 
    right: 40, 
    bottom: 60, 
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG wrapper 

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from csv 

d3.csv("data.csv").then(function(healthData) {

   
    console.log(healthData);


});




