import React,{useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios'
import './ComicDetails.css'
import KeyboardBackspaceIcon  from '@material-ui/icons/KeyboardBackspace';


const ComicDetails = () => {
const history = useHistory()
    const {comicId} =useParams()

    const PUBLIC_KEY = 'c41644a8e3492b01a30e89f7838aa4f5'
    const HASH = 'b93e66cb4173c623ae254b1c6eec0860'
   const MARVEL_COMIC = `https://gateway.marvel.com:443/v1/public/comics/${comicId}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`
   
   const [comicDetails, setComicDetails] = useState([])
   const [comicStories, setComicStories] =useState([])

   // bring general comic details
   useEffect(() => {
       const fetchComic = async () => {
        await axios.get(MARVEL_COMIC)
        .then(res => setComicDetails(res.data.data.results[0]))
       }

       fetchComic()
   }, [])

   // fetch comic's stories
   useEffect(() => {
    const fetchComic = async () => {
     await axios.get(`http://gateway.marvel.com/v1/public/comics/${comicId}/stories?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
     .then(res => setComicStories(res.data.data.results))
    }

    fetchComic()
}, [])

const stories = comicStories?.map(story => story.title ).join(',  ')


   // fetch comic's stories

    return (
        <div className="comicDetails">
                 <div className="comicDetail__backIcon">
            <KeyboardBackspaceIcon onClick={() => history.goBack()}/>
            </div>
<h2> {comicDetails.title}</h2>
     <div className="comicDetailsBody">
     <div className="comicDetailsSection1">
           
           <img
           className="comicDetails__img animate__animated animate__fadeInDown"
           src={`${comicDetails?.thumbnail?.path}.${comicDetails?.thumbnail?.extension}`} alt=""/>
          </div>

           <div className="comicDetailsSection2">
           <div className="comic__Description">
               <h2>Synopsis</h2>
               <p>{comicDetails?.description ? comicDetails?.description : 'No description yet'}</p>
           </div>
          

           <div className="comic__Characters">
           <h3>Characters</h3>
       { comicDetails?.characters?.available !== 0 ? comicDetails?.characters?.items.map(character => character.name).join(', '): 'Sorry, we do not have the characters from this comic yet'}
           </div>

           <div className="comic__Stories">
               <h3>Stories</h3>
               {stories}
           </div>
           </div>
     </div>

        </div>
    )
}

export default ComicDetails
