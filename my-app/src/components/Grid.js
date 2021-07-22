import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import { render } from 'react-dom';

class Grid extends Component {
    // renderTile() {
    //     for(var i = 0; i < 9; i++){
    //         return <Tile/>;
    //     }
    // }

    render() {
        return (
            <div className="grid">
                {/* {this.renderTile()} */}
                <div className="grid-row">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
                <div className="grid-row">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
                <div className="grid-row">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
            </div>
        );
    }
}

export default Grid;