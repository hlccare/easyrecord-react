import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Tags from "views/Money/Tags";
import Money from "views/Money";
import Statistics from "views/Statistics";
import NoMatch from "views/NoMatch";
import styled from "styled-components";
import { Tag } from "views/Tag";

const AppWrapper = styled.div`
  color: #333;
  max-width: 520px;
  margin: 0 auto;
`


function App() {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/money" />
          <Route exact path="/tags/:id">
            <Tag />
          </Route>
          <Route exact path="/tags" >
            <Tags />
          </Route>
          <Route exact path="/money">
            <Money />
          </Route>
          <Route exact path="/statistics">
            <Statistics />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  );
}









export default App;
