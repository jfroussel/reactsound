const projectsReducerDefaultState = [];

export default (state = projectsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            return [
                ...state,
                action.project
            ];
        case 'REMOVE_PROJECT':
            return state.filter(({ id }) => id !== action.id)
        case 'GET_PROJECTS':
            return action.projects;
        default:
            return state;
    }
};