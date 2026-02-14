'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import MovieCard from '../MOvieCard';
import { Movie } from "@/src/type/movie";

export default function MovieList(){
    const[movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        getMovies();

    }, []); 

    const getMovies = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie', 
            params: {
                api_key: 'fc421b67bf71618322849fa41c574e89',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results);
        });

    }

    return(
        <ul className="movie-list">
            {movies.map((movie) =>
                <MovieCard
                    key={movie.id} 
                    movie={movie}
                    />
            )}
        </ul>
    );
}