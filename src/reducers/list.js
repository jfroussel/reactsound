const playlistDefaultState = [];

export default (state = playlistDefaultState, action) => {
    switch (action.type) {
      
        case 'EDIT_PLAYLIST':
           return action.list
        default:
            return state;
    }
};