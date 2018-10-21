
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

export const GET_SOUNDS_SELECTED = 'GET_SOUNDS_SELECTED'

export const getSoundsSelected = (list) => {

    return (dispatch) => {
        return firebase.database().ref('sounds').once('value').then(snapshot => {
            const soundsSelected = [];
            const result = []
            snapshot.forEach(item => {
                soundsSelected.push({
                    id: item.key,
                    ...item.val()
                });
            });
            console.log('LIST MAP', list)
            list.map((item) => {
                return (
                    result.push({
                        ...soundsSelected.filter(sound => sound.id === item)[0]
                    })
                )
            })
            dispatch({ type: GET_SOUNDS_SELECTED, payload: result })
        });
    };
}