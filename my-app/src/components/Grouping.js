class Grouping extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };

    }

    render() {
        return (
          <div className="grouping" id={"grouping-"+this.props.grouping}>
              grouping for {this.props.grouping}
          </div>
        );
      }
}

export default Grouping