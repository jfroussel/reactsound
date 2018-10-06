import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPlaylists, removePlaylist } from '../actions/playlist'
import Card from '../widgets/Card'


class Playlist extends Component {
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
                this.props.getPlaylists(this.state.uid)
            }
        });

    }



    render() {
        const { playlists } = this.props
        
        
        return (
            <div className="container pt-5">
                <div className="text-center">
                <h3 className="text-uppercase">your playlists</h3>
                </div>
                <div className="container pt-5">
                    <div className="row">
                        {playlists.map((playlist, index) => {
                            return (
                                <div className="col-4" key={index}>
                                    <Card uid={playlist.id} title={playlist.title} description={playlist.description} btn1={'Edit'} btn2={'Delete'}  />
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
        playlists: state.playlists
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPlaylists, removePlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
