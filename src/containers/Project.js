import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProjects } from '../actions/projects'
import Card from '../widgets/Card'

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

    render() {
        const { projects } = this.props
        return (
            <div className="container pt-5">
                <div className="text-center">
                    <h3 className="text-uppercase">your projects</h3>
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
                                        btn2={'Delete'} />
                                    <br />
                                </div>
                            )
                        })}
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
    return bindActionCreators({ getProjects }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)



