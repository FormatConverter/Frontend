import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";

const App = () => {
  return (
    <Routes>
        <Route index Component={Home} />
        <Route path="/home" Component={Home} />
    </Routes>
  );
};

export default App;
