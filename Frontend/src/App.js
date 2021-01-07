import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Recipes from "./Pages/Recipes";
import AllRecipes from "./Pages/AllRecipes";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function getSession() {
      const cookie = await axios.get("/v1/whoami/");
      if (cookie.data.username) {
        setIsLoggedIn(() => {
          return true;
        });
      } else {
        setIsLoggedIn(() => {
          return false;
        });
        console.log(isLoggedIn);
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
          {console.log(isLoggedIn)}
          {isLoggedIn ? (
            <Recipes isLoggedIn={isLoggedIn} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/allrecipes/">
          <AllRecipes isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="*">
          <div>Wrong page my friend</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
