import React,{useState,useEffect} from 'react'
import Character from './Character'
import './Characters.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Input, MenuItem, Select, CircularProgress } from '@material-ui/core';
import SearchIcon  from '@material-ui/icons/Search';
import axios from 'axios'

const Characters = () => {

    const PUBLIC_KEY = 'c41644a8e3492b01a30e89f7838aa4f5'
    const HASH = 'b93e66cb4173c623ae254b1c6eec0860'
   
    const [characters, setCharacters] = useState([])
    const [count]= useState(60)
    const [offset, setOffset] = useState(0)
    const [order, setOrder]= useState('name')
   const [characterName, setCharacterName]= useState('')
   const [characterComics, setCharacterComics] = useState('')
   const [characterStories, setCharacterStories] = useState('')
  const [filteredData, setFilteredData] = useState([])
    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/characters?orderBy=${order}&limit=${count}&offset=${offset}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    useEffect(()=> {
const fetchData = async () => {
    
   await fetch(MARVEL_CHARACTER)
    .then(res => res.json())
    .then(res => setCharacters([...res?.data.results]))
}
fetchData()
        setOffset(offset => offset + count +1)
    },[ ,order])

    const infiniteData = async () => {
        setOffset(offset => offset + count +1)
        await fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setCharacters([...characters,...res?.data?.results]))
    }

    // filter by name
const searchCharacterbyName = e => {
    e.preventDefault()
    const filterData = async () => {
        await axios.get(`https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
        .then(res => setFilteredData(res?.data.data.results))
    }

    filterData()
    setCharacterName('')
}
//Ultimate X-Men (2000) #40
// filter by COmics
const searchCharacterbyComics = e => {
     e.preventDefault()
     const filterData = async () => {
 await axios.get(`https://gateway.marvel.com:443/v1/public/characters?comics=${characterComics}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
 .then(res => setFilteredData(res?.data?.data?.results))
     }
    filterData()
    setCharacterComics('')
}

//filter by Stories
const searchCharacterbyStories= e => {
    e.preventDefault()
     const filterData = async () => {
 await axios.get(`https://gateway.marvel.com:443/v1/public/characters?stories=${characterStories}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
 .then(res => setFilteredData(res?.data?.data?.results))
     }
    filterData()
    setCharacterStories('')
}


    return (
        <div className="characters animate__animated animate__fadeIn">
            
            <div className="characters__title">
            <h2>Characters</h2> 

            <div className="characters__orderSelect">
                <h5>Order by:</h5>
            <Select
            
            className="characters__select"
             value={order}
            onChange={e => setOrder(e.target.value)}
            >
                <MenuItem className="orderBy__option" value='name'>Ascendant</MenuItem>
                <MenuItem  className="orderBy__option" value='-name'>Descendant</MenuItem>
            </Select>

            </div>
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
