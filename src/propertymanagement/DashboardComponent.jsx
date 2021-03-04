import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropertyManagementService from '../api/PropertyManagementService.js'
import AuthenticationService from '../propertymanagement/authentication/AuthenticationService.js'

class DashboardComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
        this.propertiesClicked = this.propertiesClicked.bind(this)
        
    }

    // componentDidMount(){
    //  //   this.refreshProperties();
    // }

    propertiesClicked(){
        this.props.history.push('/properties')
    }

    render(){
        return(
            <div>
                <h1 className="text-center">Dashboard</h1>
                <div className="container">                    
                    <div className="row">
                    
                    {/* <button className="btn btn-success"><Link to="/properties" >Properties</Link></button> */}
                        <button className="btn btn-success" onClick={this.propertiesClicked}>Properties</button>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default DashboardComponent