
const INITIAL_STATE = {
  count: 0,
};

// function reducer(state = INITIAL_STATE, action) {
function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      // return { count: state.count + 1 };
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default counterReducer;
