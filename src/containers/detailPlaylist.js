import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editPlaylist } from '../actions/list'
import { getSoundsSelected } from '../actions/sounds'
import PlaylistTable from '../components/playlist/playlistTable'
import { getTracks } from '../actions/tracks'


class DetailPlaylist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogged: false,
            uid: null,
            playlistID: '',
            selectedTracks: [],
        }

        this.filteredSounds = this.filteredSounds.bind(this)
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            if (user) {
                this.setState({ uid: user.uid })
                this.setState({ playlistID: this.props.match.params })
                this.props.editPlaylist(user.uid, this.props.match.params.id)
                this.props.getSoundsSelected()

            }
        })
    }

    componentWillReceiveProps() {

        let list = this.props.list.tracks
        if (list) {
            this.setState({ selectedTracks: Object.values(list) })
        }
    }
    filteredSounds = (tracks, sounds) => {
        return (
            tracks.map((item) => {
                return (
                    sounds.filter(sound => sound.id === item.id)
                )
            })
        )

    }


    render() {

        const { list, soundsSelected } = this.props
        const sounds = this.filteredSounds(this.state.selectedTracks, soundsSelected)

        return (

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="container-fluid text-left pl-5">
                        <NavLink className="btn btn-sm btn-secondary" to='/playlists' activeClassName='activeNav'>
                            Return playlists
                        </NavLink>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h3 className="text-uppercase">{list.title}</h3>
                        <div className="container text-center">
                            <p className="lead">{list.description}</p>
                        </div>
                    </div>
                    <div className="container">
                        <p className="lead"></p>
                        <pre>

                        </pre>
                    </div>
                </div>


                <PlaylistTable sounds={sounds} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.list,
        soundsSelected: state.sounds,
        tracks: state.tracks
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editPlaylist, getSoundsSelected, getTracks }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPlaylist)

