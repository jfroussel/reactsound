const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_CART' :
        return action.cart
            
        
        case 'ADD_TO_CART':
            return [
                ...state,
                action.cart
            ];
        default:
            return state;
    }
};