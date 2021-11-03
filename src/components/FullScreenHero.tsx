import { MovieData } from "types";

interface FullScreenHeroProps {
  movieData: MovieData;
  onSelectMovie: (movie: MovieData) => void;
}

export default function FullScreenHero(props: FullScreenHeroProps) {
  const { movieData, onSelectMovie } = props;
  const backdropURL = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;

  const shoretenedOverview =
    movieData.overview.length > 180
      ? movieData.overview.slice(0, 180) + "..."
      : movieData.overview;

  return (
    <div className="h-screen w-screen flex relative">
      <div className="absolute bottom-1/3 lg:w-1/3 md:w-auto mx-16 text-shadow z-20">
        <h1 className="text-7xl font-bold">{movieData.title}</h1>
        <div className="mb-8" />
        <p className="text-3xl">{shoretenedOverview}</p>
        <div className="mb-4" />
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white text-xl py-3 px-8 rounded-lg inline-flex items-center"
          onClick={() => onSelectMovie(movieData)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z" />
          </svg>
          <div className="mr-2" />
          <span>More Info</span>
        </button>
      </div>
      <img
        className="h-full w-full object-cover absolute select-none z-0"
        src={backdropURL}
        key={movieData.id}
        alt={`Promo background for ${movieData.title}`}
      />
      <div className="shadow-overlay h-full w-full absolute z-10" />
    </div>
  );
}
