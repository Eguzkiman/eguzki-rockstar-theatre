import { MovieData } from "types";
import MovieItem from "components/MovieItem";

interface MoviesRowProps {
  movies: MovieData[];
  onSelectMovie: (movie: MovieData) => void;
}

export default function MoviesRow(props: MoviesRowProps) {
  const { movies, onSelectMovie } = props;

  if (!movies.length) return <></>;

  return (
    <div className="z-30 relative mx-16">
      <h3 className="text-shadow text-3xl">More movies</h3>
      <div className="mb-4" />
      <div className="grid grid-cols-6 gap-3">
        {movies.map((movie) => (
          <MovieItem
            movieData={movie}
            onSelect={onSelectMovie}
            key={movie.id}
          />
        ))}
      </div>
    </div>
  );
}
