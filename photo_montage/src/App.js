
import React from "react";
import Landing from "./Landing";
import PhotoStage from "./PhotoStage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {

  return (
    <div className="App">
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
            render={routeProps => <PhotoStage {...routeProps} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
