import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import requests from "../utils/requests";
import './Banner.css'

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`${requests.fetchNetflixOriginals}`)
      .then((res) => {
        setMovie(
          res.data.results[Math.floor(Math.random() * res.data.results.length)]
        );
      });
  }, []);


  // truncate text
  const truncate = (str, n) => {
    return str?.length> n ? str.substr(0, n-1) +"...": str;
  }

  console.log(movie);
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.orginal_name}</h1>
        {/* div > 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">{truncate(movie?.overview,150)}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
