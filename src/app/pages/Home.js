const React = require('react');
const { connect } = require('react-redux');
const { Component } = React;
const { fetchInitialStateAction } = require('../store');
const pageLoaderHOC = require('../components/pageLoaderHOC');

class HomePage extends Component {
  render() {
    const { isLoading, primary } = this.props;

    return (
      <div>
        Homepage
        <h1>{isLoading ? 'Loading.....' : primary.hed}</h1>
      </div>
    );
  }
}

function mstp(state) {
  return {
    primary: state.primary,
    isLoading: state.context.isLoading
  };
}

const PageComponent = connect(mstp)(HomePage);

module.exports = pageLoaderHOC({
  PageComponent,
  contentType: 'homepage',
  progressive: true
});
