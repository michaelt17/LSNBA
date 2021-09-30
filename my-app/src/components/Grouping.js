import React, { Component } from 'react';
import { Link } from 'react-dom';
import { render } from 'react-dom';
import Papa from 'papaparse'
import * as d3 from 'd3';

class Grouping extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          pageNum: 0
        };

        this.colors = {
          0:"#d62728",
          1:"#ff7f0e",
          2:"#2ca02c",
          3:"#e377c2",
          4:"#9467bd",
          5:"#8c564b",
          6:"#1f77b4"
        }

    }

    componentDidMount() {
      this.addOnHovers();
    }

    changePage(type) {
      this.setState(prevState => {
        console.log(type, this.state.pageNum*10,this.props.data.length);
        if(type == 'add' && (this.state.pageNum+1)*10 < this.props.data.length){
          console.log("hi")
          return {pageNum : prevState.pageNum + 1};
        } else{
          if (type == 'sub' && this.state.pageNum > 0) {
            return {pageNum : prevState.pageNum - 1};
          }
        }
      });
    }

    convertNameToURL(name){
      // console.log(name.split(" "));
      let splitArr = name.split(" ");
      let urlStr = "";

      if (splitArr[1].length <= 5){
        urlStr += splitArr[1];
      } else{
        urlStr += splitArr[1].slice(0,5);
      }

      urlStr += splitArr[0].slice(0,2);
      urlStr = urlStr.toLowerCase();

      return "https://www.basketball-reference.com/players/" + splitArr[1][0].toLowerCase() + "/" + urlStr + "01.html";
    }

    showSimilarPlayers = function(mEvent,d) {
      // console.log(mEvent['srcElement']["innerText"])
      d3.selectAll("circle")
        .transition()
        .duration(200)
        .style("opacity", .1)
      d3.selectAll("circle")
        .filter(function(d,i){
          return d["name"] == mEvent['srcElement']["innerText"];
        })
        .transition()
        .duration(200)
        .style("opacity", 1)
        .attr("r",10)
        
    }
    hideSimilarPlayers = function(d) {
      d3.selectAll("circle")
        .transition()
        .duration(200)
        .style("opacity", 1)
        .attr("r",3)
      // console.log(d)
      // tooltip
      //   .style("opacity", 0)
      //   .style("left", 0 + "px")
      //   .style("top", 0 + "px");
    }

    addOnHovers(){
      console.log("Hello")
      d3.selectAll(".player-list-item")
        .on("mouseover",this.showSimilarPlayers)
        .on("mouseleave",this.hideSimilarPlayers )
    }

    render() {
        return (
          <div className="grouping" id={"grouping-"+this.props.grouping} > 
            <h2 className="groupHeader" style={{color: this.colors[this.props.grouping]}}>Group {this.props.grouping}</h2>
              <ul className="player-list" style={{height: "320px", marginTop:"-20px"}}>
                {this.props.data.slice(this.state.pageNum*10,9+this.state.pageNum*10).map(playerData => (
                  <p key={playerData["name"]} className="player-list-item"> 
                    <a href={this.convertNameToURL(playerData["name"])}>{playerData["name"]}</a>
                  </p>
                ))}
              </ul>
              <div>
                <button onClick={this.changePage.bind(this, 'sub')}>Prev</button>
                <button onClick={this.changePage.bind(this, 'add')}>Next</button>
              </div>
          </div>
          
        );
      }
}

export default Grouping