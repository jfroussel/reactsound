import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import VideoPlayer from '../components/projects/videoPlayer'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editProject } from '../actions/project'




class DetailProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectID: '',
            isLogged: false,
            uid: null,
        }
    }

    componentWillMount() {

        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            if (user) {
                this.setState({ uid: user.uid })
                this.setState({ projectID: this.props.match.params })
                this.props.editProject(user.uid, this.props.match.params.id)
            }
        })
    }



    render() {
        const { project } = this.props


        return (

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="container-fluid text-left pl-5">
                        
                            <NavLink className="btn btn-sm btn-secondary" to='/projects' activeClassName='activeNav'>
                                Return projects
                            </NavLink>
                       
                    </div>
                    <div className="col-sm-12 text-center">
                        <h3 className="text-uppercase">Project title : {project.title} </h3>
                        <p>Description : {project.description}</p>
                    </div>
                    <div className="col-sm-12">

                    </div>

                </div>
            </div>



        );
    }
}
const mapStateToProps = (state) => {
    return {
        project: state.project
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editProject }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProject)


