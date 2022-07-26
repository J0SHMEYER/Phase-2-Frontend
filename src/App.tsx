import axios from "axios";
import { useState } from 'react';
import './App.css';
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [spacecraftName, setSpacecraftName] = useState("");
  const [spacecraftInfo, setSpacecraftInfo] = useState<undefined | any>(undefined);

  const SPACECRAFT_BASE_URL = "https://lldev.thespacedevs.com/2.2.0";
  return (
    <div>
      <div className="search-field">
        <h1>Spacecraft Search</h1>
      
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={spacecraftName}
            onChange={(prop) => {
              setSpacecraftName(prop.target.value);
            }}
            label="Enter a Spacecraft..."
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>

      {spacecraftInfo === undefined ? (
        <div></div>
      ) : (
      <div id ="spacecraft-result">
        <p>Result {spacecraftInfo.name}</p>
        <img src={spacecraftInfo.image_url} />
        <p>Name of agency {spacecraftInfo.agency.name}</p>
        <p>{spacecraftInfo.agency.description}</p>
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