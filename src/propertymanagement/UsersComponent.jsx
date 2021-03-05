import React, {Component} from 'react'
import PropertyManagementService from '../api/PropertyManagementService.js'

class UsersComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            users : []
        }
        
        this.refreshUsers = this.refreshUsers.bind(this)
    }

    componentDidMount(){
        this.refreshUsers();
    }

    refreshUsers(){
        PropertyManagementService.getAllUsers()
          .then(
              response => {
                this.setState({users : response.data})
            }
          )
    }

    // addPropertyClicked(){
    //     this.props.history.push('/properties/-1')
    // }

    // updatePropertyClicked(id){
    //     this.props.history.push(`/properties/${id}`)
    // }

    render(){
        return(
            <div>
                <h1 className="text-center">List of Users</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user => 
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                )                            
                            }
                        </tbody>
                    </table>
                    {/* <div className="row">
                        <button className="btn btn-success" onClick={this.addPropertyClicked}>Add</button>
                    </div> */}
                
                </div>
            </div>
        )
    }
}

export default UsersComponent