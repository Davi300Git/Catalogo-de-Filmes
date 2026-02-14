"use client";

import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import MovieCard from '../MOvieCard';
import { Movie } from "@/src/type/movie";
import { useSearch } from '@/src/components/search/SearchProvider';

export default function MovieList(){
    const[movies, setMovies] = useState<Movie[]>([]);
    const { search } = useSearch();
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

    const filtered = movies.filter((m) =>
        m.title?.toLowerCase().includes(search.trim().toLowerCase())
    );

    return(
        <ul className="movie-list">
            {filtered.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
    );
}