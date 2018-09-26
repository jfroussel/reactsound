import React, { Component } from 'react';
import PlaylistList from './playlistList'
import AddPlaylist from './addPlaylist'
import firebase from 'firebase/app'
import 'firebase/auth'




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
            }
            
        });
    }
    
    render() {
        const uid = this.state.uid
        return (
            <div className="container-fluid">
                <h3>Playlist dashboard</h3>
                <div className="row">
                    <div className="col-8">
                        <PlaylistList uid={uid} />
                    </div>
                    <div className="col-4">
                        <AddPlaylist uid={uid} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Playlist;
