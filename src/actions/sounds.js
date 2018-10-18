
import firebase from 'firebase/app'
import 'firebase/database'

export const GET_SOUNDS = 'GET_SOUNDS'

export const getSounds = () => {
    
    return (dispatch) => {
        return firebase.database().ref('sounds').once('value').then(snapshot => {
            const sounds = [];

            snapshot.forEach(item => {
                sounds.push({
                    id: item.key,
                    ...item.val()
                });
            });

            dispatch({ type: GET_SOUNDS, payload: sounds })
        });
    };
}
// this.props.sounds.filter(sound => sound.id === t.id)
export const GET_SOUNDS_SELECTED = 'GET_SOUNDS_SELECTED'

export const getSoundsSelected = () => {
    
    return (dispatch) => {
        return firebase.database().ref('sounds').once('value').then(snapshot => {
            const soundsSelected = [];

            snapshot.forEach(item => {
                soundsSelected.push({
                    id: item.key,
                    ...item.val()
                });
            });

            dispatch({ type: GET_SOUNDS_SELECTED, payload: soundsSelected })
        });
    };
}