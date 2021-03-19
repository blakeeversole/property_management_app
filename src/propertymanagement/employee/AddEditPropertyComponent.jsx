import React, {Component} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropertyManagementService from '../../api/PropertyManagementService.js'
//import AuthenticationService from './AuthenticationService.js'

class AddEditPropertyComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            address1 : '',
            address2 : '',
            city : '',
            state : '',
            zipcode : ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        if(this.state.id==='0'){
            return
        }

        PropertyManagementService.retrieveProperty(this.state.id)
                .then(response => this.setState({
                    address1: response.data.address1,
                    address2: response.data.address2,
                    city: response.data.city,
                    state: response.data.state,
                    zipcode: response.data.zipcode
                }))
    }

    validate(values){
        let errors = {}
        if(!values.address1){
            errors.address1 = 'Enter an address'
        }

        return errors
    }

    onSubmit(values){ 
        //let username = AuthenticationService.getLoggedInUserName()

        let property = {
            id: this.state.id,
            address1: values.address1,
            address2: values.address2,
            city: values.city,
            state: values.state,
            zipcode: values.zipcode
        }


        if (this.state.id==='0') {
            PropertyManagementService.createProperty(property)
            .then(() => this.props.history.push('/properties'))
        } else {
            PropertyManagementService.updateProperty(this.state.id, property)
            .then(() => this.props.history.push('/properties'))
        }
    }

    render(){
        let {address1, address2, city, state, zipcode} = this.state
        return (
            <div>
                <h1 className="text-center">Property</h1>
                <div className="container">
                    <Formik
                        initialValues={{address1, address2, city, state, zipcode}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) =>(
                                <Form>
                                    <ErrorMessage name="address1" conponent="div" 
                                                                className="alert alert-warning"/>                                    
                                    <fieldset className="form-group">
                                        <label>Address 1</label>
                                        <Field className="form-control" type="text" name="address1"/>
                                    </fieldset>      
                                    <fieldset className="form-group">
                                        <label>Address 2</label>
                                        <Field className="form-control" type="text" name="address2"/>
                                    </fieldset>      
                                    <fieldset className="form-group">
                                        <label>City</label>
                                        <Field className="form-control" type="text" name="city"/>
                                    </fieldset>      
                                    <fieldset className="form-group">
                                        <label>State</label>
                                        <Field className="form-control" type="text" name="state"/>
                                    </fieldset>      
                                    <fieldset className="form-group">
                                        <label>Zipcode</label>
                                        <Field className="form-control" type="text" name="zipcode"/>
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

export default AddEditPropertyComponent