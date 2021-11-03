import "./App.css";
import { useQuery } from "react-query";
import { MovieData, MovieDiscoverResults } from "./types";
import { FullScreenMessage } from "components/FullScreenMessage";
import FullScreenHero from "components/FullScreenHero";
import MoviesRow from "components/MoviesRow";
import NavBar from "components/NavBar";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "utils/useDebounce";
import MovieModal from "components/MovieModal";

function App() {
  const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;

  const [searchValue, setSearchValue] = useState("");
  const [selectedStarRating, setSelectedStarRating] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);

  const debouncedSearchValue = useDebounce(searchValue, 400);

  const discoverQuery = useQuery<MovieDiscoverResults>("discover", () => {
    const URL = debouncedSearchValue
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${debouncedSearchValue}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

    return fetch(URL).then((res) => res.json());
  });

  useEffect(() => {
    discoverQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  const filteredMovies = useMemo(() => {
    const data = discoverQuery.data;
    if (!data) return [];

    if (selectedStarRating === 0) {
      return data.results;
    }

    return data.results.filter((movie) => {
      return selectedStarRating === Math.ceil(movie.vote_average / 2)

    });
  }, [discoverQuery.data, selectedStarRating]);

  if (discoverQuery.error) {
    return (
      <FullScreenMessage message="Error: Unable to fetch movies. Please try again later" />
    );
  }

  if (discoverQuery.isLoading) {
    return (
      <FullScreenMessage
        message=""
        // messageClassName="animate-pulse"
      />
    );
  }

  if (!discoverQuery.data) {
    return (
      <FullScreenMessage message="Error: Incomplete movie data. Please try again later" />
    );
  }

  return (
    <div>
      <NavBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedStarRating={selectedStarRating}
        setSelectedStarRating={setSelectedStarRating}
      />
      {filteredMovies.length ? (
        <>
          {selectedMovie && (
            <MovieModal movieData={selectedMovie} onClose={() => setSelectedMovie(null)} />
          )}
          <FullScreenHero movieData={filteredMovies[0]} onSelectMovie={setSelectedMovie} />
          <div className="-m-48"></div>
          <MoviesRow movies={filteredMovies.slice(1)} onSelectMovie={setSelectedMovie} />
          {/* TODO: Don't make a new arr copy on each render */}
        </>
      ) : (
        <FullScreenMessage
          message={`No movies that match your query were found`}
        />
      )}
    </div>
  );
}

export default App;
