const React = require('react');
const { Component } = React;

const { Switch, Route, Link } = require('react-router-dom');

class App extends Component {
  render() {
    const { routes } = this.props;
    return (
      <div>
        <ul>
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/story/omg-guess-what">Article Page</Link></li>
        </ul>
        <hr/>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} /> )}
        </Switch>
      </div>
    );
  }
}

module.exports = App;
