export const GET_FRUITS = 'GET_FRUITS'

export const getFruits = () => {

    const data = [
        {fruits: 'pomme'},
        {banane: 'banane'},
        {orange: 'orange'}
    ]    

    return (dispatch) => {
        dispatch({ type: GET_FRUITS, payload: data })
    }
}