import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import JournalEntries from "./pages/JournalEntries";
import { useAuth0 } from "@auth0/auth0-react";
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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about"></Route>

          <Route path="/" element={<JournalEntries />}></Route>
        </Routes>
      </div>
    </Router>
  );
};
export default App;
