import React,{useContext, useState} from 'react'
import './Comic.css'
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import  FavoriteIcon  from '@material-ui/icons/Favorite';
import  FavoriteBorderIcon  from '@material-ui/icons/FavoriteBorder';
import { FavoriteContext } from './../../context/FavoriteProvider';

const Comic = ({comic}) => {
  
   const history =  useHistory()
   const {favorites, dispatch }= useContext(FavoriteContext)

   const [isFavorite, setIsFavorite] = useState(false)

    function truncate (str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    const addToFavorite = () => {
        setIsFavorite(!isFavorite)

        if(isFavorite === false) {
            dispatch({
                type:'ADD_TO_FAVORITES',
                item: comic
            })
        } else {
            dispatch({
                type: 'REMOVE_FROM_FAVORITES',
                id: comic.id
            })
        }

    }


    return (
        <div className="comic col-12 col-sm-6 col-md-4 col-lg-3">
            <img
            className="comic__img"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.name}/>
            {/* <h2>{comic.name}</h2> */}
            <div className="comic__content">
    <h2 className="comic__title">{comic.title}</h2>
    <p className="comic__description">{truncate(comic?.description, 80)}</p>
    <button
    className="comic__button"
    onClick={()=> history.push(`/comic/${comic.id}`)}
    >See comic</button>
    <div className="comic__favoriteIcon">
  <IconButton
            onClick={addToFavorite}
           className="comic__favoriteHeart"
            >
              { isFavorite || favorites?.find(favorite => favorite?.id === comic.id )  ? <FavoriteIcon />: <FavoriteBorderIcon />}
            </IconButton>
        </div>
  </div>
  
        </div>
    )
}

export default Comic
