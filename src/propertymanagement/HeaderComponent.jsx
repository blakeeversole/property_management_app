import React, {Component} from 'react'
import AuthenticationService from './authentication/AuthenticationService.js'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router';


class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        const role = AuthenticationService.getCurrentUserRole()

        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-brand">Property Management</div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && role === "Employee" && <li><Link to="/employeedashboard" className="nav-link" >Home</Link></li>}  
                        {isUserLoggedIn && role === "Tenant" && <li><Link to="/tenantdashboard" className="nav-link" >Home</Link></li>}  
                        {isUserLoggedIn && role === "Appliant" && <li><Link to="/applicantdashboard" className="nav-link" >Home</Link></li>}  
                        {!isUserLoggedIn && <li><Link to="/signup" className="nav-link">Sign Up</Link></li>}                  
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link to="/login" className="nav-link">Login</Link></li>}
                        {isUserLoggedIn && <li><Link to="/logout" className="nav-link" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);