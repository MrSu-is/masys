import logo from './logo.svg';
import './App.css';
import { Botton } from "antd";
import {Switch,Route,Redirect} from 'react-router-dom';
import "antd/dist/antd.css"
import {adminRoute, logRout} from './routers'
import Frame from './components/Frame/index'
import { isLoged } from './utils/auth'

function App() {
  return ( isLoged()?
    <Frame>
      <h1>这是第一个组件</h1>
      <Switch>
        {adminRoute.map(route => {
          return (
            <Route 
              key={route.path} 
              path={route.path} 
              exart={route.exact} 
              render={routeProps=>{
              return <route.component {...routeProps}/>
            }}
            />
          );
        })}

        <Redirect to={adminRoute[0].path}  from="/admin"/> 
        <Redirect to='/404'/>
      </Switch>
    </Frame>:
    <Redirect to="/login"/>
  );
}

export default App;
