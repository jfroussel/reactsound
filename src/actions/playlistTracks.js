import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const _playlistTracks = (playlistTracks) => ({
    type: 'PLAYLIST_TRACKS',
    playlistTracks,

});

export const playlistTracks = (uid, id) => {

    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/playlists/${id}`).once('value').then((snapshot) => {
            const tracks = snapshot.val().tracks
            const result = []
            for(var prop in tracks) {
                result.push(tracks[prop].id)
            }
            dispatch(_playlistTracks(result));
        })
    }
};