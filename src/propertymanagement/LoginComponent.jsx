import React, {Component} from 'react'
//import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        //this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        this.setState(
            {
                [event.target.name]
                :event.target.value
            })
    }

    loginClicked(){
        this.props.history.push(`/welcome/${this.state.username}`)
        // AuthenticationService
        // .executeJwtAuthenticationService(this.state.username, this.state.password)
        // .then( (response) => {
        //     AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // }).catch( () => {
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // }) 
    }

    render(){
        return(
            <div>
                <h1 className="text-center">Login</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            User Name
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <input type="text" name="username" className="form-control" />
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
                            <input type="password" name="password" className="form-control" />
                        </div>                        
                    </div>
                </div>

                <div className="row">
                    <div className="col text-center paddingTop">
                        <button className="btn btn-success">Login</button>
                    </div>
                </div>
            </div> 

            
     
            
        )
    }
}

export default LoginComponent