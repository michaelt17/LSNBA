import React, { Component } from 'react';
import { render } from 'react-dom';
import Papa from 'papaparse'
import LABELEDDATA from '../nba_csv/labeled_data.csv'
import NBAPLAYERS from '../nba_csv/NBAPlayers.csv'
import Grouping from './Grouping';

class MachineLearning extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };

        this.playerDict = {
          0:[],
          1:[],
          2:[],
          3:[],
          4:[],
          5:[],
          6:[]
        };
    
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

    processData(data){
      let labeledData = data[0].data;
      let playerData = data[1].data;
      console.log(data[0].data)

      for (var player in data[0].data){
        if (player == 0 || player == data[0].length){
          continue;
        }

        let name = playerData[player][0];
        let playerStats = playerData[player].slice(1);
        let tempDict = {};

        tempDict[name] = playerStats;

        console.log(tempDict);

        this.playerDict[labeledData[player][6]].push(tempDict);
      }

      console.log(this.playerDict);
    }

    render() {
        return (
          <div className="machineLearning">
              <Grouping grouping={0}/>
              <Grouping grouping={1}/>
              <Grouping grouping={2}/>
              <Grouping grouping={3}/>
              <Grouping grouping={4}/>
              <Grouping grouping={5}/>
              <Grouping grouping={6}/>
          </div>
        );
      }
}

export default MachineLearning