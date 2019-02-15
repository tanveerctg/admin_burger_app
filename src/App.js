import React from 'react';
import Dashboard from './containers/Dashboard/Dashboard';
import Add_admin from './containers/Add_admin/Add_admin';
import Add_items from './containers/Add_items/Add_items';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';
import Settings from './containers/Settings/Settings';
import Edit_burger from './containers/Edit_burger/Edit_burger';
import All_burgers from './containers/All_burgers/All_burgers';
import Layout from './components/Layout/Layout';
import  './App.scss';
import {Route,Switch,Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'


export const history = createHistory();


const App=()=>( 
        <Layout >
          <Switch>
            <Route path='/' exact component={Signin}/>
            <Route path='/signup' exact component={Signup}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/add_item' component={Add_items}/>
            <Route path='/add_admin' component={Add_admin}/>
            <Route path='/all_Burgers' component={All_burgers}/>
            <Route path='/edit_Burger/:id' component={Edit_burger}/>
            <Route path='/settings' component={Settings}/>
          </Switch>
        </Layout>

  )

export default App;
