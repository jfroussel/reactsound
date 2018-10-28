import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { showSnack } from 'react-redux-snackbar'


const _addProject = (project) => ({
    type: 'ADD_PROJECT',
    project,
});

export const addProject = (uid,projectData = {
    title: '',
    description: '',
}) => {
    return (dispatch) => {
        const project = {
            title: projectData.title,
            description: projectData.description,  
        };
        return firebase.database().ref('members/' + uid + '/projects').push(project).then(ref => {
            dispatch(_addProject({
                id: ref.key,
                ...project
                
            }))
            dispatch(showSnack(uid, {
                label: `Your project has been created !`,
                timeout: 3000,
                button: { label: 'OK, GOT IT' }
            }));
        });
    };
};

const _removeProject = ( id ) => ({
    type: 'REMOVE_PROJECT',
    id
});
 
export const removeProject = ( uid,category,id ) => {
    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/${category}/${id}`).remove().then(() => {
            dispatch(_removeProject({ id }));
            dispatch(showSnack(uid, {
                label: `Your project has been removed !`,
                timeout: 3000,
                button: { label: 'OK, GOT IT' }
            }));
        })
    }
};

const _getProjects = (uid,projects) => ({
    type: 'GET_PROJECTS',
    projects
});
export const getProjects = (uid) => {
    return (dispatch) => {
        return firebase.database().ref('members/' + uid + '/projects').once('value').then(snapshot => {
            const projects = [];
            snapshot.forEach(item => {
                projects.push({
                    id: item.key,
                    ...item.val()
                });
            });
            dispatch(_getProjects(uid,projects));
        });
    };
};

const _addPlaylistInProject = (playlist) => ({
    type: 'ADD_PLAYLIST_IN_PROJECT',
    playlist,
});

export const addPlaylistInProject = (uid, id, playlistData = {
    id: '',
   
}) => {
    return (dispatch) => {
        const playlist = playlistData
        return firebase.database().ref('members/' + uid + '/projects/' + id +'/playlist/').set(playlist).then(() => {
            dispatch(_addPlaylistInProject({
                ...playlist
            }))
            dispatch(showSnack(uid, {
                label: `Your playlist ${playlist.id} has been created`,
                timeout: 5000,
                button: { label: 'OK, GOT IT' }
            }));
        });
    };
};

const _getPlaylistInProject = (uid, playlist) => ({
    type: 'GET_PLAYLIST_IN_PROJECT',
    playlist
});
export const getPlaylistInProject = (uid, id) => {
    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/projects/${id}/playlist`).once('value').then(snapshot => {
            const playlist = snapshot.val() 
            dispatch(_getPlaylistInProject(uid, playlist));
        });
    };
};