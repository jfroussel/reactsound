import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const _editPlaylist = (list) => ({
    type: 'EDIT_PLAYLIST',
    list,

});

export const editPlaylist = (uid, id) => {

    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/playlists/${id}`).once('value').then((snapshot) => {

            dispatch(_editPlaylist(snapshot.val()));
        })
    }
};




