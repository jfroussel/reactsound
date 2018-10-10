import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { showSnack } from 'react-redux-snackbar'

const _addPlaylist = (playlist) => ({
    type: 'ADD_PLAYLIST',
    playlist,
});

export const addPlaylist = (uid, playlistData = {
    title: '',
    description: '',
    uid
}) => {
    return (dispatch) => {
        const playlist = {
            title: playlistData.title,
            description: playlistData.description,
        };
        return firebase.database().ref('members/' + uid + '/playlists').push(playlist).then(ref => {
            dispatch(_addPlaylist({
                id: ref.key,
                ...playlist
            }))
            dispatch(showSnack(uid, {
                label: `Your playlist ${playlist.title} has been created`,
                timeout: 5000,
                button: { label: 'OK, GOT IT' }
            }));
        });
    };
};
const _removePlaylist = (id) => ({
    type: 'REMOVE_PLAYLIST',
    id
});
export const removePlaylist = (uid, category, id) => {
    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/${category}/${id}`).remove().then(() => {
            dispatch(_removePlaylist({ id }))
            dispatch(showSnack(uid, {
                label: `Your playlist has been removed !`,
                timeout: 3000,
                button: { label: 'OK, GOT IT' }
            }));
        })
    }
};
const _getPlaylists = (uid, playlists) => ({
    type: 'GET_PLAYLISTS',
    playlists

});
export const getPlaylists = (uid) => {
    return (dispatch) => {
        return firebase.database().ref('members/' + uid + '/playlists').once('value').then(snapshot => {

            const playlists = []
            snapshot.forEach(item => {
                playlists.push({
                    id: item.key,
                    ...item.val()
                });
            });
            dispatch(_getPlaylists(uid, playlists));
        });
    };
};



