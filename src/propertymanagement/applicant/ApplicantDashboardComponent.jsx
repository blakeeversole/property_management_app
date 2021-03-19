import React, {Component} from 'react'
import AuthenticationService from '../../propertymanagement/authentication/AuthenticationService.js'
import PropertyManagementService from '../../api/PropertyManagementService.js'

class ApplicantDashboardComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            message : ''
        }
        this.applicationButtonClicked = this.applicationButtonClicked.bind(this)        
    }

    async componentDidMount(){        
        await PropertyManagementService.getIfUserHasApplied()
        .then((response) =>{
            if(response.data !== '') {
                this.setState({message:"Congratulations! You submitted an application! A property management representative will contact you within 3 business days."})
            }                          
        })
    }

    applicationButtonClicked(){
        this.props.history.push('/application')
    }

    render(){
        return(
            <div>
                <h1 className="text-center">Applicant Dashboard</h1>
                <div className="container">                    
                    <div className="row">
                    {this.state.message !== '' && <div>{this.state.message}</div>}  
                        {this.state.message === '' && <button className="btn btn-success" onClick={this.applicationButtonClicked}>Application</button>}  
                        
                    </div>
                
                </div>
            </div>
        )
    }
}

export default ApplicantDashboardComponent