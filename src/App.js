import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./components/ui/Theme";
import Header from "./components/ui/Header";
import { ThemeProvider } from "@emotion/react";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
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
          <Route
            exact
            path="/estimate"
            Component={() => <div>Estimate</div>}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
