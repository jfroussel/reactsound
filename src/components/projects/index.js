import React, { Component } from 'react';
import ProjectList from './projectList'
import AddProject from './addProject'

class Project extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h3>Projects dashboard</h3>
                <div className="row">
                    <div className="col-8">
                        <ProjectList />
                    </div>
                    <div className="col-4">
                        <AddProject />
                    </div>
                </div>

            </div>
        );
    }
}

export default Project;
