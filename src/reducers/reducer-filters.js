const filtersReducerDefaultState = {
    genres: '',
    moods: '',
    artists: [],
    instruments: [],
    bpm: '',
    length: '',

};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'FILTER_GENRES':
            return {
                ...state,
                genres: action.genres
            }

        case 'REMOVE_FILTER_GENRES':
            return {
                ...state,
                genres: state.genres.filter((item, index) => { return action.genres !== item })
            }

        case 'FILTER_MOODS':
            return {
                ...state,
                moods: action.moods
            }

        case 'REMOVE_FILTER_MOODS':
            return {
                ...state,
                moods: state.moods.filter((item, index) => { return action.moods !== item })
            }

        case 'FILTER_ARTISTS':
            return {
                ...state,
                artists: [...state.artists, action.artists]
            }

        case 'REMOVE_FILTER_ARTISTS':
            return {
                ...state,
                artists: state.artists.filter((item, index) => { return action.artists !== item })
            }

        case 'FILTER_INSTRUMENTS':
            return {
                ...state,
                instruments: [...state.instruments, action.instruments + ' / ']
            }

        case 'REMOVE_FILTER_INSTRUMENTS':
            return {
                ...state,
                instruments: state.instruments.filter((item, index) => { return action.instruments !== item })
            }



        case 'FILTER_BPM':
            return {
                ...state,
                bpm: action.bpm
            }

        case 'REMOVE_FILTER_BPM':
            return {
                ...state,
                bpm: state.bpm.filter((item, index) => { return action.bpm !== item })
            }

        case 'FILTER_LENGTH':
            return {
                ...state,
                length: action.length
            }

        case 'CLEAR':
            return {
                ...state,
                genres: action.defaultFilter.genres,
                moods: action.defaultFilter.moods,
                artists: action.defaultFilter.artists,
                instruments: action.defaultFilter.instruments,
                bpm: action.defaultFilter.bpm,
                length: action.defaultFilter.length,

            }
        default:
            return state
    }
}