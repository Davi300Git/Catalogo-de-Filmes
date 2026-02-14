"use client";

import './index.scss';
import { useSearch } from '@/src/components/search/SearchProvider';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Navbar(){
    const { search, setSearch } = useSearch();
    const [query, setQuery] = useState(search || "");

    useEffect(() => {
        setQuery(search || "");
    }, [search]);

    useEffect(() => {
        const id = setTimeout(() => {
            setSearch(query);
        }, 300);
        return () => clearTimeout(id);
    }, [query, setSearch]);

    return(
        <nav className="navbar">
            <h1 className="page-title">Catalogo de Filmes do Davi</h1>
            <div className="search-wrapper">
                <div className="search-input-wrap">
                    <FaSearch className="search-icon" aria-hidden="true" />
                    <input
                        className="search-input"
                        placeholder="Pesquisar filmes..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Pesquisar filmes"
                    />
                </div>
            </div>
        </nav>
    )
}