const React = require('react');
const { Component } = React;

class AppShell extends Component {
  render() {
    return (
      <div>
        AppShell
      </div>
    );
  }
}

// nothing to fetch for the app shell
AppShell.getInitialState = ({ store }) => Promise.resolve(store.getState());

module.exports = AppShell;
