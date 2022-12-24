import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  faUser,
  faCheckSquare,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "./components/sidebar";
import Chat from "./features/chat";
import Login from "./features/login";
import { useStateValue } from "./StateProvider";

import "./App.css";

library.add(faUser, faCheckSquare, faCoffee);

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/room/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
