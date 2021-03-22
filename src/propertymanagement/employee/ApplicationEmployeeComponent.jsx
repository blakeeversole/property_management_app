import React, {Component} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'
import PropertyManagementService from '../../api/PropertyManagementService.js'
//import AuthenticationService from './AuthenticationService.js'

class ApplicationEmployeeComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
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
                    propertyAddress : response.data.propertyAddress,
                    userId : response.data.userId,
                    userName : response.data.userName
                }))
    }

    updateApplicationClicked(id){
        let application = {
            legalName : this.state.legalName,
            creditScore : this.state.creditScore,
            monthlyIncome : this.state.monthlyIncome,
            moveInDate : this.state.moveInDate,
            propertyId : this.state.propertyId,
            propertyAddress : this.state.propertyAddress,
            userId : this.state.userId,
            userName : this.state.userName
        }

        this.props.history.push(`/applicationedit/${id}`, application)
    }

    render(){
        return (
            <div>
                <h1 className="text-center">Application</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-4">Legal Name: </div>
                                <div className="col-8">{this.state.legalName}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Credit Score: </div>
                                <div className="col-8">{this.state.creditScore}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Monthly Income: </div>
                                <div className="col-8">${this.state.monthlyIncome}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Move In Date: </div>
                                <div className="col-8">{moment(this.state.moveInDate).format('MM/DD/YYYY')}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Property Address: </div>
                                <div className="col-8">{this.state.propertyAddress}</div>
                            </div>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-success" onClick={() => this.updateApplicationClicked(this.state.id)}>Edit</button>
                        </div>
                    </div>
                    
                    
                </div>            
            </div>
        )
    }
}

export default ApplicationEmployeeComponent