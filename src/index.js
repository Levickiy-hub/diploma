import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {UserStorage} from "./storage/userStorage";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStorage()
    }
    }>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);

