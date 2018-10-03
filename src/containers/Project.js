import React, { Component } from 'react';
import ProjectList from '../components/projects/projectList'
import AddProject from '../components/projects/addProject'
import firebase from 'firebase/app'
import 'firebase/auth'




class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: false,
            uid:null
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            if(user) {
                this.setState({uid:user.uid})
            }
            
        });
    }
    
    render() {
        const uid = this.state.uid
        return (
            <div className="container pt-5">
                <h3>Projects dashboard</h3>
                <button className="btn btn-primary" data-toggle="modal" data-target="#addNewProject">Add new project</button>

                <div className="row">
                    <div className="col-12">
                        <ProjectList uid={uid} />
                    </div>
                    <div className="modal fade" id="addNewProject" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add new project</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddProject uid={uid}/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Project;
