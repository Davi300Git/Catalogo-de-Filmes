"use client";

import { Movie } from "@/src/type/movie";
import StarRating from "../../StarRating";
import Modal from '@/src/components/Modal';
import { useState } from 'react';
import './index.scss'

export interface Props{
    movie: Movie
}
export default function MovieCard(props: Props){
    const movie = props.movie;
    const [open, setOpen] = useState(false);

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
                    <h2>{movie.title}</h2>
                    <p><strong>Gênero:</strong> {movie.genres && movie.genres.length > 0 ? movie.genres.map(g => g.name).join(', ') : 'Desconhecido'}</p>
                    <p><strong>Diretor:</strong> {movie.credits && movie.credits.crew ? (movie.credits.crew.find(c => c.job === 'Director')?.name ?? 'Desconhecido') : 'Desconhecido'}</p>
                    {movie.overview && <p>{movie.overview}</p>}
                </div>
            </div>
        </Modal>
        </>
    )
}