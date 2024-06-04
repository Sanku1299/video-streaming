import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openMenu } from "../utils/appSlice";
import ReactLoading from "react-loading";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getVideos();
    dispatch(openMenu());
  }, []);

  const getVideos = async (pageToken = "") => {
    const data = await fetch(
      YOUTUBE_VIDEOS_API + (pageToken ? `&pageToken=${pageToken}` : "")
    );
    const json = await data.json();
    console.log(json);
    setNextPageToken(json.nextPageToken);
    setVideos((prevVideos) => [...prevVideos, ...json.items]);
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
    )
      return;
    setLoading(true); // Set loading state to true
    setTimeout(() => {
      getVideos(nextPageToken);
    }, 1000); // Delay the fetch by 2 seconds
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageToken]);

  return (
    <div className="flex flex-wrap">
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
      {loading && (
        <div className="w-full flex justify-center my-4">
          <ReactLoading type={"spokes"} color="#000" height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default VideoContainer;