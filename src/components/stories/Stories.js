import React,{useState,useEffect} from 'react'
import './Stories.css'
import Story from './Story';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@material-ui/core';
import { PUBLIC_KEY, HASH, BASE_URL } from './../../api/constants';
import axios from 'axios'

const Stories = () => {
    const [offset, setOffset] = useState(0)
    const [count]= useState(30)
    const URI = `${BASE_URL}/stories?orderBy=-id&limit=${count}&offset=${offset}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    const [stories, setStories] = useState([])

    useEffect(()=> {
        axios.get(URI)
        .then(res => setStories(res?.data?.data.results))
        setOffset(offset => offset + count +1)
    },[,count])

    const infiniteData = async () => {
        setOffset(offset => offset + count +1)
        await axios.get(URI)
        .then(res => setStories([...stories,...res?.data?.data.results]))
    }

    return (
        <div className="stories">
            <div className="stories__title">
            <h2>Stories</h2>
            </div>

        <div className="stories__list">

        <InfiniteScroll
                className="characters__list row"
                dataLength={stories?.length}
                next={infiniteData}
                hasMore={true}
                loader={<div style={{ width:'100vw', display:'flex', justifyContent:'center'}}><CircularProgress /></div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>}
                
                >
                   
        {stories?.map( story => (
                <Story
                key={story.id}
                story={story}
                
                />
            ))}

</InfiniteScroll>  
        </div>
        </div>
    )
}

export default Stories
