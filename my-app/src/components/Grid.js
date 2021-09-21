import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import { render } from 'react-dom';

let funInfo = [
    {
        value: "Family",
        question: "My Dad was born and raised in which Latin American Country?",
        answers:[["A) Argentina","false"],["B) Panama","false"],["C) Mexico","true"]]
    },
    {
        value: "Travel",
        question: "How Many US states have I been to?",
        answers:[["A) 8","false"],["B) 25","true"],["C) 45","false"]]
    },
    {
        value: "Sports",
        question: "My vertical jump at my peak was approximately how many inches?",
        answers:[["A) 32","false"],["B) 36","false"],["C) 40","true"]]
    },
    {
        value: "Family",
        question: "Both of my grandmothers were what profession?",
        answers:[["A) Artists","true"],["B) Real estate agents","false"],["C) Writers","false"]]
    },
    {
        value: "Travel",
        question: "What US State do I believe is the most overrated?",
        answers:[["A) New York","false"],["B) California","false"],["C) Hawaii","true"]]
    },
    {
        value: "School",
        question: "My least favorite school subject growing up was?",
        answers:[["A) English","true"],["B) History","false"],["C) Gym","false"]]
    },
    {
        value: "Family",
        question: "How do you spell my mom's unusual name (pronounced like Elise)?",
        answers:[["A) Ilyce","true"],["B) Ileece","false"],["C) Elysse","false"]]
    },
    {
        value: "Travel",
        question: "What is my favorite trip that I've ever taken?",
        answers:[["A) Japan & South Korea","true"],["B) Italy & Greece","false"],["C) Southern Africa","false"]]
    },
    {
        value: "Food",
        question: "What is my go to weeknight meal to make for myself?",
        answers:[["A) Budaejjigae","false"],["B) Thai Curry","true"],["C) Pizza","false"]]
    }
];

class Grid extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          score: '0'
        };
    }

    handleUpdateScore = (num) => {
        this.setState({
            score: Number(this.state.score) + num
        });
    }

    render() {
        return (
            <div>
                <div className="grid">
                    {funInfo.map(tidbit => <Tile handleUpdateScore={this.handleUpdateScore} tidbit={tidbit}/>)}
                    <div id="scoreHolder">
                        Your score is: {this.state.score}
                    </div>
                </div>
            </div>
        );
    }
}

export default Grid;