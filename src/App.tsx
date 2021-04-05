import styled from 'styled-components';
import Nav from 'components/Nav';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const Wrapper = styled.div`
  min-height: 100vh;
  display:flex;
  flex-direction:column;
`
const Main = styled.div`
flex-grow:1;
`


 function App() {
  return (
    <Router>
      <Wrapper>
        <Main>
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
        </Main>
        <Nav />
        

        
      </Wrapper>
    </Router>
  );
}

function Statistics() {
  return <h2>统计</h2>;
}

function Tags() {
  return <h2>标签</h2>;
}

function Money() {
  return <h2>记账</h2>;
}

function NoMatch(){
  return(
    <div>404</div>
  )
}

export default App;
