import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

//const userId = firebase.auth().currentUser.uid;


const _addPlaylist = (playlist) => ({
    type: 'ADD_PLAYLIST',
    playlist,
});




export const addPlaylist = (uid,playlistData = {
    title: '',
    description: '',
    
   
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
                
            }));
        });
    };
};

const _removePlaylist = ({ id } = {}) => ({
    type: 'REMOVE_PLAYLIST',
    id
});

export const removePlaylist = ({ uid,id } = {}) => {
    
    return (dispatch) => {
         
        return firebase.database().ref(`members/${uid}/playlists/${id}`).remove().then(() => {
            dispatch(_removePlaylist({ id }));
        })
    }
};

const _getList = (list) => ({
    type: 'GET_LIST',
    list
   
});

export const getlist = (uid, id) => {
   
    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/playlists/${id}`).once('value').then(snapshot => {
            
            const list = [];   
            snapshot.forEach(item => {
                console.log('ITEM', item)
                list.push({
                    key: item.key,
                    value: item.val()
                });
                
            });
            
            dispatch(_getList(list));
        });
    }
};

const _editPlaylist = (id, updates) => ({
    type: 'EDIT_PLAYLIST',
    id,
    updates
});

export const editPlaylist = (uid, id, updates) => {
   
    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/playlists/${id}`).update(updates).then(() => {
            console.log('playlist id ', id)
            dispatch(_editPlaylist(id, updates));
        });
    }
};


const _getPlaylists = (uid,playlists) => ({
    type: 'GET_PLAYLISTS',
    playlists
    
});

export const getPlaylists = (uid) => {
    return (dispatch) => {
        return firebase.database().ref('members/' + uid + '/playlists').once('value').then(snapshot => {
            const playlists = [];

            snapshot.forEach(item => {
                playlists.push({
                    id: item.key,
                    ...item.val()
                });
            });

            dispatch(_getPlaylists(uid,playlists));
        });
    };
};