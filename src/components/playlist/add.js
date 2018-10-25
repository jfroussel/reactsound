import React, { Component } from 'react';
import PlaylistForm from './form';
import { connect } from 'react-redux';
import { addPlaylist } from '../../actions/playlist'

class AddPlaylist extends Component {
    render() {
        return (
            <div>
                <PlaylistForm
                    onSubmitPlaylist={(playlist) => {
                        this.props.dispatch(addPlaylist(this.props.uid, playlist));
                        //props.history.push('/');
                    }}
                />
            </div>
        )
    }
}

export default connect()(AddPlaylist);