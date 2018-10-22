import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editPlaylist } from '../actions/list'
import { playlistTracks} from '../actions/playlistTracks'
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
            list: ['-LHbrsD0TbWttdw-ReWL', '-LHc-qwrdlzxfq_0n9fj', '-LHc6M7xhY8_RgrhDoP8']
        }

        this.handlePlaylist = this.handlePlaylist.bind(this)
    }

    componentWillMount() {
        
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
    

    componentWillReceiveProps() {
     
        //this.setState({selectedTracks: this.props.listID})
    }

    handlePlaylist(listID) {
        return (
            <PlaylistTable  listID={listID} /> 
        )
    }

    
   
    render() {
        
        const { list, listID } = this.props
       console.log('render state', listID)
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

                {
                    this.handlePlaylist(listID)
                }
                
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.list,
        listID: state.playlistTracks,
        tracks: state.tracks
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ playlistTracks, editPlaylist,  getTracks }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPlaylist)

