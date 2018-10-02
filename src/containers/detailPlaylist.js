import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getlist } from '../actions/playlist'


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
                this.props.getlist(this.state.uid, this.state.playlistID.id)
            }
        });


    }



    render() {

        const pid = this.state.playlistID
        const { list } = this.props
        console.log('PLAYLIST DETAIL PROPS ', list)
        return (

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="font-weight-light">Detail playlist  </h4>
                    </div>
                    <div className="col-sm-12">
                       
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.playlists,

    };
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ getlist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPlaylist)

