import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <Router>
      <div>
        <NavBar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about"></Route>
          <Route path="/Login"></Route>
          <Route path="/"></Route>
        </Routes>
      </div>
    </Router>
  );
};
export default App;
