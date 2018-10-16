const trackDefaultState = [];

export default (state = trackDefaultState, action) => {
    switch (action.type) {
      
        case 'ADD_TRACK_IN_PLAYLIST':
           return [
               ...state,
               action.tracks
           ]
        default:
            return state;
    }

};