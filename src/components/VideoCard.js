import React from 'react'

const VideoCard = ({info}) => {
  function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num
    }
}
function timeAgo(publishedAt) {
  const currentDate = new Date();
  const publishedDate = new Date(publishedAt);
  const timeDifference = currentDate - publishedDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
      return years === 1 ? '1 year ago' : `${years} years ago`;
  } else if (months > 0) {
      return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
      return seconds < 5 ? 'just now' : `${seconds} seconds ago`;
  }
}  

  return (
    <div className='p-2 m-2 w-[330px] shadow-lg'>
      <img className='rounded-lg' alt='banner' src={info?.snippet?.thumbnails?.medium?.url} />
      <h1 className='font-semibold'>{info?.snippet?.title}</h1>
      <p className='text-[#606060]'>{info?.snippet?.channelTitle}</p>
      <div className='flex'>
      <p className='text-[#606060]'>{formatNumber(info?.statistics?.viewCount)} views.</p>
      <p className='text-[#606060] ml-1'>{timeAgo(info?.snippet?.publishedAt)}</p>
      </div>
    </div>
  )
}

export default VideoCard