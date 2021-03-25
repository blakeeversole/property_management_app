import React, {Component} from 'react'
import PropertyManagementService from '../../api/PropertyManagementService.js'

class TenantDashboardComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            signedLease : false
        }
         this.leaseButtonClicked = this.leaseButtonClicked.bind(this)
        // this.usersClicked = this.usersClicked.bind(this)
        
    }

    componentDidMount(){           
        PropertyManagementService.getIfUserHasApplied()
        .then((response) =>{
            if(response.data === '') {
                this.setState({signedLease : true})
            }                          
        })
    }

    // usersClicked(){
    //     this.props.history.push('/users')
    // }

    leaseButtonClicked(){
        this.props.history.push('/lease')
    }

    render(){
        return(
            <div>
                <h1 className="text-center">Tenant Dashboard</h1>
                <div className="container">                    
                    <div className="row">
                        {this.state.signedLease === false && <button className="btn btn-success" onClick={this.leaseButtonClicked}>Lease</button>}  
                        <button className="btn btn-success">Payment</button>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default TenantDashboardComponent