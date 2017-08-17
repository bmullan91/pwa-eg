const React = require('react');
const { connect } = require('react-redux');
const { Component } = React;
const { fetchInitialStateAction } = require('../store');

class HomePage extends Component {
  render() {
    const { hed } = this.props.primary;
    return (
      <div>
        Homepage
        <h1>{hed}</h1>
      </div>
    );
  }
}

HomePage.getInitialState = ({ store }) => {
  return store.dispatch(fetchInitialStateAction({
    // get from pass prop
    // or we always populate the store with the context info
    contentType: 'homepage',
    slug: 'welcome'
  }))
  .then(() => store.getState());
};

module.exports = connect(state => state)(HomePage);
