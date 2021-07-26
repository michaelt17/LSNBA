// code adapted from https://medium.com/@daniela.sandoval/creating-a-popup-window-using-js-and-react-4c4bd125da57

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PopUp from "./PopUp";

class Tile extends Component {
    state = {
        seen: false
      };
    
      togglePop = () => {
        this.setState({
          seen: !this.state.seen
        });
      };
      
    render(){
        return (
            <div>
                <button className="tile" onClick={() => this.togglePop()}>
                    {this.props.tidbit.value}
                </button>
                {this.state.seen ? <PopUp funInfo={{question:this.props.tidbit.question,
                                                    answers:this.props.tidbit.answers}} toggle={this.togglePop} /> : null}
            </div>
        );
    }
}

export default Tile;