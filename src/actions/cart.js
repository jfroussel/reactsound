import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { showSnack } from 'react-redux-snackbar'

const _editCart = (cart) => ({
    type: 'EDIT_CART',
    cart,

});

export const editCart = (uid) => {
    return (dispatch) => {
        return firebase.database().ref('members/' + uid + '/cart').once('value').then(snapshot => {

            const cart = []
            snapshot.forEach(item => {
                cart.push({
                    id: item.key,
                    ...item.val()
                });
            });
            dispatch(_editCart(cart));
        });
    };
};





const _addToCart = (info) => ({
    type: 'ADD_TO_CART',
    info,
});

export const addToCart = (uid, cartData = {
    refID: '',
    author: '',
    filename: ''
}) => {
    return (dispatch) => {
        const cart = {
            refID: cartData.refID,
            author: cartData.author,
            filename: cartData.filename  
        };
        return firebase.database().ref(`members/${uid}/cart`).push(cart).then(ref => {
            dispatch(_addToCart({
                id: ref.key,
                ...cart
                
            }))
            dispatch(showSnack(uid, {
                label: `he file has been added to the cart !`,
                timeout: 3000,
                button: { label: 'OK, GOT IT' }
            }));
        });
    };
};