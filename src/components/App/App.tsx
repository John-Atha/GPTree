import React from "react";
import { Counter } from "../Counter/Counter";
import "./App.css";
import { Grid, Stack, Typography } from "@mui/material";
import MyAppBar from "../MyAppBar/MyAppBar";
import ChatTrees from "../ChatTrees/ChatTrees";

function App() {
  return (
    <div className="App">
      <Grid container direction="column" className="full-height">
        <Grid item>
          <MyAppBar />
        </Grid>
        <Grid item xs padding={2}>
          <ChatTrees />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
