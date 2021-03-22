import React, {Component} from 'react'
import PropertyManagementService from '../../api/PropertyManagementService.js'

class PropertiesComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            properties : [],
            message: null
        }
        
        this.refreshProperties = this.refreshProperties.bind(this)
        this.addPropertyClicked = this.addPropertyClicked.bind(this)
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

    addPropertyClicked(){
        this.props.history.push('/properties/0')
    }

    viewPropertyClicked(id){
        this.props.history.push(`/propertyprofile/${id}`)
    }

    render(){
        return(
            <div>
                <h1 className="text-center">List of Properties</h1>
                {this.state.message && <div className="alert alert-success text-center">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Address</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.properties.map(
                                    property => 
                                    <tr key={property.id}>
                                        <td>{property.id}</td>
                                        <td>{property.address1} {property.address2} <br></br>
                                        {property.city} {property.state} {property.zipcode}
                                        </td>
                                        <td><button onClick={() => this.viewPropertyClicked(property.id)} className="btn btn-success">View</button></td>
                                        
                                    </tr>
                                )                            
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addPropertyClicked}>Add</button>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default PropertiesComponent