"use client";
import noBanner from "@/assets/no_banner.png";
import noImage from "@/assets/no_image.jpg";
import Casting from "@/components/Casting/Casting";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import SceneGallery from "@/components/SceneGallery/SceneGallery";
import SceneModal from "@/components/SceneModal/SceneModal";
import SimilarMovieGroup from "@/components/SimilarMovieGroup/SimilarMovieGroup";
import Trailers from "@/components/Trailers/Trailers";
import { Credits } from "@/type/Credits";
import { ImageDetails } from "@/type/SceneType";
import { Movie } from "@/type/SingleMovie";
import { VideoData } from "@/type/YoutubeType";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const BASE_URL = 'https://api.themoviedb.org/3';
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const DetailedMoviePage = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [youtubeData, setYoutubeData] = useState<VideoData[] | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    const [sceneImages, setSceneImages] = useState<ImageDetails[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const pathname = usePathname();
    const lastPartOfPath = pathname?.split('/movies/')[1];
    const numericMovieId = Number(lastPartOfPath)

    const imageUrl = movie && movie.poster_path
      ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
      : noImage;
    const backdrop_path = movie && movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : noBanner;


    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movie/${numericMovieId}?api_key=${apiKey}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok`)
                };
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error("Fetch error: ", error)
            }
        }
        fetchMovieData();
    }, [numericMovieId]);

    useEffect(() => {
    const fetchYoutubeData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${numericMovieId}/videos?api_key=${apiKey}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setYoutubeData(data.results.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchYoutubeData();
  }, [numericMovieId]);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movie/${numericMovieId}/credits?api_key=${apiKey}`)
                if (!response.ok) {
                    throw new Error(`Network response was not ok`)
                }
                const data = await response.json();
                setCredits(data);
            } catch (error) {
                console.error("Fetch error: ", error)
            }
        }
        fetchMovieData();
    }, [numericMovieId]);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movie/${numericMovieId}/images?api_key=${apiKey}`)
                if (!response.ok) {
                    throw new Error(`Network response was not ok`)
                }
                const data = await response.json();
                setSceneImages(data.backdrops.slice(0, 6));
            } catch (error) {
                console.error("Fetch error: ", error)
            }
        }
        fetchMovieData();
    }, [numericMovieId]);

    const genreNames: string = movie?.genres ? movie.genres.map((genre: { name: string }) => genre.name).join(' ,') : "";

    const featuredCrew = credits?.crew.filter((member: any) => [
        "Director", "Producer", "Screenplay", "Writer"
    ].includes(member.job));

    const handleOpenModal = (image: string) => {
        setSelectedImage(image);
        const dialog = document.getElementById("scene_modal") as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    }

    const handleCloseModal = () => {
        setSelectedImage(null);
        const dialog = document.getElementById("scene_modal") as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    }   

    return (
        <div>
            {movie ? (
                <>
                    <MediaDetails
                        movie={movie}
                        genreName={genreNames}
                        featuredCrew={featuredCrew ?? []}
                        handleOpenModal={handleOpenModal}
                    />
                    <Trailers youtubeData={youtubeData}/>
                    <Casting cast={credits?.cast || []}/>
                    <SceneGallery mediaType={"movie"} sceneImages={sceneImages} handleImageClick={handleOpenModal}/>
                    <SceneModal selectedImage={selectedImage} onClose={handleCloseModal}/>
                    <SimilarMovieGroup movieId={numericMovieId} mediaType={"movie"}/>
                </>
            ):(
                <p>Loading... single movie</p>
            )}
        </div>
    )
}

export default DetailedMoviePage;