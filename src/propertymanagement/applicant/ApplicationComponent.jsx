import React, {Component} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropertyManagementService from '../../api/PropertyManagementService.js'
import AuthenticationService from '../../propertymanagement/authentication/AuthenticationService.js'

class ApplicationComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            properties : [],
            id : this.props.match.params.id,
            userId : '',
            username : '',
            legalName : '',
            creditScore : '',
            monthlyIncome : '',
            moveInDate : '',
            propertyId : ''
        }
        
        this.refreshProperties = this.refreshProperties.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
        // this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        this.refreshProperties(); 
    }

    refreshProperties(){
        PropertyManagementService.getAllProperties()
          .then(
              response => {
                this.setState({properties : response.data})
            }
          )
    }

    async onSubmit(values){ 
        let username = AuthenticationService.getLoggedInUserName()
        
        await PropertyManagementService.retrieveUser(username)
        .then(response => this.setState({
            userId : response.data.id,
            username : response.data.username
        }))

        let application = {
            id: 0,
            userId: this.state.userId,
            legalName : values.legalName,
            creditScore : values.creditScore,
            monthlyIncome : values.monthlyIncome,
            moveInDate : values.moveInDate,
            propertyId : values.propertyId
        }

        PropertyManagementService.createApplication(application)
        .then(() => this.props.history.push('/applicantdashboard'))
    }

    render(){
        let {userId, legalName, creditScore, monthlyIncome, moveInDate, propertyId} = this.state
        return (
            <div>
                <h1 className="text-center">Application</h1>
                <div className="container">
                    <Formik
                        initialValues={{userId, legalName, creditScore, monthlyIncome, moveInDate, propertyId}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) =>(
                                <Form>
                                    <ErrorMessage name="address1" conponent="div" className="alert alert-warning"/>                                    
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
                                        <label>Preferred Move In Date</label>
                                        <Field className="form-control" type="date" name="moveInDate"/>
                                    </fieldset>  
                                    <fieldset className="form-group">
                                        <label>Property Address</label>
                                        <Field className="form-control" as="select" name="propertyId">                                        
                                        <option value="">--Select--</option>
                                        {
                                            this.state.properties.map(
                                                property => 
                                                <option key={property.id} value={property.id}>{property.address1}, {property.address2}, {property.city}, {property.state}, {property.zipcode}</option>
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

export default ApplicationComponent