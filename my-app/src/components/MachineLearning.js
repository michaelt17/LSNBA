import React, { Component } from 'react';
import { render } from 'react-dom';
import Papa from 'papaparse'
import LABELEDDATA from '../nba_csv/labeled_data.csv'
import NBAPLAYERS from '../nba_csv/NBAPlayers.csv'
import Grouping from './Grouping';
import NBAClusterGraph from './NBAClusterGraph';
import * as d3 from 'd3';
import SimilarPlayers from './SimilarPlayers';

class MachineLearning extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          clusterXAxis: "GP",
          clusterYAxis: "PTS",
          selectedPlayer: "",
          myComponents: [],
          playerArr: [],
          playerDict: {
            0:[],
            1:[],
            2:[],
            3:[],
            4:[],
            5:[],
            6:[]}
        };

        this.labeledData = [];

        this.Features = ["GP","MIN","PTS","FGM","FGA","FG%","3PM","3PA","3P%","FTM","FTA","FT%","OREB","DREB","REB","AST","STL", "BLK","TOV","EFG%","TS%"]
    
        this.processData = this.processData.bind(this);
    }

    componentDidMount() {
      this.getData(this.processData);
    }

    getData(callback){
      let files = [LABELEDDATA,NBAPLAYERS];
      let allResults = [];
      for (var i = 0; i < files.length; i++) {
         Papa.parse(files[i], {
          download: true,
          complete: function (results) {
            allResults.push(results);
            if (allResults.length == files.length){
              callback(allResults);
            }
          }
        })
      }
    }

    buttonFunction() {
      let sel = d3.select("#submitText")
      console.log(sel);
    }

    processData(data){
      let playerArr = [];
      let playerDict = {
        0:[],
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
        6:[]
      };

      let labeledData = data[0].data;
      this.labeledData = labeledData;
      let playerData = data[1].data;

      for (var player in data[0].data){
        if (player == 0 || player == data[0].length){
          continue;
        }

        let name = playerData[player][0];
        let playerStats = playerData[player].slice(1);
        let tempDict = {};

        tempDict["name"] = name;
        tempDict["playerStats"] = playerStats;

        playerDict[labeledData[player][6]].push(tempDict);

        tempDict["label"] = labeledData[player][6];
        playerArr.push(tempDict);
      }

      this.setState({playerArr : playerArr});
      this.setState({playerDict : playerDict});

      let myComponents = [];
      for (let i = 0; i < 7; i ++){
        if(this.state.playerDict[0].length != 0){
          myComponents.push(<Grouping grouping={i} data={this.state.playerDict[i]}/>)
        }
        else{
          myComponents.push(null);
        }
      }

      this.setState({myComponents : myComponents});

      var stateHolder = this;

      let xDefault = "GP";
      let yDefault = "PTS"

      d3.select("#xAxisSelector")
        .selectAll('options')
        .data(this.Features)
        .on("change",function(d){
          let selection = d3.select(this).property("value");
          console.log(selection);
          this.setState({clusterXAxis:selection});
        })
        .enter()
          .append('option')
          .text(function(d){return d})
          .attr("value",function(d){return d})

      d3.select("#xAxisSelector").on("change",function(d){
        let selection = d3.select(this).property("value");
        // console.log(selection);
        stateHolder.setState({clusterXAxis:selection});
      })

      d3.select("#yAxisSelector")
      .selectAll('options')
      .data(this.Features)
      .enter()
        .append('option')
        .text(function(d){return d})
        .attr("value",function(d){return d})
      d3.select("#yAxisSelector").on("change",function(d){
        let selection = d3.select(this).property("value");
        stateHolder.setState({clusterYAxis:selection});
      })

      // console.log(playerArr)

      d3.select("#submitText")
        .selectAll('options')
        .data(playerArr)
        .enter()
          .append('option')
          .text(function(d){return d['name']})
          .attr("value",function(d){return d['name']});
      d3.select("#submitText").on("change",function(d){
        let selection = d3.select(this).property("value");
        stateHolder.setState({selectedPlayer:selection});
      });
    }

    render() {
      let cluster;
      if (this.state.playerArr.length == 0){
        cluster = null;
      } else {
        cluster = <NBAClusterGraph data={this.state.playerArr} clusterXAxis={this.state.clusterXAxis} clusterYAxis={this.state.clusterYAxis} labelArr={[0,1,2,3,4,5,6]}/>
      }

        return (
          <div>
            <div className="d3GraphHolder" style={{display:"flex",flexWrap:"wrap",justifyContent: "space-evenly"}}>
              {cluster}
              <div className="textHolder" style={{width:"600px"}}>
                <h1>The Write Up</h1>
                <p>For my project, I took the 740 NBA players that have logged more than 15,000 career minutes and ran them through a clustering algorithm to reach 7 different groupings</p>
                <p>There were 21 different career long features that helped the model train. Feel free to select the X and Y Axes below in order to view how different groups are correlated by different statistics!</p>
                <p>Each player also links to their Basketball Reference Page if you'd like to look into their career further!</p>
                <p>Using the submit button below, you can type in your favorite players, and I will output the 5 players that have a closest career to that player! Try it out</p>
                <div className="selectHolder">
                  <label htmlFor="xAxisSelector">X Axis:   </label>
                  <select id="xAxisSelector"></select>

                  <label htmlFor="yAxisSelector" style={{paddingLeft:"15px"}}>Y Axis: </label>
                  <select id="yAxisSelector"></select>
                </div>
              </div>
            </div>
            <div className="playerGroupingsHolder" style={{display:"flex",flexWrap:"wrap",justifyContent: "space-evenly"}}>
              <div className="playerGroupings" style={{display:"flex",flexWrap:"wrap",justifyContent: "space-evenly"}}>
                {this.state.myComponents[0]}
                {this.state.myComponents[1]}
                {this.state.myComponents[2]}
                {this.state.myComponents[3]}
                {this.state.myComponents[4]}
                {this.state.myComponents[5]}
                {this.state.myComponents[6]}
              </div>
              <div className="formHolder">
                    <label htmlFor="submitText">Please Select a Player: </label>
                      <select id="submitText"></select>
                    <SimilarPlayers playerArray={this.state.playerArr} labeledData={this.labeledData} selectedPlayer={this.state.selectedPlayer}/>
              </div>
              
            </div>
          </div>
        );
      }
}

export default MachineLearning