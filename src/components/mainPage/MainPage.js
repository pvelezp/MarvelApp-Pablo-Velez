import React,{useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation,Pagination,EffectFade, EffectCoverflow ,Thumbs, Virtual} from 'swiper'
import 'swiper/swiper-bundle.css'
import './MainPage.css'
import { useHistory } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Thumbs])
SwiperCore.use([Virtual]);
SwiperCore.use([EffectFade]);
SwiperCore.use([EffectCoverflow]);

const MainPage = () => {
    const history =  useHistory()
const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const PUBLIC_KEY = 'c41644a8e3492b01a30e89f7838aa4f5'
    const HASH = 'b93e66cb4173c623ae254b1c6eec0860'
   
    const [characters, setCharacters] = useState([])
    const [count]= useState(60)
    const [offset, setOffset] = useState(Math.random()*100)
    const [order]= useState('name')

  
    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/characters?orderBy=${order}&limit=${count}&offset=${offset}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    useEffect(()=> {

        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setCharacters([...res.data.results]))
        setOffset(offset => offset + count +1)
    },[ ])

    const MARVEL_COMICS = `https://gateway.marvel.com:443/v1/public/comics?&limit=40&ts=1&offset=${offset}&&apikey=${PUBLIC_KEY}&hash=${HASH}`

    const [comics, setComics] = useState([])


    useEffect(()=> {
        fetch(MARVEL_COMICS)
        .then(res => res.json())
        .then(res => setComics(res?.data?.results))
    },[])


    return (
        <div className="animate__animated animate__fadeInDown">

        <div className="mainPage__list ">
            
        <Swiper    
        id='main'
        thumbs={{swiper: thumbsSwiper}}
        spaceBetween={1}
        slidesPerView={1}
         >

        {characters?.filter(character => !character?.thumbnail?.path.includes('image_not_available') && 
       !character?.thumbnail?.extension.includes('gif')).map(character => (
            <SwiperSlide
            key={character.id}
            >

<img className="Banner__mainPage"
             src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`} alt={character?.name}/>
            </SwiperSlide>
        ))}
      
      
    </Swiper>

    <div className="mainPage__info">
        <div className="mainPage__infoText">
        <h1>This is Marvel's world</h1>
        <h4>The place where all Marvel lives</h4>
        <button 
        onClick={()=>history.push('/characters')}
        className="mainPage__button">
            See characters
        </button>
        </div>
    </div>
        </div>

            
        <div className="thumbnails__mainPage">
        <h2>Discover your favorite comics!</h2>
            <Swiper 
                  grabCursor= {true}
            effect="coverflow"
            id="thumbs"
             spaceBetween={5}
              slidesPerView={3}
              draggable={true}
               onSwiper={setThumbsSwiper}>
            {comics?.filter(comic => comic?.images?.length).filter(comic => !comic.thumbnail.path.includes('image_not_available')).map(comic => (
                <SwiperSlide
                key={comic.id}
                className="thumbnails__slide"
                >
                     <img
                     onClick={()=> history.push('/comics')}
                     className="thumbnails__image"
                     src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.name}/>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
        </div>
    )
}

export default MainPage
