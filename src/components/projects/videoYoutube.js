import React, { Component } from 'react';
import YouTube from 'react-youtube';
const style = {
    logo: {
        width: 60,
        height: 60
    }
}
class VideoYoutube extends Component {

    
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

        const handleClick = () => {
            return (
                alert('youtube link has been send in your project !')
            )
        }

        return (
            <div className="pt-1">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Logo_of_YouTube_%282013-2015%29.svg" style={style.logo} alt="" />
                    </a>
                    <form className="form-inline">
                        <div className="form-group mx-sm-3 mb-2">
                            <label htmlFor="link" className="sr-only">
                                insert the youtube link</label>
                            <input type="text" className="form-control" id="link" placeholder="insert the youtube link" />
                        </div>
                        <button type="submit" className="btn btn-danger mb-2" onClick={() => handleClick()}>Update</button>
                    </form>
                </nav>
                <YouTube
                    videoId="XWS1IRF_IFA"
                    opts={opts}
                    onReady={this._onReady}

                />

            </div>
        );
    }
}

export default VideoYoutube;
