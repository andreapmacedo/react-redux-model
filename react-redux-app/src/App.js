import React from 'react';
import { connect } from 'react-redux';

// function App(props) {
class App extends React.Component {
  render() {
    const { countState } = this.props;
    return (
      <div>
        <h1>Contador</h1>
        <h2>{ countState }</h2>
        <button>Incrementa 1</button>
        <button>Incrementa 5</button>
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