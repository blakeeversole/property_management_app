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
            legalName : this.props.location.state.legalName,
            creditScore : this.props.location.state.creditScore,
            monthlyIncome : this.props.location.state.monthlyIncome,
            moveInDate : this.props.location.state.moveInDate,
            propertyId : this.props.location.state.propertyId,
            propertyAddress : this.props.location.state.propertyAddress,
            userId : this.props.location.state.userId,
            userName : this.props.location.state.userName,
            isArchived: this.props.location.state.isArchived
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        PropertyManagementService.getAllProperties()
          .then(
              response => {
                this.setState({properties : response.data})
            }
          )

        if(this.state.id==='0'){
            return
        }
    }

    onSubmit(values){ 
        let application = {
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

        PropertyManagementService.updateApplication(this.state.id, application)
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