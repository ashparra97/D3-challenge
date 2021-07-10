// The relationship between poverty and obesity 

// Set up chart

var svgWidth = 960; 
var svgHeight = 500; 

var margin = {
    top: 20, 
    right: 40, 
    bottom: 60, 
    left: 80
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

d3.csv("assets/data/data.csv").then(function(healthData) {
    // Step 1: See if data is printing well in console log
    console.log(healthData);

    // Step 2: Parse the data 
    healthData.forEach(function(data){
        data.poverty = +data.poverty; 
        data.obesity = +data.obesity;
    });

    // Step 3: Create scales 
    // x-axis (poverty)
    var xLinearScale1 = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.poverty)])
        .range([0, width]);

    // y-axis (poverty)
    var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.obesity)])
    .range([height, 0]);

    // Step 4: Create axes
    var bottomAxis = d3.axisBottom(xLinearScale1);
    
    var leftAxis = d3.axisLeft(yLinearScale1);

    // Step 5: Append axes to chartGroup
    // Add styling to x-axis
    chartGroup.append('g')
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Add styling to x-axis
    chartGroup.append('g')
        .call(leftAxis);

    // Step 6: Add circles 
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale1(d.poverty))
        .attr("cy", d => yLinearScale1(d.obesity))
        .attr("r", "20")
        .attr("fill", "teal");


    // Add State abbreviations to circles
    svg.append("g")
        .selectAll("circle")
        .data(healthData)
        .enter()
        .append("text")
        //.merge(circlesGroup)
        .text(function(d) {
        return d.abbr
        })
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("dx", (d) => {return xLinearScale1(d.poverty)})
        .attr("dy", (d) => {return yLinearScale1(d.obesity)})
        .attr("font-size", "10px")
        .attr("class", "stateText");



    // x-axis Label
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .text("Poverty Rate (%)");
    
     // y-axis Label
    chartGroup.append("text")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("x", -160)
        .attr("dy", "1em")
        .attr("fill", "black")
        .attr("font-size", "16px")
        .attr("transform", "rotate(-90)")
        .text("Obesity Rate(%)");

});






