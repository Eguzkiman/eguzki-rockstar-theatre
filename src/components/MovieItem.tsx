import { MovieData } from "types";

interface MovieItemProps {
  movieData: MovieData;
  onSelect: (movie: MovieData) => void;
}

export default function MovieItem(props: MovieItemProps) {
  const { movieData, onSelect } = props;

  const posterURL = `https://image.tmdb.org/t/p/original${movieData.poster_path}`;

  return (
    <div className="relative pb-3/2">
      <img
        className="absolute top-0 bg-gray-500 h-full w-full object-cover rounded-lg select-none cursor-pointer"
        src={posterURL}
        alt={`Poster of ${movieData.title}`}
        onClick={() => onSelect(movieData)}
      />
    </div>
  );
}
