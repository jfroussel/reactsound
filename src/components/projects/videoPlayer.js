import React, { Component } from 'react';
import { Player } from 'video-react'
import "../../../node_modules/video-react/dist/video-react.css";

class VideoPlayer extends Component {
    render() {
        return (
            <div className="col-sm-4 pt-5">
                <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
                <div className="row">
                    <form>
                        <div className="form-group">
                            <label for="projectVideo">Upload your video</label>
                            <input type="file" className="form-control-file" id="projectVideo" />
                        </div>
                        <div className="form-group">
                            <label for="projectYoutube">Or paste your youtube link</label>
                            <input type="text" className="form-control-file" id="projectYoutube" />
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default VideoPlayer;
