const playlistsReducerDefaultState = [];

export default (state = playlistsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PLAYLIST':
            return [
                ...state,
                action.playlist
            ];
        case 'REMOVE_PLAYLIST':
        return state.filter(({ id }) => id !== action.id);
        
        case 'GET_PLAYLISTS':
            return action.playlists;

        default:
            return state;
    }
};