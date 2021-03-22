import React, {Component} from 'react'
import PropertyManagementService from '../../api/PropertyManagementService.js'

class UsersComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            users : [
                {authorities:[]}
            ]
        }
        
        this.refreshUsers = this.refreshUsers.bind(this)
        this.addUserClicked = this.addUserClicked.bind(this)
    }

    componentDidMount() {
        this.refreshUsers();
    }

    refreshUsers(){
        PropertyManagementService.getAllUsers()
          .then(response => {
                this.setState({users : response.data})
            }
          )
          
    }

    addUserClicked(){
        this.props.history.push('/user')
    }

    render(){
        return(
            <div>
                <h1 className="text-center">List of Users</h1>
                <div className="container">
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addUserClicked}>Add</button>
                    </div>
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
                                this.state.users.map((user, index) => (                                        
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                {user.authorities.map((authority, index) => (
                                                    <div key={index}>
                                                        <p>{authority.authority}</p>
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    )
                                )                   
                            }
                        </tbody>
                    </table>
                
                </div>
            </div>
        )
    }
}

export default UsersComponent