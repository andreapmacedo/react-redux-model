# react-redux-model


#### Inicia uma aplicação React

#### Instala o Redux

#### Cria a pasta `src/redux` e o arquivo `src/redux/index.js`

#### Cria a store
```js
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import counterReducer from './reducers/counterReducer';
const store = createStore(counterReducer, composeWithDevTools());

export default store;
```

> Com combineReducers
```js
import { combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import counterReducer from './reducers/counterReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
```

#### Cria a função reducer
Em aplicações maiores, cada reducer deve ficar em um arquivo separado
Neste caso, criamos o arquivo `src/redux/reducers/counterReducer.js`

 > implementação mais simples do reducer
```js
// const INITIAL_STATE = { count: 0 };
// const reducer = (state = INITIAL_STATE, action) => state;
// const store = createStore(reducer, composeWithDevTools());
```

> Implementação do reducer com ação
```js
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
```

> Tratando com a imutabilidade do estado global
```js
const INITIAL_STATE = {
  clicks: 0,
  count: 0,
};

function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return { 
        ...state, 
        count: state.count + action.payload,
      };
    default:
      return state;
  }
}
export default counterReducer;
```

```js
const INITIAL_STATE = {
  clicks: 0,
  count: 0,
};


// Estado global com combineReducers:
state = {
  counterReducer: {
    count: 0,
    clicks: 0,
  }
}

// Estado global sem combineReducers:
state = {
  count: 0,
  clicks: 0,
}

function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return {
        ...state,
        count: state.count + action.payload,
      };
    case 'INCREMENT_CLICK':
      return {
        ...state,
        clicks: state.clicks + 1,
      };
    default:
      return state;
  }
}
export default counterReducer;
```

#### Instala o React-Redux (npm install react-redux) 
  - Faz a ponte entre as bibliotecas do React e do Redux

#### Adiciona o provider a aplicação (src/index.js)
  - envolve a aplicação com o provider
  - passa a store como propriedade


```js

import { Provider } from 'react-redux';
import store from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <App />
  </Provider>,
);

```

#### importar a função connect do react-redux (src/App.js)
  - conecta o componente com o estado do redux
  - passa o estado e as ações como propriedades

```js
import { connect } from 'react-redux';
```

```js
export default connect(mapStateToProps)(App);
```

#### uso da função mapStateToProps (leitura do estado)
  - mapeia o estado para as propriedades do componente

```js
const mapStateToProps = (state) => ({
  countState: state.count,
});
```
> Com combineReducers
```js
const mapStateToProps = (state) => ({
  countState: state.counterReducer.count,
});
```

#### cria a pasta actions e o arquivo index.js
  > Action é um objeto que descreve o que deve ser feito
  - cria as ações

```js
export const action = {
    type: 'INCREMENT'
}
```
  > padrão mais comum é criar uma função que retorna o objeto e chamar essa função de action creator, isso possibilita a passagem de parâmetros para a action como no exemplo abaixo com o payload.
```js
export const actionCreator = () => {
  return {
    type: 'INCREMENT'
  }
}
```
  > podemos passar parâmetros para a actionCreator
```js
export const actionCreator = (increment = 1) => ({ 
  type: 'INCREMENT_COUNTER',
  payload: increment,
});
```



#### Disparando uma ação
  - importa a actionCreator
  - passa a actionCreator como propriedade do componente
  - chama a actionCreator no componente


- exemplo 1:

```jsx
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
``` 

- exemplo 2:

```jsx
import React from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './redux/actions';

// funcional
// const App = ({ incrementCount, countState }) => {
//   return (
// classe
class App extends React.Component {
  render() {
    const { incrementCount, countState } = this.props;
    return (
      <div>
        <h1>Contador</h1>
        <h2>{ countState }</h2>
        <button onClick={() => incrementCount(1)}>Incrementa 1</button>
        <button onClick={() => incrementCount(5)}>Incrementa 5</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  countState: state.count,
});

const mapDispatchToProps = (dispatch) => ({
  incrementCount: (value) => dispatch(actionCreator(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```


#### Criando mais de um reducer
  - cria o reducer
  - cria o arquivo de actions
  - cria o arquivo de actionCreators
  - importa o reducer no arquivo `src/redux/index.js`
  - cria o combineReducers
  - passa o combineReducers para o createStore

```js
import { combineReducers } from 'redux';
import counterReducer from './reducers/counterReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});
```

```js
// Estado global com combineReducers:
state = {
  counterReducer: {
    count: 0,
    clicks: 0,
  }
}

// Estado global sem combineReducers:
state = {
  count: 0,
  clicks: 0,
}
```

```js
const mapStateToProps = (state) => ({
  countState: state.counterReducer.count,
});
```