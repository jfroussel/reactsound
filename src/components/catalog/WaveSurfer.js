import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPlaylists } from '../../actions/playlist'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import WaveSurfer from 'wavesurfer.js'
import drums from '../../assets/instruments/drums.svg'
import fullmix from '../../assets/instruments/fullmix.svg'
import bass from '../../assets/instruments/bass.svg'
import ReactTooltip from 'react-tooltip'
import style from './WaveSurferStyle'
import AddPlaylist from '../playlist/add'
import { addInPlaylist } from '../../actions/tracks'

class Waveform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePlay: false,
            isLogged: false,
            uid: null,
        }
        this.playPause = this.playPause.bind(this)
        this.pause = this.pause.bind(this)


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

    componentDidMount() {
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.$timelineform = this.$el.querySelector('.wave-timeline')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: '#17a2b8',
            progressColor: '#056271',
            height: 60,
        })
        this.wavesurfer.load(this.props.src)
    }

    playPause() {
        this.setState({ activePlay: true })
        return (
            this.wavesurfer.playPause()
        )
    }

    pause() {
        this.setState({ activePlay: false })
        return (
            this.wavesurfer.pause()
        )
    }


    addToPlaylist(playlist, trackID, trackName, src) {
        const track = [{ id: trackID, name: trackName, src:src }]
        return (
            this.props.addInPlaylist(this.state.uid, playlist.id, track)
        )
    }



    render() {
        const { playlists } = this.props
        return (
            <div className='container waveform'>
                <div className="row">
                    {!this.state.activePlay ?
                        <span data-tip="Play track">
                            <i className="material-icons" onClick={this.playPause} style={style.playpause}>
                                play_arrow
                        </i>
                        </span>
                        :
                        <span data-tip="Pause track">
                            <i className="material-icons" onClick={this.pause} style={style.playpause}>
                                pause
                        </i>
                        </span>
                    }

                    <div className="col-6">
                        <div className='wave' style={style.wave} > </div>
                    </div>

                    <div className="col-1" style={style.iconBox}>
                        <div className="dropup" data-tip="Stems">
                            <a className="btn btn-default dropdown-toggle dropdown-reactsound" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons " style={style.stems} >
                                    list
                                </i>
                            </a>

                            <div className="dropdown-menu" >
                                <a className="dropdown-item" href=""><img className="mr-2" src={fullmix} width="25" alt="" /> full mix</a>
                                <a className="dropdown-item" href=""><img className="mr-2" src={drums} width="25" alt="" /> drums stem </a>
                                <a className="dropdown-item" href=""><img className="mr-2" src={bass} width="25" alt="" /> bass stem</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-1" style={style.iconBox}>
                        <div className="dropup" data-tip="Add to playlists">
                            <a className="btn btn-default dropdown-toggle dropdown-reactsound" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons " style={style.stems} >
                                    playlist_add
                                </i>
                            </a>

                            <div className="dropdown-menu" style={style.dropdown}>
                                <div className="text-center">
                                    <a className="btn btn-sm btn-primary" href="" data-toggle="modal" data-target="#addNewPlaylist">Add new playlist</a>
                                    <div className="dropdown-divider"></div>
                                </div>

                                {playlists.map((playlist, id) => {
                                    return (
                                        <a
                                            className="dropdown-item"
                                            onClick={() => this.addToPlaylist(playlist, this.props.trackID, this.props.trackName, this.props.src)} key={playlist.id}>{id} - {playlist.title}</a>
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
                    <div className="col-1" style={style.iconBox}>
                        <NavLink className="nav-item" to={`composer/${this.props.author}`}  >
                            <span data-tip="list of author tracks">
                                <i className="material-icons" style={style.icon} key={this.props.id}>
                                    how_to_reg
                            </i>
                            </span>
                        </NavLink>

                    </div>
                    <div className="col-1" style={style.iconBox}>
                        <span data-tip="Infos">
                            <i className="material-icons" style={style.icon}>
                                info
                            </i>
                        </span>
                    </div>
                    <div className="col-1" style={style.iconBox}>
                        <span data-tip="Add to cart">
                            <i className="material-icons" style={style.icon}>
                                add_shopping_cart
                            </i>
                        </span>
                    </div>

                </div>

                <ReactTooltip />

            </div>
        )
    }
}

Waveform.defaultProps = {
    src: ""
}

const mapStateToProps = (state) => {
    return {
        playlists: state.playlists,
        addInPlaylist: state.addTrack
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPlaylists, addInPlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Waveform);