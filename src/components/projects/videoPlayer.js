import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/storage'
import { Player } from 'video-react'
import "../../../node_modules/video-react/dist/video-react.css";
import logo from '../../assets/logo.png'
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
const style = {
    logo: {
        width: 60,
        height: 60
    }
}

class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUploading: false,
            progress: 0,
            filename: '',
            videoUrl: ''
        }
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = (progress) => this.setState({ progress });
    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        this.notifySuccess(error)
    }
    handleUploadSuccess = (filename, props) => {
        this.setState({filename: filename, progress: 100, isUploading: false });
        firebase.storage().ref(`projectsVideo`).child(filename).getDownloadURL().then(url => this.setState({ videoUrl: url }));
    };

    render() {
        const opts = {
            height: '390',
            width: '550',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 2,
                modestbranding: 1,
                showinfo: 0,
                rel: 0
            }
        };


        return (
            <div className="pt-1">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" style={style.logo} alt="" />
                    </a>
                    <div>
                        {this.state.isUploading &&
                            <Progress percent={this.state.progress} />

                        }
                        {this.state.filename}


                        <CustomUploadButton
                            accept="image/audio/*"
                            name="avatar"
                            //randomizeFilename
                            storageRef={firebase.storage().ref(this.props.author)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                            style={{ backgroundColor: '#dc3545', cursor: 'pointer', color: 'white', padding: 10, borderRadius: 4 }}
                        >
                            Upload your video(max 100Mo)
                        </CustomUploadButton>
                       
                    </div>
                </nav>
                <Player
                    autoPlay
                    poster={logo}
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
            </div>
        );
    }
}

export default VideoPlayer;
