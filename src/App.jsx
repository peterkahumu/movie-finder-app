import React, { useState, useEffect} from "react";
import heroImage from './assets/images/hero.png'
import noMovieImage from './assets/images/no-movie.png'
import Search from './components/Search.jsx'
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./Appwrite.jsx";



const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [movieList, setMovieList] = useState([])

  const [isLoadingMovies, setIsLoadingMovies] = useState(false)
  const [isLoadingTVShows, setIsLoadingTVShows] = useState(false)
  const [isLoadingTrending, setIsLoadingTrending] = useState(false)

  const [trendingMovies, setTrendingMovies] = useState([])
  const [errorTrendingMovies, setErrorTrendingMovies] = useState('')

  const [tvShowsList, setTVShowsList] = useState([])
  const [errorTVShows, setErrorTVShows] = useState('') 

  const fetchMovies = async (query = '') => {
    setIsLoadingMovies(true)
    setErrorMessage('')
    try {
      const endpoint = query.trim() ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/trending/movie/day`

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies.")
      }


      const data = await response.json()

      if (data.Response === 'False') {
        setErrorMessage("Cannot fetch movies. Server seems to be down.")
        setMovieList([])
        return
      }

      setMovieList(data.results || [])
      console.log(data)

      // update the database to record a query if one was provided.
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0])
      }

    } catch (error) {
      console.log(`Error fetching the movies ${error}`)
      setErrorMessage("Error fetching the movies. Please try again later.")
    } finally {
      setIsLoadingMovies(false)
    }
  }

  const fetchTvShows = async (query='') => {
    setIsLoadingTVShows(true)
    try{
        const endpoint = query.trim()? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
        :`${API_BASE_URL}/trending/tv/day`
        const response = await fetch(endpoint, API_OPTIONS)

        if(!response.ok) {
          throw new Error("Failed to fetch TV shows.")
        }

        const data = await response.json()

        if (data.Response === 'False'){
          throw new Error("Cannot fetch movies at the moment. Server seems to be down.")
        }
        setTVShowsList(data.results || [])

    } catch(error){
      console.log(error)
      setErrorTVShows("There was an error fetching your TV Shows.")
    } finally{
      setIsLoadingTVShows(false)
    }
  }

  const loadTrendingMovies = async () => {
    setIsLoadingTrending(true)
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies)

    } catch (error) {
      console.log("An error occured: ", error)
      setErrorTrendingMovies("An error occurred while fetching trending movies.")
    } finally {
      setIsLoadingTrending(false)
    }
  }

  useEffect(()=> {
    loadTrendingMovies()
  }, [])
  // Debounce making requests by half-a-minute.
  // Avoids making too many API calls.
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
    fetchTvShows(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <>
      <main>

        <div className="pattern" ></div>

        <div className="wrapper">
          <header>

            <img src={heroImage} alt="hero banner" />
            <h1>Find the <span className="text-gradient">Movies</span> you will enjoy without a hustle.</h1>

            <Search searchTerm={searchTerm
            } setSearchTerm={setSearchTerm} />
          </header>
          
          <section className="trending">
          <h2>Trending Movies</h2>
          {isLoadingTrending? (
            <Spinner/>
          ) : errorTrendingMovies? (
            <p className="text-red-500">{errorTrendingMovies}</p>
          ): Array.isArray(trendingMovies) && trendingMovies.length > 0 ? (
            <ul>
                {trendingMovies.map((movie, index)=> (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img className="text-white mt-[40px]" src={movie.poster_url? movie.poster_url : noMovieImage} alt={movie.searchTerm} />
                  </li>
                ))}
              </ul>
          ): (
            <p className="text-red-600 mt-[20px] mb-[20px]">No Trending Movies at the moment.</p>
          )
        }
          </section>

          <section className="all-shows">
            <h2 className="mb-[40px]">{debouncedSearchTerm? `Search results for ${debouncedSearchTerm} (TV shows)`: "Popular TV Shows Today" }</h2>
           {isLoadingTVShows? (
            <Spinner/>
           ): errorTVShows? (
            <p className="text-red-500">{errorTVShows}</p>
           ):(
              <ul>
                {tvShowsList.slice(0, 20).map((tvShow) => (
                  <MovieCard key={tvShow.id} movie={tvShow} />
                ))}
              </ul>
           )}

          </section>

          <section className="all-movies">
          <h2 className="mb-[40px]">{debouncedSearchTerm? `Search results for ${debouncedSearchTerm} (Movies)`: "Popular Movies Today" }</h2>
            {isLoadingMovies ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.slice(0, 20).map((movie => (
                  <MovieCard key={movie.id} movie={movie} />
                )))}
              </ul>
            )
            }

          </section>
        </div>
      </main>
    </>
  )
}

export default App;