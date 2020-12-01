import './App.css';
import Report from './components/report'
import Dashboard from './components/dashboard'
import Tile from './components/tile'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Power BI</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/report">Report</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="/dashboard">Dashboard</a>
              </li> */}
              {/* <li className="nav-item">
                <a className="nav-link" href="/tile">Tile</a>
              </li> */}
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/report" component={Report}></Route>
          {/* <Route path="/dashboard" component={Dashboard}></Route> */}
          {/* <Route path="/tile" component={Tile}></Route> */}
          <Route path="**" render={() => <Redirect to="/report" />}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
