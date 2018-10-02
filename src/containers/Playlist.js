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
            uid:null
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            if(user) {
                this.setState({uid:user.uid})
                this.props.getPlaylists(this.state.uid)
            }
        });
        
    }
    
    render() {
        const { playlists } = this.props
        const uid = this.state.uid
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <PlaylistList uid={uid} playlists={playlists} />
                    </div>
                    <div className="col-4">
                        <AddPlaylist uid={uid} />
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

export default connect(mapStateToProps,mapDispatchToProps)(Playlist)
