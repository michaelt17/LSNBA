import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import { render } from 'react-dom';

let funInfo = [
    {
        value: "Family",
        question: "My Dad was born and raised in which Latin American Country?",
        answers:["A) Argentina","B) Panama","C) Mexico"]
    },
    {
        value: "Travel",
        question: "How Many US states have I been to?",
        answers:["A) 8","B) 25","C) 45"]
    },
    {
        value: "Sports",
        question: "My vertical jump at my peak was approximately how many inches?",
        answers:["A) 32","B) 36","C) 40"]
    },
    {
        value: "Family",
        question: "Both of my grandmothers were what profession?",
        answers:["A) Artists","B) Real estate agents","C) Writers"]
    },
    {
        value: "Travel",
        question: "What US State do I believe is the most overrated?",
        answers:["A) New York","B) California","C) Hawaii"]
    },
    {
        value: "School",
        question: "My least favorite school subject growing up was?",
        answers:["A) English","B) History","C) Gym"]
    },
    {
        value: "Family",
        question: "How do you spell my mom's unusual name (pronounced like Elise)?",
        answers:["A) Ilyce","B) Ileece","C) Elysse"]
    },
    {
        value: "Travel",
        question: "What is my favorite trip that I've ever taken?",
        answers:["A) Japan & South Korea","B) Italy & Greece","C) Southern Africa"]
    },
    {
        value: "Food",
        question: "What is my go to weeknight meal to make for myself?",
        answers:["A) Buddaejjigae","B) Thai Curry","C) Pizza"]
    }
];

class Grid extends Component {

    render() {
        return (
            <div className="grid">
                {funInfo.map(tidbit => <Tile tidbit={tidbit}/>)}
                {/* {this.renderTile()} */}
                {/* <Tile funInfo={} value="Family"/>
                <Tile value="Travel"/>
                <Tile value="Fun"/>
                <Tile value="Family"/>
                <Tile value="Travel"/>
                <Tile value="Fun"/>
                <Tile value="Family"/>
                <Tile value="Travel"/>
                <Tile value="Fun"/> */}
            </div>
        );
    }
}

export default Grid;