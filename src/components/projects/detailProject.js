import React, { Component } from 'react';

class DetailProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectID:''
        }
    }



    componentWillMount() {
      this.setState({projectID:this.props.match.params})
    }



    render() {

        const pid = this.state.projectID

        console.log(pid.id)
        return (
          
                
                    <div className="container">
                        <div className="row contact-details">
                            <div className="col-sm-8 m-auto text-center">
                                <h2 className="font-weight-light">Detail project {pid.id}</h2>
                            </div>
                        </div>
                    </div>
               
            

        );
    }
}

export default DetailProject;
