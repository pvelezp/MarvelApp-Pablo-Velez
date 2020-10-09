import React,{useReducer,useEffect} from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';
import { FavoriteProvider } from './context/FavoriteProvider';

const init = () => {
   return JSON.parse(localStorage.getItem('user')) || {logged: false} 
}

function App() {

  const [user,dispatch] =  useReducer(authReducer, {}, init)

  useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user))
  }, [user])


  return (
    <FavoriteProvider>

  
    <AuthContext.Provider value={{user, dispatch}}>
<AppRouter />
    </AuthContext.Provider>
    </FavoriteProvider>
  );
}

export default App;
