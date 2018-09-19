import React from 'react';
import ProjectForm from './projectForm';
import { connect } from 'react-redux';
import { addProject } from '../../actions/projects'


const AddProject = (props) => (
    <div>
        
        <ProjectForm
            onSubmitProject={(project) => {
                props.dispatch(addProject(project));
                //props.history.push('/');
            }}
        />
    </div>
);

export default connect()(AddProject);