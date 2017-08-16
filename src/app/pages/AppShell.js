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
AppShell.getInitialState = ({ store }) => {
  return Promise.resolve({
    context: {
      isAppShell: true
    },
    primary: {
      hed: 'loading'
    }
  });
};

module.exports = AppShell;
