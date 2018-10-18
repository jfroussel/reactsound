import React, { Component } from 'react';
import ProjectForm from './projectForm';
import { connect } from 'react-redux';
import { addProject } from '../../actions/projects'

class AddProject extends Component {
    render() {
        return (
            <div>
                
                <ProjectForm
                    onSubmitProject={(project) => {
                        this.props.dispatch(addProject(this.props.uid, project));
                        //props.history.push('/');
                    }}
                />
            </div>
        )
    }

}

export default connect()(AddProject);