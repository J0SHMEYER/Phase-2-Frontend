import { useState } from 'react';
import './App.css';

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [spacecraftName, setSpacecraft] = useState("");

  return (
    <div>
      <h1>
        Spacecraft Search
      </h1>
      
      <div>
        <label>Spacecraft Name</label><br/>
        <input type="text" id="spacecraft-name" name="spacecraft-name" onChange={e => setSpacecraft(e.target.value)}/><br/>
        <button onClick={search}>
        Search
        </button>
      </div>

      <p>
        You have entered {spacecraftName}
      </p>
    </div>
  );

  function search(){
      alert("Search button has been clicked!");
  }
}

export default App;