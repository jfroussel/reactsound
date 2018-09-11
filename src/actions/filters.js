export const filterGenres = (genres = []) => ({
    type: 'FILTER_GENRES',
    genres
});

export const removeFilterGenres = (genres = []) => ({
    type: 'REMOVE_FILTER_GENRES',
    genres
});


export const filterMoods = (moods = []) => ({
    type: 'FILTER_MOODS',
    moods
});

export const removeFilterMoods = (moods = []) => ({
    type: 'REMOVE_FILTER_MOODS',
    moods
});

export const filterArtists = (artists = []) => ({
    type: 'FILTER_ARTISTS',
    artists
});

export const removeFilterArtists = (artists = []) => ({
    type: 'REMOVE_FILTER_ARTISTS',
    artists
});

export const filterInstruments = (instruments = []) => ({
    type: 'FILTER_INSTRUMENTS',
    instruments
});

export const removeFilterInstruments = (instruments = []) => ({
    type: 'REMOVE_FILTER_INSTRUMENTS',
    instruments
});

export const filterBpm = (bpm = []) => ({
    type: 'FILTER_BPM',
    bpm
});

export const removeFilterBpm = (bpm = []) => ({
    type: 'REMOVE_FILTER_BPM',
    bpm
});

export const filterLength = (length = []) => ({
    type: 'FILTER_LENGTH',
    length
});