import React, { Component } from 'react';

class SimilarPlayers extends Component {
    constructor(props) {
        super(props);

        this.mostSimilar = [];
    }

    calculateFavorites(){
        console.log(this.props)
    }

    render() {
        this.calculateFavorites();
        let text = "";
        if (this.props.selectedPlayer){
            text = "You have Selected: " + this.props.selectedPlayer;
        }
        return (
          <div className="similarPlayers">
              {text}
          </div>
        );
      }
}

export default SimilarPlayers
