const playlistTracksDefaultState = [];

export default (state = playlistTracksDefaultState, action) => {
    switch (action.type) {

        case 'PLAYLIST_TRACKS':
            return action.playlistTracks
        default:
            return state;
    }
};