
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
    console.log(this);
    if (this.props.answerProps[1] == "true") {
      console.log("this is true");
      this.setState({
        answerColor : "LawnGreen"
    });
    } else {
      console.log("this is false");
      this.setState({
        answerColor : "red"
    });
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