import React, { Component } from 'react';
import VideoPlayer from '../components/projects/videoPlayer'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editProject } from '../actions/projects'


class DetailProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectID: ''
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
        console.log('DETAIL PROJECT ', this.props)

        return (

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="font-weight-light">Detail playlist </h4>
                    </div>
                    <div className="col-sm-12">
                        <ul>
                            {
                                project.map((item, index) => {
                                    return (
                                        <li key={index}>{item.key} : {item.value}</li>
                                    )
                                })
                            }
                            
                        </ul>
                    </div>

                </div>
            </div>



        );
    }
}
const mapStateToProps = (state) => {
    return {
        project: state.projects
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editProject }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProject)


