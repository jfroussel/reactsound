import React, { Component } from 'react';
import ProjectForm from './projectForm';
import { connect } from 'react-redux';
import { addProject } from '../../actions/projects'



class AddProject extends Component {

    render() {
        console.log('USERID')
        return (
            <div>
                
                <ProjectForm
                    onSubmitProject={(project) => {
                        console.log('PROPS / : ', this.props)
                        this.props.dispatch(addProject(this.props.uid, project));
                        //props.history.push('/');
                    }}
                />
            </div>
        )
    }

}


export default connect()(AddProject);