"use client";
import Casting from "@/components/Casting/Casting";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import SceneGallery from "@/components/SceneGallery/SceneGallery";
import SceneModal from "@/components/SceneModal/SceneModal";
import SimilarMovieGroup from "@/components/SimilarMovieGroup/SimilarMovieGroup";
import Trailers from "@/components/Trailers/Trailers";
import { Credits, CrewMember } from "@/type/Credits";
import { ImageDetails } from "@/type/SceneType";
import { Movie } from "@/type/SingleMovie";
import { VideoData } from "@/type/YoutubeType";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const BASE_URL = 'https://api.themoviedb.org/3';
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const DetailedTvShowPage = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [youtubeData, setYoutubeData] = useState<VideoData[] | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    const [sceneImages, setSceneImages] = useState<ImageDetails[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const pathname = usePathname();
    const segments = pathname?.split('/') || [];
    const numericTvShowId = Number(segments[segments.length - 1])

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tv/${numericTvShowId}?api_key=${apiKey}`);
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
    }, [numericTvShowId]);

    useEffect(() => {
        const fetchYoutubeData = async () => {
            try {
                const res = await fetch(`${BASE_URL}/tv/${numericTvShowId}/videos?api_key=${apiKey}`);
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
    }, [numericTvShowId]);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tv/${numericTvShowId}/credits?api_key=${apiKey}`)
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
    }, [numericTvShowId]);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tv/${numericTvShowId}/images?api_key=${apiKey}`)
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
    }, [numericTvShowId]);

    const genreNames: string = movie?.genres ? movie.genres.map((genre: { name: string }) => genre.name).join(' ,') : "";

    const featuredCrew = credits?.crew.filter((member: CrewMember) => [
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
                    />
                    <Trailers youtubeData={youtubeData} />
                    <Casting cast={credits?.cast || []} />
                    <SceneGallery mediaType={"tv"} sceneImages={sceneImages} handleImageClick={handleOpenModal} />
                    <SceneModal selectedImage={selectedImage} onClose={handleCloseModal} />
                    <SimilarMovieGroup movieId={numericTvShowId} mediaType={"tv"} />
                </>
            ) : (
                <p>Loading... single tv show</p>
            )}
        </div>
    )
}

export default DetailedTvShowPage;