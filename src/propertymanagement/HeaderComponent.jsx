import React, {Component} from 'react'
// import AuthenticationService from './AuthenticationService.js'
// import {Link} from 'react-router-dom'
import { withRouter } from 'react-router';


class HeaderComponent extends Component{
    render(){
        //const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        
        // console.log(isUserLoggedIn);

        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-brand">Property Management</div>
                    <ul className="navbar-nav">
                        <div className="nav-link">Home</div>
                        <div className="nav-link">About</div>
                        {/* {isUserLoggedIn && <li><Link to="/welcome/in28minutes" className="nav-link" >Home</Link></li>}                        
                        {isUserLoggedIn && <li><Link to="/todos" className="nav-link">Todos</Link></li>} */}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <div className="nav-link">Login</div>
                        {/* {!isUserLoggedIn && <li><Link to="/login" className="nav-link">Login</Link></li>}
                        {isUserLoggedIn && <li><Link to="/logout" className="nav-link" onClick={AuthenticationService.logout}>Logout</Link></li>} */}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);