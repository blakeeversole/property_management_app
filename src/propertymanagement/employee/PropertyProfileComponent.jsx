import React, {Component} from 'react'
import PropertyManagementService from '../../api/PropertyManagementService.js'
//import AuthenticationService from './AuthenticationService.js'

class PropertyProfileComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            address1 : '',
            address2 : '',
            city : '',
            state : '',
            zipcode : '',
            canDelete : '',
            message: ''
        }
        
        this.updatePropertyClicked = this.updatePropertyClicked.bind(this)
        this.deletePropertyClicked = this.deletePropertyClicked.bind(this)
    }

    componentDidMount(){
        if(this.state.id==='0'){
            return
        }

        PropertyManagementService.retrieveProperty(this.state.id)
                .then(response => this.setState({
                    address1: response.data.address1,
                    address2: response.data.address2,
                    city: response.data.city,
                    state: response.data.state,
                    zipcode: response.data.zipcode,
                    canDelete: response.data.canDelete
                }))
    }    

    updatePropertyClicked(id){
        this.props.history.push(`/properties/${id}`)
    }

    deletePropertyClicked(id) {
        PropertyManagementService.allowedToDeleteProperty(id)
        .then(response => {
                if(response.data === true){        
                    if(window.confirm('Are you sure you want to delete this property?')){
                    PropertyManagementService.deleteProperty(id)            
                    .then(() => this.props.history.push('/properties/'))
                    }
                }
                else{
                    this.setState(
                        {
                            message: 'Error. Property attached to applications.'
                        }
                      )
                }
            })
    }

    render(){
        return (
            <div>
                <h1 className="text-center">Property</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-4">Address: </div>
                                <div className="col-8">{this.state.address1} {this.state.address2} <br></br>
                                        {this.state.city} {this.state.state} {this.state.zipcode}</div>
                            </div>
                        </div>
                        <div className="col-6">
                        <button onClick={() => this.updatePropertyClicked(this.state.id)} className="btn btn-success">Edit</button>
                        {this.state.message && <div className="text-danger">{this.state.message}</div>}
                        <button onClick={() => this.deletePropertyClicked(this.state.id)} className="btn btn-warning">Delete</button>
                        </div>
                    </div>
                    
                    
                </div>            
            </div>
        )
    }
}

export default PropertyProfileComponent