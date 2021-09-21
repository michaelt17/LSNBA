// code adapted from https://medium.com/@daniela.sandoval/creating-a-popup-window-using-js-and-react-4c4bd125da57

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PopUp from "./PopUp";

class Tile extends Component {
    state = {
        seen: false,
        className: "tile beforeGuess"
      };
    
      togglePop = () => {
        this.setState({
          seen: !this.state.seen
        });
      };

    handleUpdateTile = (newClass) => {
        this.setState({
            className: newClass
        });
    }
      
    render(){
        return (
            <div>
                <button className={this.state.className} onClick={() => this.togglePop()}>
                    {this.props.tidbit.value}
                </button>
                {this.state.seen ? <PopUp handleUpdateTile={this.handleUpdateTile}
                                          handleUpdateScore={this.props.handleUpdateScore}
                                          funInfo={{question:this.props.tidbit.question,
                                                    answers:this.props.tidbit.answers}} 
                                          toggle={this.togglePop} /> : null}
            </div>
        );
    }
}

export default Tile;