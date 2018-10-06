import React, { Component } from 'react';
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
       
        let tracks = list.pop()
        
       
        console.log(tracks)
        return (

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="font-weight-light">Detail playlist </h4>
                    </div>
                    <div className="col-sm-12">
                        <ul>
                            {

                                list.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <li>{item.key} : {item.value}</li>
                                        </div>
                                    )
                                })

                            }
                        </ul>
                        <ul>
                            {

                               JSON.stringify(tracks)


                            }
                        </ul>

                    </div>
                </div>
            </div>
        );
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

