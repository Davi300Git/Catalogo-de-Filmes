"use client";

import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import MovieCard from '../MOvieCard';
import { Movie } from "@/src/type/movie";
import { useSearch } from '@/src/components/search/SearchProvider';

export default function MovieList(){
    const [movies, setMovies] = useState<Movie[]>([]);
    const { search } = useSearch();
    const [apiPage, setApiPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // initial load
        loadPage(1, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadPage = async (page: number, append = false) => {
        setLoading(true);
        try{
            const res = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                params: {
                    api_key: 'fc421b67bf71618322849fa41c574e89',
                    language: 'pt-BR',
                    page
                }
            });

            const results: Movie[] = res.data.results || [];
            setTotalPages(res.data.total_pages ?? null);
            if(append){
                setMovies(prev => [...prev, ...results]);
            } else {
                setMovies(results);
            }
            setApiPage(page);
        } catch (err) {
            console.error('Erro ao buscar filmes:', err);
        } finally {
            setLoading(false);
        }
    }

    const goToPage = (p: number) => {
        if (p < 1) return;
        if (totalPages && p > totalPages) return;
        loadPage(p, false);
    }

    const filtered = movies.filter((m) =>
        m.title?.toLowerCase().includes(search.trim().toLowerCase())
    );

    // pagination window (2 before/after)
    const pageWindow = 2;
    const startPage = Math.max(1, apiPage - pageWindow);
    const endPage = totalPages ? Math.min(totalPages, apiPage + pageWindow) : apiPage + pageWindow;

    return(
        <>
        <ul className="movie-list">
            {filtered.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>

        <div className="pagination">
            <button className="page-btn" onClick={() => goToPage(apiPage - 1)} disabled={apiPage <= 1 || loading}>Anterior</button>

            {startPage > 1 && (
                <>
                    <button className={`page-number ${1 === apiPage ? 'active' : ''}`} onClick={() => goToPage(1)}>1</button>
                    {startPage > 2 && <span style={{color: '#9aa6bd'}}>...</span>}
                </>
            )}

            {Array.from({ length: Math.max(0, endPage - startPage + 1) }).map((_, i) => {
                const p = startPage + i;
                return (
                    <button key={p} className={`page-number ${p === apiPage ? 'active' : ''}`} onClick={() => goToPage(p)} disabled={loading}>{p}</button>
                );
            })}

            {totalPages && endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span style={{color: '#9aa6bd'}}>...</span>}
                    <button className={`page-number ${totalPages === apiPage ? 'active' : ''}`} onClick={() => goToPage(totalPages)} disabled={loading}>{totalPages}</button>
                </>
            )}

            <button className="page-btn" onClick={() => goToPage(apiPage + 1)} disabled={totalPages !== null && apiPage >= totalPages || loading}>Próxima</button>
        </div>
        </>
    );
}