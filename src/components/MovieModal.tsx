import { useEffect } from "react";
import { MovieData } from "types";
import { useLockBodyScroll } from "utils/useLockBodyScroll";
import StarRating from "./StarRating";

export interface MovieModalProps {
  movieData: MovieData;
  onClose: () => void;
}

export default function MovieModal(props: MovieModalProps) {
  const { movieData, onClose } = props;
  useLockBodyScroll();

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (!movieData) return <></>;

  const backdropURL = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;

  return (
    <div className="fixed overflow-auto h-screen w-screen z-50 bg-gray-900 bg-opacity-60 text-center">
      <div className="inline-block relative w-modal my-8 bg-gray-900 bg-opacity-100 rounded-lg overflow-hidden text-left">
        <button
          type="button"
          className="absolute top-8 right-8 bg-white bg-opacity-70 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 z-20"
          onClick={onClose}
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="relative pb-1/2">
          <img
            className="absolute top-0 bg-gray-500 h-full w-full object-cover select-none"
            src={backdropURL}
            alt={`Promo of ${movieData.title}`}
          />
          <div className="absolute top-0 shadow-overlay h-full w-full absolute z-10" />
        </div>
        <div className="-mt-12" />
        <div className="relative px-8 z-20">
          <div className="flex items-center justify-between">
            <h1 className="text-7xl">{movieData.title}</h1>
            <StarRating currentRating={movieData.vote_average / 2} />
          </div>
          <div className="mb-8" />
          <p className="text-xl leading-relaxed">{movieData.overview}</p>
          <div className="mb-8" />
          <p className="text-lg">Released: {movieData.release_date}</p>
          <p className="text-lg">Total votes: {movieData.vote_count}</p>
          <p className="text-lg">Vote average: {movieData.vote_average}</p>
          <div className="mb-8" />
        </div>
      </div>
      <div className="mb-8" />
    </div>
  );
}
