import React, { useState } from "react";
import Landing from "./Landing";
import PhotoStage from "./PhotoStage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [error, setError] = useState("");
  const errorMessage = msg => {
    setError(msg);
    // setTimeout(() => setError(""), 3000);
  };

  return (
    <div className="App">
      <div className={`alert ${error && "active"}`}>
        <p>{error}</p>
      </div>

      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => <Landing {...routeProps} />}
          />

          <Route
            exact
            path="/photos/:searchParams"
            render={routeProps => (
              <PhotoStage {...routeProps} errorMessage={errorMessage} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
