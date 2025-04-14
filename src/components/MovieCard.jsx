import React from 'react';
import starIcon from '../assets/images/star.svg'
import noMovieImage from '../assets/images/no-movie.png'

const MovieCard = ({ movie }) => {

    const {
        title,
        name,
        vote_average,
        poster_path,
        release_date,
        first_air_date,
        original_language
    } = movie;

    const displayTitle = title || name || 'Untitled';
    const displayYear = (release_date ?? first_air_date)?.split('-')[0] ?? 'N/A';
    const lang = original_language?.toUpperCase() || '—';

    return (
        <div className='movie-card'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : noMovieImage} alt={title} />

            <div className="mt-4">
                <h3>{displayTitle}</h3>

                <div className="content">
                    <div className="rating">
                        <img src={starIcon} alt="" />
                        <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                    </div>

                    <span>•</span>

                    <p className="lang">{lang}</p>

                    <span>•</span>

                    <p className="year">{displayYear}</p>

                </div>
            </div>
        </div>
    );
};

export default MovieCard;