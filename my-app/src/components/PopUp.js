import React, { Component } from "react";

export default class PopUp extends Component {
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
            {this.props.funInfo.answers.map(answer => <p className="answer">{answer}</p>)}
          </div>
        </div>
      </div>
    );
  }
}
