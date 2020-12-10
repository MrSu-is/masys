import logo from './logo.svg';
import './App.css';
import { Botton } from "antd";
import {Switch,Route,Redirect} from 'react-router-dom';
import "antd/dist/antd.css"
import {adminRoute, logRout} from './routers'
import Frame from './components/Frame/index'

function App() {
  return (
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
        <Redirect to='/404'/>
      </Switch>
    </Frame>
  );
}

export default App;
