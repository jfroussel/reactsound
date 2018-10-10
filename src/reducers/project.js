const projectDefaultState = [];

export default (state = projectDefaultState, action) => {
    switch (action.type) {
      
        case 'EDIT_PROJECT':
           return action.project
        default:
            return state;
    }
};