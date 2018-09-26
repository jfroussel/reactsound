import React, { Component } from 'react';
import VideoPlayer from './videoPlayer'
import ProjectPlaylist from './projectPlaylist'


class DetailProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectID: ''
        }
    }



    componentWillMount() {
        this.setState({ projectID: this.props.match.params })
    }



    render() {

        const pid = this.state.projectID

        console.log(pid.id)
        return (

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="font-weight-light">Detail project {pid.id}</h4>
                    </div>
                </div>
                <div className="row">
                    <VideoPlayer />
                    <div className="col-sm-8">
                        <ProjectPlaylist />
                    </div>
                </div>
            </div>



        );
    }
}

export default DetailProject;
