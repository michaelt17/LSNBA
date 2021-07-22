import './App.css';
import Tabs from "./components/Tabs"; 
import Grid from "./components/Grid"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Michael's Coding Project for Liquid Studios</h1>
      </header>
      <div>
        <h1>Inserting Tabs Here</h1>
        <Tabs> 

          <div label="NBA Machine Learning"> 
            This tab will eventually host the results of my machine learning!
          </div> 

          <div label="NBA Data Exploration"> 
            This tab will have several paragraphs and D3 graphs talking about the NBA!
          </div> 

          <div label="About Michael"> 
            This tab will have Jeopardy to learn more about Michael!
            <Grid/>
          </div> 

        </Tabs> 
      </div>
    </div>
  );
}

export default App;
