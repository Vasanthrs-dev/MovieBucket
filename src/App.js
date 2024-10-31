import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/navbar/NavBar";
import Search from "./components/navbar/Search";
import NumResults from "./components/navbar/NumResults";
import Main from "./components/main/Main";
import Box from "./components/main/Box";
import MovieList from "./components/main/MovieList";
import MovieDetails from "./components/main/MovieDetails";
import WatchedSummery from "./components/main/WatchedSummery";
import WatchedList from "./components/main/WatchedList";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const { movies, isLoading, errorMessage } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    handleCloseMovie();
  }

  function handleRemoveMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function navClear() {
    handleCloseMovie();
    setQuery("");
  }

  return (
    <>
      <NavBar onClose={navClear}>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watchedMovie={watched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedList
                watched={watched}
                onRemoveMovie={handleRemoveMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
