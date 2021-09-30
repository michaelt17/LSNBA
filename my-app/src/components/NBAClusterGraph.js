import React, { Component } from 'react';
import * as d3 from 'd3';

class NBAClusterGraph extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          
        };

        this.margin = 100;
        this.width = 800;
        this.height = 400;

// GP,MIN,PTS,FGM,FGA,FG%,3PM,3PA,3P%,FTM,FTA,FT%,OREB,DREB,REB,AST,STL,BLK,TOV,EFG%,TS%
        this.Features = {
          "GP": 0,
          "MIN": 1,
          "PTS": 2,
          "FGM": 3,
          "FGA": 4,
          "FG%": 5,
          "3PM": 6,
          "3PA": 7,
          "3P%": 8,
          "FTM": 9,
          "FTA": 10,
          "FT%": 11,
          "OREB": 12,
          "DREB": 13,
          "REB": 14,
          "AST": 15,
          "STL": 16,
          "BLK": 17,
          "TOV": 18,
          "EFG%": 19,
          "TS%": 20,
        }
    }

    componentDidMount() {
      if (document.getElementById('svg') === null && this.props.data != []){
          this.drawChart();
      }
    }

    componentDidUpdate(prevProps){
      if (this.props.clusterXAxis !== prevProps.clusterXAxis) {
        this.updateChart('x');
      } else if (this.props.clusterYAxis !== prevProps.clusterYAxis) {
        this.updateChart('y');
      }

    }

    ToolTipText = (d) => {
      return "<b>"+ d['name'] + "</b> <br/>"+ this.props.clusterXAxis + ": " + d['playerStats'][this.Features[this.props.clusterXAxis]] + "<br/>" + this.props.clusterYAxis + ": " + d['playerStats'][this.Features[this.props.clusterYAxis]];
    }

    drawChart(){
      let xValHolder = this.Features[this.props.clusterXAxis];
      let yValHolder = this.Features[this.props.clusterYAxis];
      
      let toolTipTextFunction = this.ToolTipText;
      
      let NBAX = d3.scaleLinear().range([this.margin/2,this.width-this.margin/2]);
      let NBAXAxis = d3.axisBottom().scale(NBAX);
      let NBAY = d3.scaleLinear().range([this.height, this.margin/2]);
      let NBAYAxis = d3.axisLeft().scale(NBAY);

      // console.log(this.props.data)
      let svg = d3.select("#d3Graph").append("svg").attr("width", this.width).attr("height", this.height*1.1).attr("id","svg");

      let tooltip = d3.select("#d3Graph").append("div").attr("class","tooltip").style("opacity",0).style("position","absolute");

      var showTooltip = function(mEvent,d) {
        // console.log(mEvent)
        tooltip
          .style("opacity", 1)
          .html(toolTipTextFunction(d))
          .style("left", mEvent['x']+ "px")
          .style("top", mEvent['y']+ "px")
          .style("border","solid black 1px")
          .style("background-color","white");
      }
      var moveTooltip = function(mEvent,d) {
        tooltip
          .style("left", (mEvent['x'] + 15) + "px")
          .style("top", (mEvent['y'] - 15) + "px");
      }
      var hideTooltip = function(d) {
        tooltip
          .style("opacity", 0)
          .style("left", 0 + "px")
          .style("top", 0 + "px");
      }
        

      svg.append("g")
        .attr("transform", "translate(" + 0 + "," + (this.height) + ")")
        .attr("class","myXaxis")
      svg.append("g")
        .attr("class","myYaxis")
        .attr("transform", "translate(" + this.margin/2 + "," + 0 +")")

      //  X axis:
      NBAX.domain([400,1600]);
      svg.selectAll(".myXaxis")
        .transition()
        .call(NBAXAxis);
      // Y axis
      NBAY.domain([0, 40000]);
      svg.selectAll(".myYaxis")
        .transition()
        .call(NBAYAxis);

      let colVal = function(d){return d['label']};
      let color = d3.scaleOrdinal(d3.schemeCategory10);

      let removeComma = function(d){return d.replace(',','');}

      // console.log(colVal);
      // console.log(color.domain());

      svg.selectAll("circle")
        .data(this.props.data)
        .enter()
        .append("circle")
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )
        .attr("class",function(d){return "dot"+d['label']})
        .attr("r",3)
        .attr("cx", function(d){return NBAX(removeComma(d['playerStats'][xValHolder] ))})
        .attr("cy", function(d){return NBAY(removeComma(d['playerStats'][yValHolder] ))})
        .style("fill", function(d) {return color(colVal(d))})

      let cDomain = color.domain().sort();

      let legend= svg.selectAll(".legend")
        .data(cDomain)
      .enter().append("g")
        .attr("class","legend")
        .attr("id",function(d,i) {return "legend-"+i})
        .attr("transform",function(d,i) {return "translate(0,"+i*20 + ")"; });

      legend.append("rect")
        .attr("x",this.width - 16)
        .attr("width",16)
        .attr("height",16)
        .style("fill", color);
      
      legend.append("text")
        .attr("x",this.width - 22)
        .attr("y",7)
        .attr("dy",".45em")
        .attr("text-anchor","end")
        .text(function(d) {return d});
      
      legend.on("mouseover", function(mEvent,d) {
        d3.selectAll(".legend")
          .style("opacity",.1);
        d3.select(this)
          .style("opacity",1);
        d3.selectAll("circle")
          .style("opacity", .1)
        d3.selectAll(".dot"+d)
          .style("opacity",1);
      })
      .on("mouseout", function(mEvent,d) {
        d3.selectAll(".legend")
          .style("opacity", 1);
        d3.selectAll("circle")
          .style("opacity", 1)
      });
        
    }

    updateChart(val){
      let removeComma = function(d){return Number(d.replace(',',''));}
      
      let xValHolder = this.Features[this.props.clusterXAxis];
      let yValHolder = this.Features[this.props.clusterYAxis];

      let svg = d3.select("#svg");
      // let circles = svg.select("circle");
      let circles = svg.selectAll("circle");

      let tooltip=d3.select(".tooltip");
      // console.log(tooltip);

      if(this.props.data){
        // console.log(this.props.data);
        if (val == 'x'){
          let NBAX = d3.scaleLinear().range([this.margin/2,this.width-this.margin/2]);
          let NBAXAxis = d3.axisBottom().scale(NBAX);
          NBAX.domain([
            d3.min(this.props.data, d => removeComma(d['playerStats'][xValHolder])),
            d3.max(this.props.data, d => removeComma(d['playerStats'][xValHolder]))
        ]);
        svg.selectAll(".myXaxis")
          .transition()
          .call(NBAXAxis);
        let transition1 = circles.transition()
          .duration(300)
          .attr("cx", function(d){return NBAX(removeComma(d['playerStats'][xValHolder]))});
        } else {
          let NBAY = d3.scaleLinear().range([this.height, this.margin/2]);
          let NBAYAxis = d3.axisLeft().scale(NBAY);
          NBAY.domain([
            d3.min(this.props.data, d => removeComma(d['playerStats'][yValHolder])),
            d3.max(this.props.data, d => removeComma(d['playerStats'][yValHolder]))
        ]);
        svg.selectAll(".myYaxis")
          .transition()
          .call(NBAYAxis);
        let transition1 = circles.transition()
          .duration(300)
          .attr("cy", function(d){return NBAY(removeComma(d['playerStats'][yValHolder]))})
        }
      }
    }
    render() {
        return (
          <div id="d3Graph">
          </div>
        );
      }
}

export default NBAClusterGraph