import React from "react";
import Header from "./components/ui/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/ui/Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={() => <div>Home</div>} />
          <Route exact path="/services" Component={() => <div>Services</div>} />
          <Route
            exact
            path="/customsoftware"
            Component={() => <div>Custom Software</div>}
          />
          <Route
            exact
            path="/mobileapps"
            Component={() => <div>Mobile Apps</div>}
          />
          <Route exact path="/websites" Component={() => <div>Websites</div>} />
          <Route
            exact
            path="/revolution"
            Component={() => <div>The Revolution</div>}
          />
          <Route exact path="/about" Component={() => <div>About Us</div>} />
          <Route
            exact
            path="/contact"
            Component={() => <div>Contact Us</div>}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
