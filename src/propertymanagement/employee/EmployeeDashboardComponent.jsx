import React, {Component} from 'react'

class EmployeeDashboardComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
        this.usersClicked = this.usersClicked.bind(this)
        this.propertiesClicked = this.propertiesClicked.bind(this)
        this.applicationsClicked = this.applicationsClicked.bind(this)
        
    }

    usersClicked(){
        this.props.history.push('/users')
    }

    propertiesClicked(){
        this.props.history.push('/properties')
    }

    applicationsClicked(){
        this.props.history.push('/applications')
    }

    render(){
        return(
            <div>
                <h1 className="text-center">Employee Changed Dashboard</h1>
                <div className="container">                    
                    <div className="row">
                        <button className="btn btn-success" onClick={this.usersClicked}>Users</button>
                        <button className="btn btn-success" onClick={this.propertiesClicked}>Properties</button>
                        <button className="btn btn-success" onClick={this.applicationsClicked}>Applications</button>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default EmployeeDashboardComponent