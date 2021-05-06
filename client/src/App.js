import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//components
import Home from './components/Home';
import Chat from './components/Chat';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/:room'>
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
