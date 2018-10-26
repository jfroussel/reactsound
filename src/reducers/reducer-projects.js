const projectsReducerDefaultState = [];

export default (state = projectsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            return [
                ...state,
                action.project
            ];
        case 'ADD_PLAYLIST_IN_PROJECTS':
            return [
                ...state,
                action.playlist
            ];
        case 'GET_PLAYLIST_IN_PROJECT':
            return action.playlist;
        case 'REMOVE_PROJECT':
            return state.filter(({ id }) => id !== action.id)
        case 'GET_PROJECTS':
            return action.projects;
        default:
            return state;
    }
};