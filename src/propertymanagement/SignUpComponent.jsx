import React, {Component} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropertyManagementService from '../api/PropertyManagementService.js'
import AuthenticationService from '../propertymanagement/authentication/AuthenticationService.js'


class SignUpComponent extends Component{
    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            username : '',
            password : '',
            role: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }   

    componentDidMount(){
            return
    }

    validate(values){
        let errors = {}
        if(!values.password){
            errors.password = 'Enter an address'
        }

        return errors
    }

    onSubmit(values){ 
        //let username = AuthenticationService.getLoggedInUserName()

        let user = {
            id: 0,
            username: values.username,
            password: values.password,
            role: "Applicant"
        }

        AuthenticationService.executeJwtAuthenticationService("applicant", "applicant")
        .then( (response) => {
            AuthenticationService.setSessionStorage("applicant", response.data.token)
            AuthenticationService.returnUserRole("applicant")
        }).catch( () => {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }) 

        
        PropertyManagementService.createUser(user)   
        AuthenticationService.logout()

        this.state.username = values.username
        this.state.password = values.password
                
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
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
                
                console.log(sessionStorage);
            })     
        }).catch( () => {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }) 

        

    }

    render(){
        let {username, password, role} = this.state
        return (
            <div>
                <h1 className="text-center">Application</h1>
                <div className="container">
                    <Formik
                        initialValues={{username, password}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) =>(
                                <Form>
                                    <ErrorMessage name="password" conponent="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Username</label>
                                        <Field className="form-control" type="text" name="username"/>
                                    </fieldset>      
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field className="form-control" type="text" name="password"/>
                                    </fieldset>   
                                    <button className="btn btn-success" type="submit">Save</button>   
                                </Form>
                            )
                        }
                    </Formik>
                </div>            
            </div>
        )
    }
}

export default SignUpComponent