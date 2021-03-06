import React, {Component} from 'react'
import AuthenticationService from '../propertymanagement/authentication/AuthenticationService.js'


class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        this.setState(
            {
                [event.target.name]
                :event.target.value
            })
    }

    async loginClicked(){            
        await AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then( (response) => {
            AuthenticationService.setSessionStorage(this.state.username, response.data.token)
            AuthenticationService.returnUserRole(this.state.username)
            .then( (response) => {
                sessionStorage.setItem('userRole', response.data.role)
                if(response.data.role === 'Employee'){
                    this.props.history.push(`/employeedashboard`)
                }
                if(response.data.role === 'Tenant'){
                    this.props.history.push(`/tenantdashboard`)
                }
                if(response.data.role === 'Applicant'){
                    this.props.history.push(`/applicantdashboard`)
                }
            })     
        }).catch( () => {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }) 
    }

    render(){
        return(
            <div>
                <h1 className="text-center">Login</h1>
                <div className="container">
                
                    {this.state.hasLoginFailed && <div className="alert alert-warning text-center">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}

                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            User Name
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-4"></div>
                        <div className="col-4">
                            Password
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" />
                        </div>                        
                    </div>
                </div>

                <div className="row">
                    <div className="col text-center paddingTop">
                        <button onClick={this.loginClicked} className="btn btn-success">Login</button>
                    </div>
                </div>
            </div>             
        )
    }
}

export default LoginComponent