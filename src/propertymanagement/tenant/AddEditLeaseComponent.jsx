import React, {Component} from 'react'
import { Field, Form, Formik } from 'formik'
import PropertyManagementService from '../../api/PropertyManagementService.js'

class AddEditLeaseComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            endLeaseDate : '',
            leaseSignDate : '',
            moveInDate : '',
            petAddendum : '',
            propertyId : '',
            tenantId : ''
        }

        this.onSubmit = this.onSubmit.bind(this)

        this.onSubmit = this.onSubmit.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
        // this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        if(this.state.id===undefined){   
            PropertyManagementService.getPropertyIdTenantIdUsingUsername()
            .then((response) =>{                
                this.setState({
                    tenantId : response.data[0],
                    propertyId : response.data[1]
                })                         
            })
        }
        else{
            PropertyManagementService.retrieveLease(this.state.id)
            .then(response => this.setState({
                endLeaseDate : response.data.endLeaseDate,
                leaseSignDate : response.data.leaseSignDate,
                moveInDate : response.data.moveInDate,
                petAddendum : response.data.petAddendum,
                propertyId : response.data.propertyId,
                tenantId : response.data.tenantId
            }))
        }

        
    }

    // validate(values){
    //     let errors = {}
    //     if(!values.address1){
    //         errors.address1 = 'Enter an address'
    //     }

    //     return errors
    // }

    onSubmit(values){ 
        let lease = {
            id: this.state.id,
            endLeaseDate : values.endLeaseDate,
            leaseSignDate : values.leaseSignDate,
            moveInDate : values.moveInDate,
            petAddendum : values.petAddendum,
            propertyId : values.propertyId,
            tenantId : values.tenantId
        }


        if (this.state.id===undefined) {
            PropertyManagementService.createLease(lease)
            .then(() => this.props.history.push('/tenantdashboard'))
        } else {
            PropertyManagementService.updateLease(this.state.id, lease)
            .then(() => this.props.history.push('/tenantdashboard'))
        }
    }

    render(){
        let {endLeaseDate, leaseSignDate, moveInDate, petAddendum, propertyId, tenantId} = this.state
        return (
            <div>
                <h1 className="text-center">Lease</h1>
                <div className="container">
                    <Formik
                        initialValues={{endLeaseDate, leaseSignDate, moveInDate, petAddendum, propertyId, tenantId}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) =>(
                                <Form>            
                                    <fieldset className="form-group">
                                        <label>Move In Date</label>
                                        <Field className="form-control" type="date" name="moveInDate"/>
                                    </fieldset>        
                                    <fieldset className="form-group">
                                        <label>Lease Signed Date</label>
                                        <Field className="form-control" type="date" name="leaseSignDate"/>
                                    </fieldset>                           
                                    <fieldset className="form-group">
                                        <label>End Lease Date</label>
                                        <Field className="form-control" type="date" name="endLeaseDate"/>
                                    </fieldset>    
                                    <label>Pet Addendum?</label>
                                    <fieldset className="form-group" role="group" aria-labelledby="my-radio-group">
                                        <label className="col-2">
                                            <Field className="col-2" type="radio" name="petAddendum" value="true"/>
                                            Yes
                                        </label>
                                        <label className="col-2">
                                            <Field className="col-2" type="radio" name="petAddendum" value="false"/>
                                            No
                                        </label>                                        
                                    </fieldset>      
                                    <button className="btn btn-success" type="submit">Save</button>   
                                </Form>
                            )
                        }
                    </Formik>

                </div>            
            </div>
        )
    }
}

export default AddEditLeaseComponent