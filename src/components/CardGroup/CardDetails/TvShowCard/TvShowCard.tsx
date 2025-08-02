"use client";
import noImage from "@/assets/no_image.jpg";
import Link from "next/link";
import Image from "next/image";
import { Rating, Typography } from "@mui/material";
import { TvShow } from "@/type/TvShowsType";

const TvShowCard = ({ media }: { media: TvShow }) => {
  const imageUrl = media.poster_path ? `https://image.tmdb.org/t/p/w1280${media.poster_path}` : noImage;

  return (
    <Link
      href={`/tv_shows/${media.id}`}
      className="tv-card relative mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] hover:shadow-[3px_4px_8px_2px_rgba(0,0,0,0.5)] hover:transition-all duration-300 cursor-pointer sm:hover:scale-[1.04] transition-transform ease-in-out"
    >
      <div>
        <div>
          <Image
            width={500}
            height={500}
            src={imageUrl}
            className="w-full object-cover"
            alt={media.name || "Imagen de serie no disponible"}
          />
        </div>
        <div className="absolute inset-0 z-10 hover:bg-gradient-to-t from-black via-transparent to-black">
          <div className="flex justify-between items-center p-4 rating-bar">
            <small className="text-xs text-gray-200">Total votes: {media.vote_count}</small>
            <div className="tooltip tooltip-bottom" data-tip={(media.vote_average / 2).toFixed(1) + ` / 5`}>
              <Rating
                name="read-only"
                readOnly
                size="small"
                value={media.vote_average/2}
                precision={0.5}
                max={5}
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 tvShow-info">
          <p className="mb-1 text-sm text-white text-opacity-80">
            {media.origin_country} <time>{media.first_air_date}</time>
          </p>
          <h3>
            {media.name}
          </h3>
          <p>
            {media.overview.slice(0,45)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TvShowCard;