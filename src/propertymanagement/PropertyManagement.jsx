import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginComponent from './LoginComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import AddEditPropertyComponent from './AddEditPropertyComponent.jsx'
import PropertiesComponent from './PropertiesComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import AuthenticatedRoute from './authentication/AuthenticatedRoute.js'
import DashboardComponent from './DashboardComponent.jsx'
import UsersComponent from './UsersComponent.jsx'

class PropertyManagement extends Component{
    render() {
        return(
            <div className="PropertyManagement">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>                       
                            <AuthenticatedRoute path="/users" component={UsersComponent}/>    
                            <AuthenticatedRoute path="/properties/:id" component={AddEditPropertyComponent}/>                         
                            <AuthenticatedRoute path="/properties" component={PropertiesComponent}/>                    
                            <AuthenticatedRoute path="/dashboard" component={DashboardComponent}/>
                            <Route path="/logout" component={LogoutComponent}/>      
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}

export default PropertyManagement