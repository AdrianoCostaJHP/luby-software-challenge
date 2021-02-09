import React, {createContext, useReducer, useState} from 'react';

const MyContext = createContext({userLogin: '', userTemp: ''});
const initialState = {
    userLogin: '',
    userTemp: '',
}

export const ContextProvider = props => {

    const [login, setLogin] = useState('');
    const [loginTemp, setLoginTemp] = useState('');

    function reducer(state, action){
        if(action.type === 'loadUser'){
            const user = action.payload;
            return(
                setLogin(user)
            )
        }

        else if(action.type === 'loadUserTemp'){
            const userTemp = action.payload;
            return(
                setLoginTemp(userTemp)
            )
        }
        return state;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{
            userLogin: login,
            userTemp: loginTemp,
            dispatch
        }}>
            {props.children}
        </MyContext.Provider>
    )}
 
export default MyContext;