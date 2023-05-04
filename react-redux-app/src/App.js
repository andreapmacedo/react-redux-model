import React from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './redux/actions';

// function App(props) {
class App extends React.Component {
  render() {
    // const { countState } = this.props;
    const { dispatch, countState } = this.props;
    return (
      <div>
        <h1>Contador</h1>
        <h2>{ countState }</h2>
        {/* <button>Incrementa 1</button>
        <button>Incrementa 5</button> */}
        <button onClick={() => dispatch(actionCreator())}>Incrementa 1</button>
        <button onClick={() => dispatch(actionCreator(5))}>Incrementa 5</button>
      </div>
    );
  }
}

// mapeia o estado para props
// { prop: value} -> props do componente App e o valor que está no estado
const mapStateToProps = (state) => ({
  countState: state.count,
});



// export default App;
export default connect(mapStateToProps)(App);