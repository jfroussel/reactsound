import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import VideoPlayer from '../../components/projects/videoPlayer'
import VideoYoutube from '../../components/projects/videoYoutube'
import PlaylistTable from '../../components/playlist/table'
import Header from '../../components/projects/header'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editProject } from '../../actions/project'
import { getPlaylists } from '../../actions/playlist'
import { addPlaylistInProject, getPlaylistInProject } from '../../actions/projects'
import Select from 'react-select'
import { playlistTracks } from '../../actions/playlistTracks'

const style = {
    video: {
        width: 250
    }
}

class DetailProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectID: '',
            defaultListID: [],
            isLogged: false,
            uid: null,
            videoPlayer: null,
            selectedOption: null,
        }
    }

    dataPlaylist = () => {
        const playlists = this.props.playlists
        const result = []
        playlists.map((playlist) => {
            return (
                result.push({
                    value: playlist.id,
                    label: playlist.title
                })
            )
        })
        return result
    }

    componentWillMount() {

        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            if (user) {
                this.setState({ uid: user.uid })
                this.setState({ projectID: this.props.match.params })
                this.props.editProject(user.uid, this.props.match.params.id)
                this.props.getPlaylists(user.uid)
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedOption !== prevState.selectedOption) {
            this.props.playlistTracks(this.state.uid, this.state.selectedOption)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.listID !== nextProps.listID) {
            this.props.addPlaylistInProject(this.state.uid, this.props.match.params.id, nextProps.listID)
        }
        // recuperation de la playlist du projet dans firebase
        this.props.getPlaylistInProject(this.state.uid, this.props.match.params.id)
    }

    selectPlayer(type) {
        this.setState({ videoPlayer: null })
        if (type === 'youtube') {
            return (
                this.setState({ videoPlayer: 'youtube' })
            )
        }
        this.setState({ videoPlayer: 'videoplayer' })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption.value, selectedOptionLabel: selectedOption.label });
    }

    render() {
        const { selectedOption } = this.state
        const { project, playlists, listID } = this.props
        const SelectPlayer = () => {
            return (
                <div>
                    <p>Import playlist :   {selectedOption ? this.state.selectedOptionLabel : 'undefined'}</p>
                    <Select
                        value={selectedOption}
                        options={this.dataPlaylist()}
                        onChange={this.handleChange}
                    />
                    <br />
                    <p>Choose your video player </p>
                    <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <button type="button" className="btn btn-secondary" onClick={() => this.selectPlayer('youtube')}>Youtube</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.selectPlayer('videoplayer')}>Video player</button>

                        <div className="btn-group" role="group">
                            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Others players
                        </button>
                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <a className="dropdown-item" href="">other player 1</a>
                                <a className="dropdown-item" href="">other player 2</a>
                                <a className="dropdown-item" href="">other player 3</a>
                                <a className="dropdown-item" href="">other player 4</a>
                            </div>
                        </div>
                    </div>
                    {!this.state.videoPlayer ? <NoVideoPlayerSelected /> : null}
                    <div>
                        {this.state.videoPlayer === 'youtube' ? <VideoYoutube /> : null}
                        {this.state.videoPlayer === 'videoplayer' ? <VideoPlayer /> : null}
                    </div>
                </div>

            )
        }

        const NoVideoPlayerSelected = () => {
            return (
                <div className="pt-5">
                    <p className="lead">No video player selected ...</p>
                </div>
            )
        }

        return (

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="container-fluid text-left pl-5">
                        <NavLink className="btn btn-sm btn-secondary" to='/projects' activeClassName='activeNav'>
                            Return projects
                        </NavLink>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h3 className="text-uppercase">{project.title}</h3>
                        <div className="container text-center">
                            <p className="lead">{project.description}</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12"><Header playlists={playlists} /></div>
                        <div className="col-8"><PlaylistTable listID={!this.state.selectedOption ? project.playlist : listID} /></div>
                        <div className="col-4" style={style.video}><SelectPlayer /> </div>
                        <div className="col-12">footer playlist</div>
                    </div>
                </div>
            </div>



        );
    }
}
const mapStateToProps = (state) => {
    return {
        project: state.project,
        playlists: state.playlists,
        listID: state.playlistTracks,
        addPlaylistInProject: state.addPlaylistInProject,
        getPlaylistInProject: getPlaylistInProject
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editProject, playlistTracks, getPlaylists, addPlaylistInProject, getPlaylistInProject }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProject)


