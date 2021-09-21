import React, { Component } from "react";
import Answer from './Answer.js';

class PopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerCount: 0
    };
  }

  handleAnswerCount = (action) => {
    if (action == "check"){
      return this.state.answerCount;
    } else {
      this.setState({answerCount:this.state.answerCount+1});
    }
    
  };

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
            {this.props.funInfo.answers.map(answer => 
            <Answer handleAnswerCount={this.handleAnswerCount}
                    handleUpdateScore={this.props.handleUpdateScore}
                    handleUpdateTile={this.props.handleUpdateTile}
                    answerProps={answer} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default PopUp
