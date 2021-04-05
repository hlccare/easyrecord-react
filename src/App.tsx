import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Layout from 'components/Layout';
import React from "react";
import Tags from "views/Tags";
import Money from "views/Money";
import Statistics from "views/Statistics";
import NoMatch from "views/NoMatch";




 function App() {
  return (
    <Router>
          <Switch>
            <Redirect exact from="/" to="/money"/>
            <Route path="/tags">
              <Tags />
            </Route>
            <Route path="/money">
              <Money />
            </Route>
            <Route path="/statistics">
              <Statistics />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch> 
    </Router>
  );
}









export default App;
