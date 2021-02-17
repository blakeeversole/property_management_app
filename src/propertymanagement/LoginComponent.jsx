import React, {Component} from 'react'
//import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component{


    render(){
        return(
            <div>
                <h1 className="text-center">Login</h1>
                <div className="container">
                    <div className="row center-block">
                        <div className="col-sm-12">
                            <label>First Name</label>
                            <input className="form-control col-sm-6 center-block"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <button className="btn btn-success">Update</button>
                        </div>
                    </div>
                </div> 
            </div>
            
     
            
        )
    }
}

export default LoginComponent