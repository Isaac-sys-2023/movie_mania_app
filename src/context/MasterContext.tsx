"use client";

import { MasterDataContext } from '@/type/MasterDataType';
import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react';

const defaultContextValue: MasterDataContext = {
    movies: [],
    page: 1,
    searchResult: [],
    sliderData: [],
    similarMovies: [],
    loading: true,
    error: null,
    detailsType: "movie",
    singleMovie: {},
    movieOrTV: "movie",
    movieId: "",
    setQuery: () => { },
    setDetailsType: () => { },
    setSingleMovie: () => { },
    setMovieId: () => { },
    setTrendingOptions: () => { },
    setMovieOrTV: () => { },
    setPage: () => { },
};

const BASE_URL = 'https://api.themoviedb.org/3';
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const MasterContext = createContext<MasterDataContext>(defaultContextValue);

interface MasterContextProps {
    children: ReactNode;
}

const MainContext: React.FC<MasterContextProps> = ({ children }) => {
    const [movies, setMovies] = useState<any[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [movieOrTV, setMovieOrTV] = useState("movie");
    const [trendingOptions, setTrendingOptions] = useState("top_rated");

    const [singleMovie, setSingleMovie] = useState<{}>({});
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [sliderData, setSliderData] = useState<any[]>([]);
    const [similarMovies, setSimilarMovies] = useState<any[]>([]);
    const [query, setQuery] = useState<string>("");
    const [detailsType, setDetailsType] = useState<"movie" | "tv">("movie");
    const [movieId, setMovieId] = useState<string>("");

    const prevTrendingOptionsRef = useRef<string>(trendingOptions);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/${movieOrTV}/${trendingOptions}?api_key=${apiKey}&page=${page}`)
                if (!response.ok) {
                    const errorText = await response.text()
                    console.error("Response Error:", errorText);
                    throw new Error(`Network response was not ok: ${response.statusText}`)
                }
                const data = await response.json();
                setMovies(data.results)
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        // Check if trendingOptions has changed, if so, reset page to 1
        if (prevTrendingOptionsRef.current !== trendingOptions) {
            setPage(1);
        }

        // Update the previous trendingOptions ref
        prevTrendingOptionsRef.current = trendingOptions;

        fetchData();
    }, [page, movieOrTV, trendingOptions]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${apiKey}`)
                if (!response.ok) {
                    throw new Error(`Network response was not ok`)
                }
                const data = await response.json();
                setSliderData(data.results);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/search/movie?api_key=${apiKey}$query=${query}`)
                if (!response.ok) {
                    throw new Error(`Network response was not ok`)
                }
                const data = await response.json();
                setSearchResult(data.results);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    useEffect(() => {
        const fetchSimilarMovies = async () => {
            if (movieId) {
                try {
                    const response = await fetch(
                        `${BASE_URL}/movie/${movieId}/similar?api_key=${apiKey}`
                    );
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    setSimilarMovies(data.results);
                } catch (error) {
                    setError(error as Error);
                    console.error("Fetch error:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSimilarMovies();
    }, [movieId]);

    const contextValue: MasterDataContext = {
        movies,
        page,
        searchResult,
        sliderData,
        similarMovies,
        loading,
        error,
        detailsType,
        movieOrTV,
        singleMovie,
        movieId,
        setQuery,
        setDetailsType,
        setSingleMovie,
        setMovieId,
        setMovieOrTV,
        setTrendingOptions,
        setPage,
    };

    return (
        <MasterContext.Provider value={contextValue}>
            {children}
        </MasterContext.Provider>
    );
};

export default MainContext;
