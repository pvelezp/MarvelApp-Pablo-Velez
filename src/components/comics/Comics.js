import React,{useState,useEffect} from 'react'
import Comic from './Comic';
import './Comics.scss'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress, MenuItem, Select } from '@material-ui/core';
import { PUBLIC_KEY, HASH, BASE_URL } from './../../api/constants';

const Comics = () => {
    const [order]= useState('issueNumber')
    const [offset, setOffset] = useState(0)
    const [count]= useState(70)
    const MARVEL_CHARACTER = `${BASE_URL}/comics?orderBy=${order}&limit=${count}&offset=${offset}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`
    const [comics, setComics] = useState([])
    const [titleText, setTitleText]= useState('')
    const [filteredData, setFilteredData] = useState([])
    const [issue, setIssue] = useState('')
    const [format, setFormat] =useState('')
   
    useEffect(()=> {
        axios.get(MARVEL_CHARACTER)
        .then(res =>setComics(res?.data.data.results))
        setOffset(offset => offset + count +1)
    },[ ,order,count])

    const infiniteData = async () => {
        setOffset(offset => offset + count +1)
        await axios.get(MARVEL_CHARACTER)
        .then(res => setComics([...comics,...res?.data?.data.results]))
    }


    // Search by issue number
    const searchByIssueNumber = (e) => {
        e.preventDefault()
        const filterData = async () => {
            await axios.get(`${BASE_URL}/comics?issueNumber=${issue}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
            .then(res => setFilteredData(res.data.data.results))
        }
        filterData()
        setIssue('')
    }

    // search by name
    const searchByComicName = (e) => {
        e.preventDefault()
        const filterData = async () => {
            await axios.get(`${BASE_URL}/comics?title=${titleText}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
            .then(res => setFilteredData(res.data.data.results))
        }
        filterData()
        setTitleText('')
    }

   return (
        <div className="comics animate__animated animate__fadeIn">
            <h2>Comics</h2>


                    
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
