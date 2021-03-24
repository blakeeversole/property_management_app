import React, {Component} from 'react'
import moment from 'moment'
import PropertyManagementService from '../../api/PropertyManagementService.js'
//import AuthenticationService from './AuthenticationService.js'

class ApplicationEmployeeComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            firstName : '',
            lastName : '',
            creditScore : '',
            monthlyIncome : '',
            moveInDate : '',
            propertyId : '',
            propertyAddress : '',
            userId : '',
            userName : ''
        }

        this.updateApplicationClicked = this.updateApplicationClicked.bind(this)
        this.acceptApplication = this.acceptApplication.bind(this)
        this.updateArchiveApplication = this.updateArchiveApplication.bind(this)
    }

    componentDidMount(){
        if(this.state.id==='0'){
            return
        }

        PropertyManagementService.retrieveApplication(this.state.id)
                .then(response => this.setState({
                    firstName : response.data.firstName,
                    lastName : response.data.lastName,
                    creditScore : response.data.creditScore,
                    monthlyIncome : response.data.monthlyIncome,
                    moveInDate : response.data.moveInDate,
                    propertyId : response.data.propertyId,
                    propertyAddress : response.data.propertyAddress,
                    userId : response.data.userId,
                    userName : response.data.userName,
                    isArchived : response.data.isArchived
                }))
    }

    updateApplicationClicked(id){
        let application = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
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

    acceptApplication(){
        if(window.confirm(`Are you sure you want to ACCEPT this application for ${this.state.propertyAddress}`)){
            //move applicant to tenant role
            //allow all applicants to be archived and stay attached to property
            //
        }
    }

    updateArchiveApplication(isArchivedVar){
        var message = '';
        if(isArchivedVar === true){
            message = 'Are you sure you want to ARCHIVE this application?'
        }
        else{
            message = 'Are you sure you want to REMOVE ARCHIVE of this application?'
        }           

        if(window.confirm(message)){
            let application = {
                id: this.state.id,
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                creditScore : this.state.creditScore,
                monthlyIncome : this.state.monthlyIncome,
                moveInDate : this.state.moveInDate,
                propertyId : this.state.propertyId,
                propertyAddress : this.state.propertyAddress,
                userId : this.state.userId,
                userName : this.state.userName,
                isArchived: isArchivedVar
            }

            PropertyManagementService.updateApplication(this.state.id, application)
            .then(() => this.props.history.push('/applications'))
        }
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
                                <div className="col-8">{this.state.firstName} {this.state.lastName}</div>
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
                            <div className="col-12 text-center">
                                <button className="btn btn-warning" onClick={() => this.updateApplicationClicked(this.state.id)}>Edit</button>
                            </div>
                            <div className="col-12 text-center">
                                <button className="btn btn-success" onClick={() => this.acceptApplication()}>Accept as Tenant</button>
                            </div>
                            {this.state.isArchived === false &&
                                <div className="col-12 text-center">
                                    <button className="btn btn-danger" onClick={() => this.updateArchiveApplication(true)}>Archive</button>
                                </div>
                            }
                            {this.state.isArchived === true &&
                                <div className="col-12 text-center">
                                    <button className="btn btn-danger" onClick={() => this.updateArchiveApplication(false)}>Remove from Archived</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>            
            </div>
        )
    }
}

export default ApplicationEmployeeComponent