import { GET_SOUNDS, GET_SOUNDS_SELECTED } from '../actions/sounds'

export default function (state = [], action) {
    switch (action.type) {
        case GET_SOUNDS:
            return action.payload
        case GET_SOUNDS_SELECTED:
            return action.payload
        default:
            return state
    }
}