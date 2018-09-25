import React, { Component } from 'react';
import ProjectList from './projectList'
import AddProject from './addProject'
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
            <div className="container-fluid">
                <h3>Projects dashboard</h3>
                <div className="row">
                    <div className="col-8">
                        <ProjectList uid={uid} />
                    </div>
                    <div className="col-4">
                        <AddProject uid={uid} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Project;
