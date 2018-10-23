import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editPlaylist } from '../../actions/list'
import { playlistTracks } from '../../actions/playlistTracks'
import PlaylistTable from '../../components/playlist/playlistTable'
import { getTracks } from '../../actions/tracks'

import { getSoundsSelected } from '../../actions/soundsSelected'




class DetailPlaylist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogged: false,
            uid: null,
            playlistID: '',
            selectedTracks: [],
           
        }
        

    }

    componentWillMount() {
        console.log('CWM', this.state)
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            if (user) {
                this.setState({ uid: user.uid })
                this.setState({ playlistID: this.props.match.params })
                this.props.editPlaylist(user.uid, this.props.match.params.id)
                this.props.playlistTracks(user.uid, this.props.match.params.id)
            }
            
        })
       
    }

    componentDidMount() {
        this.props.getSoundsSelected(this.props.listID)
    }


    componentWillReceiveProps() {
        
        this.setState({ selectedTracks: this.props.listID })
       
       
    }

    render() {

        const { list,soundsSelected } = this.props
        console.log('render state', this.state)

       

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

                <PlaylistTable soundsSelected={soundsSelected} />


            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        soundsSelected: state.soundsSelected,
        list: state.list,
        listID: state.playlistTracks,
        tracks: state.tracks,
        

    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ playlistTracks, editPlaylist, getTracks, getSoundsSelected }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPlaylist)
