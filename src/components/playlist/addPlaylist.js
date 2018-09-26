import React, { Component } from 'react';
import PlaylistForm from './playlistForm';
import { connect } from 'react-redux';
import { addPlaylist } from '../../actions/playlist'



class AddPlaylist extends Component {

    render() {
        console.log('USERID')
        return (
            <div>
                
                <PlaylistForm
                    onSubmitPlaylist={(playlist) => {
                        console.log('PROPS / : ', this.props)
                        this.props.dispatch(addPlaylist(this.props.uid, playlist));
                        //props.history.push('/');
                    }}
                />
            </div>
        )
    }

}


export default connect()(AddPlaylist);