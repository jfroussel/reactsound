import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editPlaylist } from '../actions/list'


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

            }
        })
    }



    render() {
        const { list } = this.props


        return (

            <div className="container-fluid pt-5">
                <div className="row">
                <div className="text-left pl-5">
                        <button className="btn btn-default ">
                            <NavLink className="text-uppercase" to='/playlists' activeClassName='activeNav'>
                                playlist dashboard
                            </NavLink>
                        </button>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h3 className="text-uppercase">Playlist title : {list.title}</h3>
                        <p>Description : {list.description}</p>
                    </div>
                    <div className="col-sm-12">

                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.list
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editPlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPlaylist)

