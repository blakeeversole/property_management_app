import React, {Component} from 'react'
//import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: 'Blake',
            password: 'Blake',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        console.log(this.state)
        this.setState(
            {
                [event.target.name]
                :event.target.value
            })
    }

    loginClicked(){
        console.log(this.state)
        let a = this.state.username;
        let b = this.state.password;
        if(this.state.username === 'Blake' && this.state.password === 'Blake'){
            this.props.history.push('/welcome')
        }
        else{
            this.setState({hasLoginFailed:true})
        }
    }

    render(){
        return(
            <div>
                <h1 className="text-center">Login</h1>
                <div className="container">
                
                    {this.state.hasLoginFailed && <div className="alert alert-warning text-center">Invalid Credentials</div>}

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