import Home from "./Pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Recipes from "./Pages/Recipes";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function getSession() {
      const cookie = await axios.get("/v1/whoami/");
      if (cookie.data.username) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    getSession();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/([#about, #contact]*)">
          <Home />
        </Route>
        <Route path="/recipes/">
          <Recipes isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="*">
          <div>Wrong page my friend</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
