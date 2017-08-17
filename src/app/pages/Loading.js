const React = require('react');
const { Component } = React;

class LoadingPage extends Component {
  render() {
    return (
      <div>
        LoadingPage
      </div>
    );
  }
}

// nothing to fetch for the app shell
LoadingPage.getInitialState = ({ store }) => {
  return Promise.resolve({
    context: {
      isAppShell: true
    },
    primary: {
      hed: 'loading'
    }
  });
};

module.exports = LoadingPage;
