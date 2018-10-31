import { GET_STORAGE_TRACK } from '../actions/storageTrack'

export default function (state = [], action) {
    switch (action.type) {
        case GET_STORAGE_TRACK:
            return action.payload
        default:
            return state
    }
}