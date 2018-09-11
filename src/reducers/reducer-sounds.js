import { GET_SOUNDS} from '../actions/sounds'

export default function(state = [], action) {
    switch(action.type) {
        case GET_SOUNDS :
            return action.payload
        default :
            return state
    }
}