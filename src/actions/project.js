import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const _editProject = (project) => ({
    type: 'EDIT_PROJECT',
    project,

});

export const editProject = (uid, id) => {
    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/projects/${id}`).once('value').then((snapshot) => {
            dispatch(_editProject(snapshot.val()));
        })
    }
};