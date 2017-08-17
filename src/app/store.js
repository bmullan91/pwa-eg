const isoFetch = require('isomorphic-fetch');
const { default: thunk } = require('redux-thunk');
const { createStore, applyMiddleware } = require('redux');

const DEFAULT_INITIAL_STATE = {
  context: {},
  primary: {}
};

const ACTION_TYPES = {
  FETCH_INITIAL_STATE: 'FETCH_INITIAL_STATE',
  UPDATE_INITIAL_STATE: 'UPDATE_INITIAL_STATE'
};

function updateInitialStateAction(initialState) {
  return {
    type: ACTION_TYPES.UPDATE_INITIAL_STATE,
    initialState
  }
}

function fetchInitialStateAction({ contentType, slug }) {
  return function (dispatch) {
    dispatch({
      type: ACTION_TYPES.FETCH_INITIAL_STATE,
      contentType,
      slug
    });

    // TODO get host/port from somewhere
    const apiUri = `http://localhost:3000/api/initial-states/${contentType}/${slug}`;

    return isoFetch(apiUri)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`Failed to fetch ${apiUri}`)
        }

        return resp.json();
      })
      .then(initialState => dispatch(updateInitialStateAction(initialState)));
  }
}



function fetchInitialStateReducer(state, action) {
  const newPrimary = Object.assign({}, state.primary, {
    hed: 'loading...'
  });

  return Object.assign({}, state, { primary: newPrimary });
}

function updateInitialStateReducer(state, action) {
  return action.initialState;
}

function reducer(state = DEFAULT_INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_INITIAL_STATE:
      return fetchInitialStateReducer(state, action);
    case ACTION_TYPES.UPDATE_INITIAL_STATE:
      return updateInitialStateReducer(state, action);
    default:
      return state;
  }
}

function initStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  );
}

module.exports = {
  DEFAULT_INITIAL_STATE,
  initStore,
  updateInitialStateAction,
  fetchInitialStateAction
};
