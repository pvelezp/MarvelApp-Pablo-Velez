import React,{useState,useEffect} from 'react'
import Comic from './Comic';
import './Comics.css'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress, MenuItem, Select } from '@material-ui/core';

const Comics = () => {
    const PUBLIC_KEY = 'c41644a8e3492b01a30e89f7838aa4f5'
    const HASH = 'b93e66cb4173c623ae254b1c6eec0860'
    const [order, setOrder]= useState('issueNumber')
    
    const [offset, setOffset] = useState(0)
    const [count]= useState(70)
    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/comics?orderBy=${order}&limit=${count}&offset=${offset}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`


    const [comics, setComics] = useState([])

    const [titleText, setTitleText]= useState('')
    const [filteredData, setFilteredData] = useState([])
    const [issue, setIssue] = useState('')

    const [format, setFormat] =useState('')

   
    useEffect(()=> {
        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res =>setComics(res?.data.results))
        setOffset(offset => offset + count +1)
    },[ ,order,count])

    const infiniteData = async () => {
        setOffset(offset => offset + count +1)
        await fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setComics([...comics,...res?.data?.results]))
    }


    // search by format 
    const searchByFormat =  (e) => {
        e.preventDefault()
       setFormat(e.target.value)
        const filterData = async () => {
            await axios.get(`https://gateway.marvel.com:443/v1/public/comics?format=${format}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
            .then(res => setFilteredData(res.data.data.results))
        }
        filterData()
    }


    // Search by issue number
    const searchByIssueNumber = (e) => {
        e.preventDefault()
        const filterData = async () => {
            await axios.get(`https://gateway.marvel.com:443/v1/public/comics?issueNumber=${issue}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
            .then(res => setFilteredData(res.data.results))
        }
        filterData()
        setIssue('')
    }

    // search by name
    const searchByComicName = (e) => {
        e.preventDefault()
        const filterData = async () => {
            await axios.get(`https://gateway.marvel.com:443/v1/public/comics?title=${titleText}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
            .then(res => setFilteredData(res.data.data.results))
        }
        filterData()
        setTitleText('')
    }


    

    return (
        <div className="comics animate__animated animate__fadeIn">
            <h2>Comics</h2>

      
            <div className="comics__orderSelect">
               <div className="comics__orderName">
               <h5>Order by:</h5>
            <Select
            className="comics__select"
             value={order}
            onChange={e => setOrder(e.target.value)}
            >
                <MenuItem className="orderBy__option" value='issueNumber'>asc</MenuItem>
                <MenuItem  className="orderBy__option" value='-issueNumber'>desc</MenuItem>
            </Select>

               </div>
            
           <div className="comics__orderFormat">
           <h5>Search format:</h5>
                <Select
                className="comics__formatSelect"
                value={format}
                onChange={searchByFormat}
                >
                    <MenuItem  className="orderBy__option"   value='comic'>Comic</MenuItem>
                    <MenuItem  className="orderBy__option" value='magazine'>Magazine</MenuItem> 
                    <MenuItem  className="orderBy__option" value='trade paperback'>Trade paperback</MenuItem>
             <MenuItem  className="orderBy__option" value='hardcover'>Hardcover</MenuItem>
                    <MenuItem  className="orderBy__option" value='digest'>Digest</MenuItem>
                    <MenuItem  className="orderBy__option" value='digital comic'>Digital Comic</MenuItem>
                    <MenuItem className="orderBy__option"  value='infinite comic'>Infinite Comic</MenuItem> 

                </Select>
           </div>

            </div>
         
           
            <div className="comics__filters">
               
              
                <div className="comics__filter">
                <form onSubmit={searchByIssueNumber}>
                <SearchIcon />
                    <input 
                    value={issue}
                    onChange={e => setIssue(e.target.value.replace(/\D/,''))}
                    type="text" placeholder="Find by Issue Number"/>
                    <button type="submit">Buscar</button>
                </form>
                </div>
                <div className="comics__filter">
                <form onSubmit={searchByComicName}>
                <SearchIcon />
                    <input
                    value={titleText}
                    onChange={e => setTitleText(e.target.value)}
                    type="text" placeholder="Find by title"/>
                    <button type="submit">Buscar</button>
                </form>
                </div>
            </div>
       
        <div className="comics__list ">

        <div className="comics__formatTitle">
           {format ? <h5>Comics ordered by {format} format</h5>: null }
           </div>

        {
         filteredData?.length  ? (
             filteredData?.map(comic => (
                <Comic
                key={comic.id}
                comic={comic}
                
                />
             ))
         )
       :
               (
                <InfiniteScroll
                className="characters__list row"
                dataLength={comics?.length}
                next={infiniteData}
                hasMore={true}
                loader={<div style={{ width:'100vw', display:'flex', justifyContent:'center'}}><CircularProgress /></div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>}
                
                >
                   
               { comics?.filter(comic => comic?.images?.length).map( comic => (
                    <Comic
                    key={comic.id}
                    comic={comic}
                    
                    />
                ))}
                </InfiniteScroll>
               )
             
  
        }
        </div>
        </div>
    )
}

export default Comics
