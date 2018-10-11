import React, { Component } from 'react';
import { Player } from 'video-react'
import "../../../node_modules/video-react/dist/video-react.css";
import logo from '../../assets/logo.png'

class VideoPlayer extends Component {
    render() {
        return (
            <div className="pt-1">
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
