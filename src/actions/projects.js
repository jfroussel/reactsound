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

const _removeProject = ({ id } = {}) => ({
    type: 'REMOVE_PROJECT',
    id
});
/*
firebase.database().ref('members/' + this.state.uid + '/projects').child(id).remove().then(() => {
    countProjects = countProjects -1
    onClose()
})
*/
export const removeProject = ({ uid,id } = {}) => {
    return (dispatch) => {
        return firebase.database().ref(`members/${uid}/projects/${id}`).remove().then(() => {
            dispatch(_removeProject({ id }));
        })
    }
};

const _editProject = (id, updates) => ({
    type: 'EDIT_PROJECT',
    id,
    updates
});

export const editProject = (id, updates) => {
    console.log('id :',id)
    return (dispatch) => {
        return firebase.database().ref(`projects/${id}`).update(updates).then(() => {
            dispatch(_editProject(id, updates));
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