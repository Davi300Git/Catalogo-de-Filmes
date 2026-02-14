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
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 3;
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

    // reset page when search changes
    useEffect(() => { setPage(1); }, [search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    const start = (page - 1) * itemsPerPage;
    const paged = filtered.slice(start, start + itemsPerPage);

    return(
        <>
        <ul className="movie-list">
            {paged.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>

        <div className="pagination">
            <button className="page-btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page <= 1}>Anterior</button>
            <div className="pages">
                {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    return (
                        <button key={p} className={`page-number ${p === page ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                    );
                })}
            </div>
            <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page >= totalPages}>Próxima</button>
        </div>
        </>
    );
}