
import firebase from 'firebase/app'
import 'firebase/storage'

export const GET_STORAGE_TRACK = 'GET_STORAGE_TRACK'

export const getStorageTrack = (author, filename) => {
    const ref = firebase.storage().ref(author + '/' + filename)
    
    return (dispatch) => {
        ref.getDownloadURL().then((url) => {
            dispatch({ type: GET_STORAGE_TRACK, payload: url })
        })
    };
}