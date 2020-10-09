import React,{useState,useEffect} from 'react'
import Character from './Character'
import './Characters.scss'
import InfiniteScroll from 'react-infinite-scroll-component';
import { PUBLIC_KEY, HASH,BASE_URL } from './../../api/constants';
import { Input, CircularProgress } from '@material-ui/core';
import SearchIcon  from '@material-ui/icons/Search';
import axios from 'axios'

const Characters = () => {
    const [characters, setCharacters] = useState([])
    const [count]= useState(60)
    const [offset, setOffset] = useState(0)
    const [order]= useState('name')
   const [characterName, setCharacterName]= useState('')
   const [characterComics, setCharacterComics] = useState('')
   const [characterStories, setCharacterStories] = useState('')
  const [filteredData, setFilteredData] = useState([])
    const MARVEL_CHARACTERS = `${BASE_URL}/characters?orderBy=${order}&limit=${count}&offset=${offset}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    useEffect(()=> {
const fetchData = async () => {
      await axios.get(MARVEL_CHARACTERS)
    .then(res => setCharacters([...res?.data.data.results]))
}
fetchData()
        setOffset(offset => offset + count +1)
    },[ ,order])


    const infiniteData = async () => {
        setOffset(offset => offset + count +1)
        await axios.get(MARVEL_CHARACTERS)
        .then(res => setCharacters([...characters,...res?.data?.data.results]))
    }

    // filter by name
const searchCharacterbyName = e => {
    e.preventDefault()
    const filterData = async () => {
        await axios.get(`${BASE_URL}/characters?name=${characterName}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
        .then(res => setFilteredData(res?.data.data.results))
    }
    filterData()
    setCharacterName('')
}

// filter by COmics
const searchCharacterbyComics = e => {
     e.preventDefault()
     const filterData = async () => {
 await axios.get(`${BASE_URL}/characters?comics=${characterComics}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
 .then(res => setFilteredData(res?.data?.data?.results))
     }
    filterData()
    setCharacterComics('')
}

//filter by Stories
const searchCharacterbyStories= e => {
    e.preventDefault()
     const filterData = async () => {
 await axios.get(`${BASE_URL}/characters?stories=${characterStories}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
 .then(res => setFilteredData(res?.data?.data?.results))
     }
    filterData()
    setCharacterStories('')
}


    return (
        <div className="characters animate__animated animate__fadeIn">
            
            <div className="characters__title">
            <h2>Characters</h2> 


            </div>
            
            <div className="characters__filters">
                <div className="charactersComics__filter">
                   
                <form onSubmit={searchCharacterbyName}>
                    <SearchIcon />
                    <Input
                    className="characters__input"
                    value={characterName}
                    onChange={e => setCharacterName(e.target.value)}
                    type="text" placeholder="Find by Name"/>
                    <button type="submit">Buscar</button>
                </form>
                </div>
                <div className="charactersComics__filter">
                <form onSubmit={searchCharacterbyComics}>
                <SearchIcon />
                    <Input
                    className="characters__input"
                    value={characterComics}
                    onChange={e => setCharacterComics(e.target.value.replace(/\D/,''))}
                    type="text"  placeholder="Find by comic id"/>
                    <button type="submit">Buscar</button>
                </form>
                </div>
                <div className="charactersComics__filter">
                <form onSubmit={searchCharacterbyStories}>
                <SearchIcon />
                    <Input
                    className="characters__input"
                    value={characterStories}
                    onChange={e => setCharacterStories(e.target.value.replace(/\D/,''))}
                    type="text"  placeholder="Find by story id"/>
                    <button type="submit">Buscar</button>
                </form>
                </div>
            </div>
             
           



        <div className="characters__list ">

            {filteredData?.length ? (
                filteredData?.map(character => (
                    <Character
                    key={character.id}
                    character={character}
                    />
                ))
            ):
            (
                <InfiniteScroll
                className="characters__list row"
                dataLength={characters.length}
                next={infiniteData}
                hasMore={true}
                loader={<div style={{ width:'100vw', display:'flex', justifyContent:'center'}}><CircularProgress /></div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>}
                
                >
                {characters?.filter(character => !character?.thumbnail?.path.includes('image_not_available') && 
               !character?.thumbnail?.extension.includes('gif')).map( character => (
                        <Character
        
                        key={character?.id}
                        character={character}
                        
                        />
                    ))}
        
        
                </InfiniteScroll>
            )
            
            }

  


        </div>
        </div>
    )
}

export default Characters
