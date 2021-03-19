import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginComponent from './LoginComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import AddEditPropertyComponent from './employee/AddEditPropertyComponent.jsx'
import PropertiesComponent from './employee/PropertiesComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import PrivateRoute from './authentication/PrivateRoute.jsx'
import EmployeeDashboardComponent from './employee/EmployeeDashboardComponent.jsx'
import UsersComponent from './employee/UsersComponent.jsx'
import AddUserComponent from './employee/AddUserComponent.jsx'
import {Role} from '../Constants'
import TenantDashboardComponent from './tenant/TenantDashboardComponent.jsx'
import SignUpComponent from './SignUpComponent.jsx'
import ApplicantDashboardComponent from './applicant/ApplicantDashboardComponent.jsx'
import ApplicationComponent from './applicant/ApplicationComponent.jsx'
import ApplicationsComponent from './employee/ApplicationsComponent.jsx'
import AddEditApplicationComponent from './employee/AddEditApplicationComponent.jsx'

class PropertyManagement extends Component{
    render() {
        return(
            <div className="EmployeeArea">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>  
                            <Route path="/logout" component={LogoutComponent}/> 
                            <Route path="/signup" component={SignUpComponent}/>   
                            {/* <Route path="/employeedashboard" component={EmployeeDashboardComponent}/>   */}
                            {/* EMPLOYEE ROUTES */}
                            <PrivateRoute path="/users" roles={[Role.Employee]} component={UsersComponent}/>  
                            <PrivateRoute path="/user" roles={[Role.Employee]} component={AddUserComponent}/>   
                            <PrivateRoute path="/properties/:id" roles={[Role.Employee]} component={AddEditPropertyComponent}/>                         
                            <PrivateRoute path="/properties" roles={[Role.Employee]} component={PropertiesComponent}/>  
                            <PrivateRoute path="/applications/:id" roles={[Role.Employee]} component={AddEditApplicationComponent}/>                             
                            <PrivateRoute path="/applications" roles={[Role.Employee]} component={ApplicationsComponent}/>                    
                            <PrivateRoute path="/employeedashboard" roles={[Role.Employee]} component={EmployeeDashboardComponent}/>   
                            {/* TENANT ROUTES */}      
                            <PrivateRoute path="/tenantdashboard" roles={[Role.Tenant]} component={TenantDashboardComponent}/>   
                            {/* APPLICANT ROUTES */}      
                            <PrivateRoute path="/applicantdashboard" roles={[Role.Applicant]} component={ApplicantDashboardComponent}/> 
                            <PrivateRoute path="/application" roles={[Role.Applicant]} component={ApplicationComponent}/> 
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}

export default PropertyManagement