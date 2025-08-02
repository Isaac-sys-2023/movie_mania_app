import { Media } from "./MediaType";
import { Movie } from "./SingleMovie";

export type MasterDataContext = {
  // movies: any[];
  // searchResult: any[];
  // sliderData: any[];
  // similarMovies: any[];
  movies: Media[];
  searchResult: Media[];
  sliderData: Media[];
  similarMovies: Media[];


  loading: boolean;
  error: Error | null;
  page: number;
  detailsType: "movie" | "tv";
  movieOrTV: string;

  // singleMovie: {};
  singleMovie: Movie | null;

  movieId: string;
  setTrendingOptions: (trendingOptions: string | ((prev: string) => string)) => void;
  setMovieOrTV: (movieOrTV: "movie" | "tv" | ((prev: "movie" | "tv") => "movie" | "tv")) => void;
  setPage: (page: number | ((prev: number) => number)) => void;
  setQuery: (query: string | ((prev: string) => string)) => void;
  setDetailsType: (
    detailsType: "movie" | "tv" | ((prev: "movie" | "tv") => "movie" | "tv")
  ) => void;

  // setSingleMovie: (singleMovie: {} | ((prev: {}) => {})) => void;
  setSingleMovie: (singleMovie: Movie | null | ((prev: Movie | null) => Movie | null)) => void;

  setMovieId: (movieId: string | ((prev: string) => string)) => void;
}