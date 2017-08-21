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

ArticlePage.getInitialState = ({ store }) => {
  return store.dispatch(fetchInitialStateAction({
    // get from pass prop
    // or we always populate the store with the context info
    contentType: 'article',
    slug: 'hello-world'
  }))
  .then(() => store.getState());
};

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
