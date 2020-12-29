import Home from "./Pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/recipes/">
          <div>Hello World</div>
        </Route>
        <Route path="*">
          <div>Wrong page my friend</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
