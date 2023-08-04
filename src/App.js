import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
  Login,
} from "./components";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#000" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<PrivateRoute component={Feed} />} />
          <Route
            path="/video/:id"
            element={<PrivateRoute component={VideoDetail} />}
          />
          <Route
            path="/channel/:id"
            element={<PrivateRoute component={ChannelDetail} />}
          />
          <Route
            path="/search/:searchTerm"
            element={<PrivateRoute component={SearchFeed} />}
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
