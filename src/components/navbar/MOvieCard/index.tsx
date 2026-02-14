"use client";

import { Movie } from "@/src/type/movie";
import StarRating from "../../StarRating";
import Modal from '@/src/components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss'

export interface Props{
    movie: Movie
}
export default function MovieCard(props: Props){
    const movie = props.movie;
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState<any | null>(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        if (!open) return;
        if (details) return;
        const load = async () => {
            setLoadingDetails(true);
            try{
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
                    params: {
                        api_key: 'fc421b67bf71618322849fa41c574e89',
                        language: 'pt-BR',
                        append_to_response: 'credits'
                    }
                });
                setDetails(res.data);
            }catch(e){
                console.error('Erro ao buscar detalhes do filme', e);
            }finally{
                setLoadingDetails(false);
            }
        };
        load();
    }, [open, details, movie.id]);

    return(
        <>
        <li className='movie-card'>
            <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                 alt={movie.title} 
            />
            </div>
            <div className="movie-infos">
                <p className="movie-title"> 
                    {movie.title}
                </p>

                {movie.vote_average > 0 &&
                  <StarRating
                    rating={movie.vote_average}
                />          
                }
                
                <div className="hidden-content">
                    {movie.overview && 
                        <p className='description'>
                        {movie.overview.length > 100
                            ? `${movie.overview.substring(0,100)}...`
                            : movie.overview
                        }
                    </p>
                    }
                    
                    <button className="btn-default" onClick={() => setOpen(true)}>
                        Ver mais
                    </button>
                </div>
            </div> 
        </li>

        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="modal-body">
                <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />
                <div className="meta">
                    {loadingDetails ? (
                        <p>Carregando...</p>
                    ) : (
                        <>
                            <h2>{details?.title ?? movie.title}</h2>

                            <p><span className="modal-label">Nota:</span> {details?.vote_average ?? movie.vote_average ?? 'N/A'}</p>

                            <p><span className="modal-label">Gênero:</span> {details?.genres && details.genres.length > 0 ? details.genres.map((g:any) => g.name).join(', ') : (movie?.genres ? movie.genres.map((g:any)=>g.name).join(', ') : 'Desconhecido')}</p>

                            <p><span className="modal-label">Diretor:</span> {details?.credits?.crew ? (details.credits.crew.find((c:any) => c.job === 'Director')?.name ?? 'Desconhecido') : 'Desconhecido'}</p>

                            <p className="modal-section-title"><span className="modal-label">Sinopse:</span></p>
                            <p>{details?.overview ?? movie.overview ?? 'Sem sinopse'}</p>

                            <p><span className="modal-label">Elenco:</span> {details?.credits?.cast ? details.credits.cast.slice(0,6).map((p:any)=>p.name).join(', ') : 'Desconhecido'}</p>
                        </>
                    )}
                </div>
            </div>
        </Modal>
        </>
    )
}