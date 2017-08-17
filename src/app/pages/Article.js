const React = require('react');
const { connect } = require('react-redux');
const { Component } = React;
const { fetchInitialStateAction } = require('../store');

class ArticlePage extends Component {
  render() {
    const { hed } = this.props.primary;
    return (
      <div>
        ArticlePage
        <h1>{hed}</h1>
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

module.exports = connect((state) => state)(ArticlePage);
