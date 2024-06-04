import React, { useEffect, useState } from 'react'
import {GOOGLE_API_KEY} from '../utils/constants'
import ResultVideoCard from './ResultVideoCard';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openMenu } from '../utils/appSlice';

const ResultPage = () => {
    const [searchVideos, setSearchVideos] = useState([]);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [nextPageToken, setNextPageToken] = useState(null);
    const query = searchParams.get('search_query');

    const getResults = async (pageToken = '') => {
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${GOOGLE_API_KEY}` +
                  (pageToken ? `&pageToken=${pageToken}` : '');
      const data = await fetch(url);
      const json = await data.json();
      console.log(json);
      if (pageToken) {
          setSearchVideos((prevVideos) => [...prevVideos, ...json.items]);
      } else {
          setSearchVideos(json.items);
      }
      setNextPageToken(json.nextPageToken);
  };

  useEffect(() => {
          getResults();
          dispatch(openMenu());
  }, []);

  const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      getResults(nextPageToken);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, [nextPageToken]);
  return (
    <div className=' ml-52 w-8/12'>
        {searchVideos.map((video) => <Link key={video.id.videoId} to={"/watch?v="+video.id.videoId}><ResultVideoCard info={video} /></Link>)}
    </div>
  );
}

export default ResultPage;