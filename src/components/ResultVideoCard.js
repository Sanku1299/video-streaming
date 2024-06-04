import React from "react";

const ResultVideoCard = ({info}) => {
  return (
    <div className=" my-8">
      <div className="flex mx-auto">
        <div className=" w-6/12 flex justify-center">
          <img
            className=" rounded-2xl"
            alt=""
            src={info?.snippet?.thumbnails?.high?.url}
          />
        </div>
        <div className="w-6/12">
          <h2 className=" mb-2 font-bold">{info?.snippet?.title}</h2>
          <p className=" font-thin">{info?.snippet?.channelTitle}</p>
          <p>{info?.snippet?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultVideoCard;