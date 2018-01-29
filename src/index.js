import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import store, { history } from './store/';

import App from './components/App';
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
          <Route path="/" component={ Component } />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
};

render(App);

if(module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  })
}


// Взять react-create-app
// написать метод как у koa-webpack
// 500 ошибка не надо
// Добавить проверки на сервере
// RestFull API перепустал, разобраться лучше