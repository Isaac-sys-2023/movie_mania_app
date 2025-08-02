"use client";
import { MasterContext } from "@/context/MasterContext";
import React, { useContext, useEffect } from "react";
import MovieCard from "../CardDetails/MovieCard/MovieCard";
import TvShowCard from "../CardDetails/TvShowCard/TvShowCard";
import Pagination from "../Pagination/Pagination";
import { Movie } from "@/type/MovieType";
import { TvShow } from "@/type/TvShowsType";

interface CardGroupProps {
    streamingType: "movie" | "tv";
    activeTab: string;
}

const CardContainer: React.FC<CardGroupProps> = ({ streamingType, activeTab }) => {
    const { movies, setMovieOrTV, setTrendingOptions } = useContext(MasterContext);

    useEffect(() => {
      setMovieOrTV(streamingType)
    }, [setMovieOrTV, setTrendingOptions, streamingType]);
    

    setTrendingOptions(activeTab);

    return (
        <>
            <Pagination/>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:mx-14 mx-4">
                {movies.filter((media)=>media.poster_path).map((media, index)=> streamingType === 'movie' ? <MovieCard key={index} media={media as Movie}/> : <TvShowCard key={index} media={media as TvShow}/>)}
            </div>
            <Pagination/>
        </>
    );
};

export default CardContainer;