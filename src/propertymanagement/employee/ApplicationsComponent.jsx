import React, {Component} from 'react'
import PropertyManagementService from '../../api/PropertyManagementService.js'

class ApplicationsComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            applications : [],
            properties : [],
            id : 0,
            message: null
        }
        
        this.refreshApplications = this.refreshApplications.bind(this)
        this.refreshProperties = this.refreshProperties.bind(this)
    }

    componentDidMount(){
        this.refreshProperties(); 
        // this.refreshApplications();
    }

    refreshProperties(){
        PropertyManagementService.getAllProperties()
          .then(
              response => {
                this.setState({properties : response.data})
            }
          )
    }

    refreshApplications(propertyIdentifier){
        if(propertyIdentifier === undefined){
            PropertyManagementService.getAllApplications()
            .then(
                response => {
                  this.setState({applications : response.data})
              }
            )
        }
        else{
            PropertyManagementService.getAllApplicationsWithPropertyId(propertyIdentifier)
            .then(
                response => {
                  this.setState(
                      {
                          applications : response.data,
                          id : propertyIdentifier
                        }
                    )
              }
            )
        }        
    }

    viewApplicationClicked(id){
        this.props.history.push(`/applications/${id}`)
    }

    render(){
        const { id } = this.state;
        return(
            <div>
                <h1 className="text-center">List of Applications</h1>
                {this.state.message && <div className="alert alert-success text-center">{this.state.message}</div>}
                <div className="container">
                    <div className="form-group">
                        <label>Property Address</label>
                        <select onChange={(e) => this.refreshApplications(e.target.value)} value={id} className="form-control">
                            <option value="">--Select--</option>
                                {
                                    this.state.properties.map(
                                        property => 
                                        <option  key={property.id} value={property.id}>{property.address1}, {property.address2}, {property.city}, {property.state}, {property.zipcode}</option>
                                    )
                                }
                        </select>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Legal Name</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.applications.map(
                                    application => 
                                    <tr key={application.id}>
                                        <td>{application.id}</td>
                                        <td>{application.legalName}</td>
                                        {/* <td><button onClick={() => this.updatePropertyClicked(property.id)} className="btn btn-success">Update</button></td> */}
                                        <td><button className="btn btn-success" onClick={() => this.viewApplicationClicked(application.id)}>View</button></td>
                                    </tr>
                                )                            
                            }
                        </tbody>
                    </table>                
                </div>
            </div>
        )
    }
}

export default ApplicationsComponent