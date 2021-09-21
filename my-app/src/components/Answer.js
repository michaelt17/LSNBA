
import React, { Component } from 'react';

class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerColor: 'gold'
    };

    this.handleClick = this.handleClick.bind(this);
}

  handleClick() {
    if (this.props.answerProps[1] == "true" && this.state.answerColor == 'gold') {
      this.setState({
        answerColor : "LawnGreen"
    });
      if (this.props.handleAnswerCount("check") == 0){
        console.log("hello")
        this.props.handleUpdateScore(1);
        this.props.handleUpdateTile("tile zeroWrong");
      }else if (this.props.handleAnswerCount("check") == 1){
        console.log("hi");
        this.props.handleUpdateScore(.5);
        this.props.handleUpdateTile("tile oneWrong");
      } else {
        this.props.handleUpdateTile("tile twoWrong");
      }
    } else {
      if (this.props.answerProps[1] != "true"){
        this.setState({
          answerColor : "red",
        });
        this.props.handleAnswerCount("update");
      }
    }
    
  }

  render() {
      return (
        <div className="answerHolder">
          <p style={{ color: this.state.answerColor}} onClick={this.handleClick} className={[this.props.answerProps[1],"answer"].join(" ")}>{this.props.answerProps[0]}</p>
        </div>
      );
    }
}

export default Answer