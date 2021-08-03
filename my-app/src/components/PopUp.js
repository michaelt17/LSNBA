import React, { Component } from "react";
import Answer from './Answer.js';

class PopUp extends Component {

  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <div className="questionHolder">
            <p className="question">{this.props.funInfo.question}</p>
          </div>
          <div className="answersHolder">
            {this.props.funInfo.answers.map(answer => <Answer answerProps={answer} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default PopUp
