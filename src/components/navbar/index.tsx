"use client";

import './index.scss';
import { useSearch } from '@/src/components/search/SearchProvider';

export default function Navbar(){
    const { search, setSearch } = useSearch();

    return(
        <nav className="navbar">
            <h1 className="page-title">Filmes</h1>
            <div className="search-wrapper">
                <input
                    className="search-input"
                    placeholder="Pesquisar filmes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </nav>
    )
}