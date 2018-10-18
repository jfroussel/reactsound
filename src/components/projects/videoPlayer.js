import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/storage'
import { Player } from 'video-react'
import "../../../node_modules/video-react/dist/video-react.css";
import logo from '../../assets/logo.png'
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";


class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUploading: false,
            progress: 0,
            filename: '',
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/myapp-a124d.appspot.com/o/projectsVideo%2Fangelina-songs-tommy-emmanuel.mp4?alt=media&token=64c186dc-c68d-49da-9eba-1231868eab8c"
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
        return (
            <div className="pt-1">
                <nav className="navbar navbar-light bg-light">
                    <div>
                        {this.state.isUploading &&
                            <Progress percent={this.state.progress} />

                        }
                        {this.state.filename}
                        <CustomUploadButton
                            accept="image/audio/video/*"
                            name="avatar"
                            //randomizeFilename
                            storageRef={firebase.storage().ref('projectsVideo')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                            style={{ backgroundColor: '#dc3545', cursor: 'pointer', color: 'white', padding: 10, borderRadius: 4 }}
                        >
                            Upload video(max 100Mo)
                        </CustomUploadButton>
                       
                    </div>
                </nav>
                <Player
                    autoPlay
                    poster={logo}
                    src={this.state.videoUrl}
                />
            </div>
        );
    }
}

export default VideoPlayer;
