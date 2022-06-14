import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import JournalEntries from "./pages/JournalEntries";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import About from "./pages/About";
const App = () => {
  const { isLoading, error } = useAuth0();
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  // TODO: better loading component
  if (isLoading) {
    return <div>LOADING</div>;
  }
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/about" element={<About />}></Route>

          <Route path="/" element={<JournalEntries />}></Route>
        </Routes>
      </div>
    </Router>
  );
};
export default App;
