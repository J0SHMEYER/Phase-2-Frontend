import axios from "axios";
import { useState } from 'react';
import './App.css';

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [spacecraftName, setSpacecraft] = useState("");
  const [spacecraftInfo, setSpacecraftInfo] = useState<undefined | any>(undefined);

  const SPACECRAFT_BASE_URL = "https://lldev.thespacedevs.com/2.2.0";
  return (
    <div>
      <h1>Spacecraft Search</h1>
      
      <div>
        <label>Spacecraft Name</label>
        <br/>
        <input 
          type="text" 
          id="spacecraft-name" 
          name="spacecraft-name" 
          onChange={e => setSpacecraft(e.target.value)}
        />
        <br/>
        <button onClick={search}>Search</button>
      </div>

      <p>You have entered {spacecraftName}</p>

      {spacecraftInfo === undefined ? (
        <p>Spacecraft not found</p>
      ) : (
      <div id ="spacecraft-result">
        <img src={spacecraftInfo.image_url} />
      </div>
      )};
    </div>
  );

  function search(){
    axios.get(SPACECRAFT_BASE_URL + "/config/spacecraft/?search=" + spacecraftName).then((res) => {
      const newURL = res.data.results[0].url;
      axios.get(newURL).then((resNew) => {
        setSpacecraftInfo(resNew.data);
      });
    });
  }
}

export default App;