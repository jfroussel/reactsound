import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

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
        })
    }
};

const _editProject = (project) => ({
    type: 'EDIT_PROJECT',
    project,

});

export const editProject = (uid, id) => {
    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/projects/${id}`).once('value').then((snapshot) => {
            console.log(snapshot)
            const project = []

            snapshot.forEach(item => {
                project.push({
                    key: item.key,
                    value: item.val()
                })
            })
            dispatch(_editProject(project));
        });
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