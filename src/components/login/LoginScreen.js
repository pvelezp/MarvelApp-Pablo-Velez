import React,{useState, useEffect,useContext} from 'react'
import { Button } from '@material-ui/core'
import { auth, provider} from '../../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import {  IconButton } from '@material-ui/core';
import { AuthContext } from './../../auth/authContext';
import { types } from './../../types/types';
import { useHistory } from 'react-router-dom';
import './Login.scss'


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 330,
      backgroundColor: 'black',
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
  }));

const LoginScreen = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailSU, setEmailSU] = useState('')
    const [passwordSU, setPasswordSU] = useState('')
    const history =  useHistory()
    const {user, dispatch} = useContext(AuthContext)

    useEffect(() => {
        
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch({
                    type: types.LOGIN,
                    user: authUser
                })

                if(authUser.displayName) {

                }
            }else {
               
            }
        })

        return () => {
            //clenaup
            unsubscribe()
        }
    }, [user, firstName])

    //For handling modal opening or closing
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      // Signing in with Google
      const signInWithGoogle =  ()=> {
        //sign in..
        auth.
            signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: types.LOGIN,
                    user: result.user
                })
                
            }).catch(err => console.log(err.message))
    }

    // SIgning up with user input

    const signUp = e => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(emailSU,passwordSU)
        .then(result => {
            result.user.updateProfile({
                displayName: firstName })
            dispatch({
                type: types.LOGIN,
                user: result.user
            }) })
        .catch(error => alert(error.message))

        setOpen(false)
    }

    //singin in
    const signIn = e => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(email,password)
        .then(result => {
            dispatch({
                type: types.LOGIN,
                user: result.user
            }) })
        .catch(error => alert(error.message))
    }

    return (
        <>
        <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
  <div  className={classes.paper}>
       <div className="modal__header">
           <div className="modal__headerHead">
           <h1>Sign Up</h1>
           <IconButton onClick={handleClose}>
           <CloseIcon  />
           </IconButton>
           
           </div>
           <p>It's quick and easy</p>
           </div> 
        <form 
        onSubmit={signUp}
        className="modal__body">
            <div className="modal__bodyNames">
                <input 
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                type="text" placeholder="First name"/>
                <input
                 value={lastName}
                 onChange={e => setLastName(e.target.value)}
                type="text" placeholder="Last name"/>
            </div>
            <input 
            value={emailSU}
            onChange={e => setEmailSU(e.target.value)}
            type="text" placeholder="Email"/>
            <input 
            value={passwordSU}
            onChange={e => setPasswordSU(e.target.value)}
            type="password" placeholder="New password" />
            
            <div className="modal__bodyFooter">
            <small>By clicking Sign Up, you agree to our Terms.</small>
            </div>
            <div className="modal__button">
                <button type="submit">
                    Sign Up
                </button>
            </div>
        </form>
  </div>
</Modal>


        <div className="login">
      
                <h1>Login </h1>
               
                <form 
                onSubmit={signIn}
                >
                        <input 
                        value={email}
                        autoComplete={'' + Math.random()} 
                        onChange={e => setEmail(e.target.value)}
                        type="email" placeholder="Email"/>
                        <input type="password" 
                        autoComplete={'' + Math.random()} 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="password"/>
                        <Button
                        type="submit"
                        >Log in</Button>
        
                </form>
                    
                    <Button
                    type="submit"
                    onClick={signInWithGoogle}
                    >
                        Sign In with Google
                    </Button>
                
                    <div className="login__formFormSignup">
                        <small>If you don't have an account, just create one</small>
                    <button
                    onClick={handleOpen}
                    className="button__signup"
                    >
                        Create New Account
                    </button>
                    </div>
         
        
           

        </div>
        </>
    
    )
}

export default LoginScreen
