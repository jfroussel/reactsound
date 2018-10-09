import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/database'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removePlaylist, getPlaylists } from '../actions/playlist'


class RemoveCard extends Component {


    delete(uid, category, id) {
        this.props.removePlaylist(uid, category, id).then(() => {
            this.closeModal()
        }).then(() => {
            this.props.getPlaylists(uid).then(() => {
                return (
                   alert('playlist delete')
                )
                
            })
        })
    }

    closeModal() {
        document.getElementById(this.props.card.uid).click();
    }

   
    render() {


        return (
            <div className="modal fade" id={this.props.card.uid} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-muted" id="exampleModalLabel">Remove playlist for user id {this.props.card.memberID}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <h5>Are your sure you want to delete "{this.props.card.title}" {this.props.card.category} ?</h5>
                            <br />

                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={() => this.delete(this.props.card.memberID, this.props.card.category, this.props.card.uid)} >Yes</button>
                            <button className="btn btn-default" data-dismiss="modal">Abord</button>
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
    return bindActionCreators({ removePlaylist, getPlaylists }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveCard)
