import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProjects, removeProject } from '../actions/projects'
import Card from '../widgets/Card'
import AddProject from '../components/projects/addProject'

class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: false,
            uid: null
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            if (user) {
                this.setState({ uid: user.uid })
                this.props.getProjects(user.uid)
            }
        });
    }
    removeProject(id) {
        this.props.dispatch(removeProject({ id }));
    }
    render() {
        const { projects } = this.props
        return (
            <div className="container pt-5">
                <div className="text-center">
                    <h3 className="text-uppercase">your ({projects.length}) projects </h3>
                    <br />
                    <button
                        className="btn btn-success"
                        data-toggle="modal" data-target="#addNewProject"
                    >
                        Create new project
                    </button>
                </div>
                <div className="container pt-5">
                    <div className="row">
                        {projects.map((project, index) => {
                            return (
                                <div className="col-4" key={index}>
                                    <Card
                                        uid={project.id}
                                        title={project.title}
                                        description={project.description}
                                        url={`/projects/${project.id}`}
                                        btn1={'Edit'}
                                        btn2={'Delete'}
                                        category={'projects'}
                                        memberID={this.state.uid}
                                    />
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="modal fade" id="addNewProject" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-muted" id="exampleModalLabel">Add new project</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddProject uid={this.state.uid} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        projects: state.projects
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getProjects, AddProject, removeProject }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Project)



