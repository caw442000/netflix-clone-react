import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original";


const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] =useState([]);
  const [trailerUrl, setTrailerUrl] = useState("")

  useEffect(() => {
    // async function fetchData() {
    //   const request = await axiosWithAuth.get(fetchUrl);
    //   console.log(request);
    //   setMovies(request.data.results);
    // }
    // fetchData();
    axiosWithAuth()
      .get(`${fetchUrl}`)
      .then(res => {
        console.log(res)
        setMovies(res.data.results)
      })

  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {

      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    console.log(trailerUrl)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'))
          console.log(movie?.name)
          console.log(url)

        })
        .catch((error) => console.log(error))
    }


  }

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className={"row__posters"}>

        {movies.map(movie => (
          (movie.backdrop_path ) ?
            <img key={movie.id} onClick={()=> handleClick(movie)} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path || movie?.poster_path}`} alt={movie.name || movie.title}/>
         
          :<img key={movie.id} alt={movie?.name || movie?.title} style={{display: 'none'}}/>


        ))}

      </div>
     {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
