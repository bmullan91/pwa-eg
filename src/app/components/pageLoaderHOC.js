const React = require('react');
const { PropTypes, PureComponent } = React;
const { connect } = require('react-redux');

const { fetchInitialStateAction } = require('../store');
const DefaultLoadingPage = require('../pages/Loading');

function mstp(state, ownProps) {
  return Object.assign({}, ownProps, {
    isLoading: state.context.isLoading,
    contentType: state.context.contentType
  });
}

function pageLoaderHOC(options) {
  const {
    PageComponent,
    LoadingComponent = DefaultLoadingPage,
    progressive,
    contentType
  } = options;

  class PageLoader extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        canRenderPage: props.contentType === contentType
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.state.canRenderPage) {
        return;
      }

      if (nextProps.isLoading && progressive) {
        this.setState({
          canRenderPage: true
        });
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.state.canRenderPage !== nextState.canRenderPage;
    }

    componentWillMount() {
      if (this.state.canRenderPage) {
        return;
      }

      const { match: matchedRoute } = this.props;
      const { store } = this.context;
      const opts = {
        store,
        slug: matchedRoute.params.slug
      };

      PageLoader.getInitialState(opts).then(() => {
        this.setState({
          canRenderPage: true
        });
      });
    }

    render() {
      return this.state.canRenderPage
        ? <PageComponent {...this.props} />
        : <LoadingComponent {...this.props} />;
    }
  }

  PageLoader.getInitialState = (opts) => {
    if (PageComponent.getInitialState) {
      return PageComponent.getInitialState(opts);
    }

    const { store, slug = '' } = opts;
    return store.dispatch(fetchInitialStateAction({
      contentType,
      slug
    }))
    .then(() => store.getState());
  };

  PageLoader.contextTypes = {
    store: PropTypes.object
  };

  return connect(mstp)(PageLoader);
}

module.exports = pageLoaderHOC;
