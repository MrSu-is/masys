import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import App from './App';
import { logRout } from './routers'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store'



ReactDOM.render(
  <Provider store={store}>
    <Router> 
      <Switch>
        <Route path="/admin" render={routeProps=><App {...routeProps} />}/>
        {logRout.map(route => { 
          return <Route key={route.path} path={route.path} component={route.component} />;
        })}
        <Redirect to="/admin" from="/"/> 
        <Redirect to="/404" /> 

      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
