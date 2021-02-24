import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
//import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import PropertiesComponent from './PropertiesComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import AuthenticatedRoute from './authentication/AuthenticatedRoute.js'

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
                            <AuthenticatedRoute path="/properties/:name" component={PropertiesComponent}/>
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