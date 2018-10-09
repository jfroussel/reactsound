import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPlaylists, removePlaylist } from '../actions/playlist'
import Card from '../widgets/Card'
import AddPlaylist from '../components/playlist/addPlaylist'

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
    removePlaylist(id) {
        this.props.dispatch(removePlaylist({ id }));
    }
    render() {
        const { playlists } = this.props
        console.log('PLAYLISTS PROPS ', this.props)

        return (
            <div className="container pt-5">
                <div className="text-center">
                    <h3 className="text-uppercase">your ({playlists.length}) playlists</h3>
                    <button
                        className="btn btn-success"
                        data-toggle="modal" data-target="#addNewPlaylist"
                    >
                        Create new playlist
                    </button>
                </div>
                <div className="container pt-5">
                    <div className="row">
                        {playlists.map((playlist, index) => {
                            return (
                                <div className="col-4" key={index}>
                                    <Card
                                        uid={playlist.id}
                                        title={playlist.title}
                                        description={playlist.description}
                                        url={`/playlists/${playlist.id}`}
                                        btn1={'Edit'}
                                        btn2={'Delete'}
                                        category={'playlists'}
                                        memberID={this.state.uid}
                                    />
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="modal fade" id="addNewPlaylist" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-muted" id="exampleModalLabel">Add new playlist</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddPlaylist uid={this.state.uid} />
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
        playlists: state.playlists,
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPlaylists, removePlaylist, AddPlaylist }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
