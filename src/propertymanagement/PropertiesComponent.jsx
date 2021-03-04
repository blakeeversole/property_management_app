import React, {Component} from 'react'
import PropertyManagementService from '../api/PropertyManagementService.js'
import AuthenticationService from '../propertymanagement/authentication/AuthenticationService.js'

class PropertiesComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            properties : []
        }
        
        this.refreshProperties = this.refreshProperties.bind(this)
    }

    componentDidMount(){
        this.refreshProperties();
    }

    refreshProperties(){
        // let username = AuthenticationService.getLoggedInUserName()        
        // AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, this.state.response.data.token)
        //AuthenticationService.setupAxiosInterceptors(this.state.response.data.token)
        PropertyManagementService.getAllProperties()
          .then(
              response => {
                this.setState({properties : response.data})
            }
          )
    }

    addPropertyClicked(){
        this.props.history.push('/properties/-1')
    }

    updatePropertyClicked(id){
        this.props.history.push(`/properties/${id}`)

        // /todos/${id}
        // let username = AuthenticationService.getLoggedInUserName()
        // TodoDataService.deleteTodo(username,id)
        //     .then(
        //         response => {
        //             this.setState({message : `Delete of todo ${id} Successful`})
        //             this.refreshTodos()
        //         }
        //     )
    }

    render(){
        return(
            <div>
                <h1 className="text-center">List of Properties</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Address 1</th>
                                <th>Address 2</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zipcode</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.properties.map(
                                    property => 
                                    <tr key={property.id}>
                                        <td>{property.id}</td>
                                        <td>{property.address1}</td>
                                        <td>{property.address2}</td>
                                        <td>{property.city}</td>
                                        <td>{property.state}</td>
                                        <td>{property.zipcode}</td>
                                        {/* <td><button className="btn btn-success">Update</button></td> */}
                                        <td><button onClick={() => this.updatePropertyClicked(property.id)} className="btn btn-success">Update</button></td>
                                        <td><button className="btn btn-warning">Delete</button></td>
                                        {/* <td><button onClick={() => this.deleteTodoClicked(todo.id)} className="btn btn-warning">Delete</button></td> */}
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