const React = require('react');
const { PropTypes } = React;

class PageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeUpdated: false
    };
  }

  componentWillMount() {
    const { PageComponent, store } = this.props;

    if (!PageComponent || this.state.storeUpdated) {
      return;
    }

    PageComponent.getInitialState({ store }).then(() => {
      this.setState({
        storeUpdated: true
      });
    })
  }

  render() {
    const { PageComponent, LoadingComponent } = this.props;

    return this.state.storeUpdated
      ? <PageComponent {...this.props} />
      : <LoadingComponent {...this.props} />;
  }
}

module.exports = PageLoader;
