import React,{useContext, useState} from 'react'
import './Character.css'
import {useHistory} from 'react-router-dom'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import { FavoriteContext } from './../../context/FavoriteProvider';

const Character = ({character}) => {
  //  const [{favorites}, dispatch] = useStateValue()
  const {favorites, dispatch }= useContext(FavoriteContext)

  const [isFavorite, setIsFavorite] = useState(false)
    const history = useHistory()
   

    function truncate (str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    const addToFavorite = () => {
        setIsFavorite(!isFavorite)

        if(isFavorite === false) {
            dispatch({
                type:'ADD_TO_FAVORITES',
                item: character
            })
        } else {
            dispatch({
                type: 'REMOVE_FROM_FAVORITES',
                id: character.id
            })
        }

    }



    return (
        <div
        
        className="character col-12 col-sm-6 col-md-4 col-lg-3 ">
            <img
            className="character__image"
            
            src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`} alt={character?.name}/>

            <div 
            
            className="character__details">
            <h2
            onClick={()=> history.push(`/character/${character?.id}`)}
            >{truncate(character?.name,30)}</h2>
        
            <div className="character__favoriteIcon">
        <IconButton
        onClick={addToFavorite}
           
            >
              { isFavorite || favorites?.find(favorite => favorite?.id === character.id )  ? <FavoriteIcon />: <FavoriteBorderIcon />}
            </IconButton>
        </div>

        
            </div>

 
        </div>
    )
}

export default Character
