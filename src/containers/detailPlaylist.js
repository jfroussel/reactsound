import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editPlaylist } from '../actions/list'
import { getSounds } from '../actions/sounds'
import PlaylistTable from '../components/playlist/playlistTable'

class DetailPlaylist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogged: false,
            uid: null,
            playlistID: '',

        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            if (user) {
                this.setState({ uid: user.uid })
                this.setState({ playlistID: this.props.match.params })
                this.props.editPlaylist(user.uid, this.props.match.params.id)
                this.props.getSounds()
            }
        })
    }



    render() {
        const { list, sounds } = this.props
       
        console.log('SOUNDS ' , sounds)

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
                    
                </div>
                <PlaylistTable sounds={sounds} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.list,
        sounds: state.sounds,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editPlaylist, getSounds }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPlaylist)

