import React, {createContext, useReducer, useState} from 'react';

const MyContext = createContext({userLogin: ''});
const initialState = {
    userLogin: '',
}

export const ContextProvider = props => {

    const [login, setLogin] = useState('');
    function reducer(state, action){
        if(action.type === 'loadUser'){
            const user = action.payload;
            return(
                setLogin(user)
            )
        }
        return state;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{
            userLogin: login
            , dispatch
        }}>
            {props.children}
        </MyContext.Provider>
    )}
 
export default MyContext;