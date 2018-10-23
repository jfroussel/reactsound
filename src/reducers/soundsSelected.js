import { GET_SOUNDS_SELECTED } from '../actions/soundsSelected'

export default function (state = [], action) {
    switch (action.type) {
        case GET_SOUNDS_SELECTED:
            return action.payload
        default:
            return state
    }
}