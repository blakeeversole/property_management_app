import React, {Component} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropertyManagementService from '../../api/PropertyManagementService.js'

class AddEditUserComponent extends Component{

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
            role: values.role
        }

        PropertyManagementService.createUser(user)
        .then(() => this.props.history.push('/users'))
    }

    render(){
        let {username, password, role} = this.state
        return (
            <div>
                <h1 className="text-center">User</h1>
                <div className="container">
                    <Formik
                        initialValues={{username, password, role}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) =>(
                                <Form>
                                    <ErrorMessage name="password" conponent="div" 
                                                                className="alert alert-warning"/>                                    
                                    <fieldset className="form-group">
                                        <label>Username</label>
                                        <Field className="form-control" type="text" name="username"/>
                                    </fieldset>      
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field className="form-control" type="text" name="password"/>
                                    </fieldset>       
                                    <fieldset className="form-group">
                                        <label>Role</label>
                                        <Field className="form-control" as="select" name="role">                                        
                                        <option value="">--Select--</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Tenant">Tenant</option>
                                        </Field>
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

export default AddEditUserComponent