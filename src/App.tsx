import axios from "axios";
import { useState } from 'react';
import './App.css';
import { Box, Button, Card, CardContent, CardMedia, Grid, Paper, Skeleton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { SystemSecurityUpdate } from "@mui/icons-material";

function App() {
  // Declare new state variable called "spacecraftName"
  const [spacecraftName, setSpacecraftName] = useState("");
  const [spacecraftInfo, setSpacecraftInfo] = useState<undefined | any>(undefined);

  const SPACECRAFT_BASE_URL = "https://lldev.thespacedevs.com/2.2.0";
  return (
    <div style={{backgroundColor: "white", color: "#00035c"}}>

      <div className="search-field">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Spacecraft Search
        </h1>    


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
        <div>
          <p style={{margin: "0 auto", textAlign: "center", padding: "30px 50px 0px 50px"}}> 
          sorry no spacecraft with that name found </p>
        </div>
      ) : (
      <div id ="spacecraft-result" style={{maxWidth: "500px", margin: "0 auto", padding: "30px 100px 0px 100px"}}>
        <Card sx={{ minWidth: 275 , bgcolor: "#fcfcfc"}}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.main" gutterBottom textAlign={"center"}>
        Result: {spacecraftInfo.name}
        </Typography>
        <div style={{textAlign: "center" }}>
          <img src={spacecraftInfo.image_url} 
          style={{ height: "400px" ,width:"465px", objectFit: "cover", }}/>
        </div>
        <Typography gutterBottom variant="h4">
        </Typography>
        <Typography variant="body2" textAlign={"center"} gutterBottom color="text.main" sx={{ fontSize: 15 }}>
          Name of agency {spacecraftInfo.agency.name}
        </Typography>
        <Typography textAlign={"center"} color="text.secondary" gutterBottom sx={{ fontSize: 13 }}>
          {spacecraftInfo.agency.description}
        </Typography>
        <Typography textAlign={"center"} color="text.secondary" gutterBottom sx={{ fontSize: 13 }}>
          date of flight {spacecraftInfo.maiden_flight}
        </Typography>
      </CardContent>
    </Card>

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