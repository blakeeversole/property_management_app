import React, {Component} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropertyManagementService from '../../api/PropertyManagementService.js'
//import AuthenticationService from './AuthenticationService.js'

class AddEditApplicationComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            properties : [],
            id : this.props.match.params.id,
            legalName : '',
            creditScore : '',
            monthlyIncome : '',
            moveInDate : '',
            propertyId : '',
            propertyAddress : '',
            userId : '',
            userName : ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        this.refreshProperties(); 
        if(this.state.id==='0'){
            return
        }

        PropertyManagementService.retrieveApplication(this.state.id)
                .then(response => this.setState({
                    legalName : response.data.legalName,
                    creditScore : response.data.creditScore,
                    monthlyIncome : response.data.monthlyIncome,
                    moveInDate : response.data.moveInDate,
                    propertyId : response.data.propertyId,
                    propertyAddress : response.data.propertyAddress,
                    userId : response.data.userId,
                    userName : response.data.userName
                }))
    }

    refreshProperties(){
        PropertyManagementService.getAllProperties()
          .then(
              response => {
                this.setState({properties : response.data})
            }
          )
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
            legalName : values.legalName,
            creditScore : values.creditScore,
            monthlyIncome : values.monthlyIncome,
            moveInDate : values.moveInDate,
            propertyId : values.propertyId,
            propertyAddress : values.propertyAddress,
            userId : values.userId,
            userName : values.userName
        }

        PropertyManagementService.updateApplication(this.state.id, property)
        .then(() => this.props.history.push(`/applications/${this.state.id}`))
        
    }

    render(){
        let {legalName, creditScore, monthlyIncome, moveInDate, propertyId, propertyAddress, userId, userName} = this.state
        return (
            <div>
                <h1 className="text-center">Edit {this.state.legalName}'s Application</h1>
                <div className="container">
                    <Formik
                        initialValues={{legalName, creditScore, monthlyIncome, moveInDate, propertyId, propertyAddress, userId, userName}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) =>(
                                <Form>                                   
                                    <fieldset className="form-group">
                                        <label>Legal Name</label>
                                        <Field className="form-control" type="text" name="legalName"/>
                                    </fieldset>      
                                    <fieldset className="form-group">
                                        <label>Credit Score</label>
                                        <Field className="form-control" type="text" name="creditScore"/>
                                    </fieldset>      
                                    <fieldset className="form-group">
                                        <label>Monthly Income</label>
                                        <Field className="form-control" type="text" name="monthlyIncome"/>
                                    </fieldset>      
                                    <fieldset className="form-group">
                                        <label>Move In Date</label>
                                        <Field className="form-control" type="text" name="moveInDate"/>
                                    </fieldset>    
                                    <fieldset className="form-group">
                                        <label>Property</label>
                                        <Field className="form-control" as="select" name="propertyId">                                        
                                        <option value="">--Select--</option>
                                                {
                                                    this.state.properties.map(
                                                        property => 
                                                        <option  key={property.id} value={property.id}>{property.address1}, {property.address2}, {property.city}, {property.state}, {property.zipcode}</option>
                                                    )
                                                }
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

export default AddEditApplicationComponent