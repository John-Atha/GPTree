import React from "react";
import { Counter } from "../Counter/Counter";
import "./App.css";
import { Stack, Typography } from "@mui/material";
import MyAppBar from "../MyAppBar/MyAppBar";
import ChatTree from "../ChatTree/ChatTree";

function App() {
  return (
    <div className="App">
      <MyAppBar />
      <Stack className="full-height" spacing={2}>
        <ChatTree />
      </Stack>
    </div>
  );
}

export default App;
