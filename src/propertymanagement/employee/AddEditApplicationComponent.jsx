import React, {Component} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropertyManagementService from '../../api/PropertyManagementService.js'
//import AuthenticationService from './AuthenticationService.js'

class AddEditApplicationComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            legalName : '',
            creditScore : '',
            monthlyIncome : '',
            moveInDate : '',
            propertyId : '',
            userId : ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){
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
                    userId : response.data.userId
                }))
    }

    validate(values){
        let errors = {}
        if(!values.legalName){
            errors.legalName = 'Enter an legal name'
        }

        return errors
    }

    onSubmit(values){ 
        let application = {
            id: this.state.id,
            legalName : values.legalName,
            creditScore : values.creditScore,
            monthlyIncome : values.monthlyIncome,
            moveInDate : values.moveInDate,
            propertyId : values.propertyId,
            userId : values.userId
        }
        
        PropertyManagementService.updateApplication(this.state.id, application)
        .then(() => this.props.history.push('/applications'))
        
    }

    render(){
        // let {legalName, creditScore, monthlyIncome, moveInDate, propertyId, userId} = this.state
        return (
            <div>
                <h1 className="text-center">Application</h1>
                <div className="container">
                    <div className="col-12">
                        {this.state.legalName}
                    </div>
                    <div className="col-12">
                        {this.state.creditScore}
                    </div>
                    <div className="col-12">
                        {this.state.monthlyIncome}
                    </div>
                    <div className="col-12">
                        {this.state.moveInDate}
                    </div>
                    <div className="col-12">
                        {this.state.propertyId}
                    </div>
                    <div className="col-12">
                        {this.state.userId}
                    </div>

                </div>            
            </div>
        )
    }
}

export default AddEditApplicationComponent