const React = require('react');
const { connect } = require('react-redux');
const { Component } = React;
const { fetchInitialStateAction } = require('../store');
const pageLoaderHOC = require('../components/pageLoaderHOC');

class ArticlePage extends Component {
  render() {
    const { isLoading, primary } = this.props;

    return (
      <div>
        ArticlePage
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

const PageComponent = connect(mstp)(ArticlePage);

module.exports = pageLoaderHOC({
  PageComponent,
  contentType: 'article',
  progressive: true
});
