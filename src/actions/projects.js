import firebase from 'firebase/app'
import 'firebase/database'

const _addProject = (project) => ({
    type: 'ADD_PROJECT',
    project
});

export const addProject = (projectData = {
    title: '',
    description: '',
    
   
}) => {
    return (dispatch) => {
        const project = {
            title: projectData.title,
            description: projectData.description,
            
        };
       console.log('CLG :',project)
        return firebase.database().ref('projects').push(project).then(ref => {
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

export const removeProject = ({ id } = {}) => {
    return (dispatch) => {
        return firebase.database.ref(`projects/${id}`).remove().then(() => {
            dispatch(_removeProject({ id }));
        })
    }
};

const _editProject = (id, updates) => ({
    type: 'EDIT_PROJECT',
    id,
    updates
});


/*
const _editFilename = (id, filename) => ({
    type : 'EDIT_FILENAME',
    id,
    filename
})

export const editFilename = (id, filename) => {
    console.log('id :',id)
    return (dispatch) => {
        return database.ref(`sounds/${id}`).update(filename).then(() => {
            dispatch(_editFilename(id, filename));
        });
    }
};
*/

export const editProject = (id, updates) => {
    console.log('id :',id)
    return (dispatch) => {
        return firebase.database.ref(`projects/${id}`).update(updates).then(() => {
            dispatch(_editProject(id, updates));
        });
    }
};
/*
const _getProjects = (projects) => ({
    type: 'GET_PROJECTS',
    projects
});

export const getProjects = () => {
    return (dispatch) => {
        return firebase.database.ref('projects').once('value').then(snapshot => {
            const projects = [];

            snapshot.forEach(item => {
                projects.push({
                    id: item.key,
                    ...item.val()
                });
            });

            dispatch(_getProjects(projects));
        });
    };
};
*/

export const GET_PROJECTS = 'GET_PROJECTS'

export const getProjects = () => {
    
    return (dispatch) => {
        return firebase.database().ref('projects').once('value').then(snapshot => {
            const projects = [];

            snapshot.forEach(item => {
                projects.push({
                    id: item.key,
                    ...item.val()
                });
            });

            dispatch({ type: GET_PROJECTS, payload: projects })
        });
    };
}
