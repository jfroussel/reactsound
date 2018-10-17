import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { showSnack } from 'react-redux-snackbar'

const _addInPlaylist = (track) => ({
    type: 'ADD_TRACK_IN_PLAYLIST',
    track,
});

export const addInPlaylist = (uid, id, track) => {
    return (dispatch) => {
       
        return firebase.database().ref(`members/${uid}/playlists/${id}/tracks`).push(...track).then(ref => {
            dispatch(_addInPlaylist({
                id: ref.key,
                ...track
            }))
            
            dispatch(showSnack(uid, {
                label: `this track  has been added in playlist`,
                timeout: 5000,
                button: { label: 'OK, GOT IT' }
            }));
        });
    };
};

const _getTracks = (id, tracks) => ({
    type: 'GET_TRACKS',
    tracks

});
export const getTracks = (uid,id) => {
    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/playlists/${id}/tracks`).once('value').then(snapshot => {
            
            const tracks = []
            snapshot.forEach(item => {
                tracks.push({
                    id: item.key,
                    ...item.val(),
                    
                });
            });
            dispatch(_getTracks(id,tracks));
        });
    };
};