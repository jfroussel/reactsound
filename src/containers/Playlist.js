import React, { Component } from 'react';
import PlaylistList from '../components/playlist/playlistList'
import AddPlaylist from '../components/playlist/addPlaylist'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPlaylists, removePlaylist } from '../actions/playlist'


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
        const uid = this.state.uid
        return (
            <div className="container pt-5">
                <h4>playlist dashboard</h4>
                <button className="btn btn-primary" data-toggle="modal" data-target="#addNewPlaylist">Add new playlist</button>
                <div className="row">
                    <div className="col-12">
                        <PlaylistList uid={uid} playlists={playlists} />
                    </div>
                </div>
                <div className="modal fade" id="addNewPlaylist" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add new playlist</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddPlaylist uid={uid}/>
                            </div>
                        </div>
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
