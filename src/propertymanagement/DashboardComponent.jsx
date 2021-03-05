import React, {Component} from 'react'

class DashboardComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
        this.propertiesClicked = this.propertiesClicked.bind(this)
        this.usersClicked = this.usersClicked.bind(this)
        
    }

    // componentDidMount(){
    //  //   this.refreshProperties();
    // }

    usersClicked(){
        this.props.history.push('/users')
    }

    propertiesClicked(){
        this.props.history.push('/properties')
    }

    render(){
        return(
            <div>
                <h1 className="text-center">Dashboard</h1>
                <div className="container">                    
                    <div className="row">
                        <button className="btn btn-success" onClick={this.usersClicked}>Users</button>
                        <button className="btn btn-success" onClick={this.propertiesClicked}>Properties</button>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default DashboardComponent