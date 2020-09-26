import React,{useContext} from 'react'
import Favorite from './Favorite';
import { useHistory } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import './Favorites.css'
import { FavoriteContext } from './../../context/FavoriteProvider';


const Favorites = () => {
    const history = useHistory()
    const { favorites} = useContext(FavoriteContext)

    return (
        <div>
                  <div className="favorites__backIcon">
            <KeyboardBackspaceIcon onClick={() => history.goBack()}/>
            </div>
            <div className="favorites__title">
            <h2>Favorites</h2>
            </div>

      

           <div className="favorites__list">
           {favorites?.map(favorite => (
                <Favorite
                key={favorite?.id}
                favorite={favorite}
                />
            ))}
           </div>

        </div>
    )
}

export default Favorites
