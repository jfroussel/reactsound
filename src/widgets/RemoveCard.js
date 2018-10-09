import React, { Component } from 'react';
import 'firebase/database'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removePlaylist, getPlaylists } from '../actions/playlist'
import { removeProject, getProjects } from '../actions/projects'

class RemoveCard extends Component {

    delete(uid, category, id) {
        if(category === 'playlists'){
            this.props.removePlaylist(uid, category, id).then(() => {
                this.closeModal()
            }).then(() => {
                this.props.getPlaylists(uid)
            })
        } 
        if(category === 'projects'){
            this.props.removeProject(uid, category, id).then(() => {
                this.closeModal()
            }).then(() => {
                this.props.getProjects(uid)
            })
        } 
    }
    closeModal() {
        document.getElementById(this.props.card.uid).click();
    }

    render() {
        return (
            <div>
                <div className="modal fade" id={this.props.card.uid} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-muted" id="exampleModalLabel">Remove {this.props.card.category}</h5>
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
    return bindActionCreators({ removePlaylist, removeProject, getPlaylists, getProjects }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RemoveCard)
