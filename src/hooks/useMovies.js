import { useEffect, useState } from "react";

const KEY = "c2fbc96c";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovies(data.Search);
          setErrorMessage("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setErrorMessage(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length <= 3) {
        setMovies([]);
        setErrorMessage("");
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, errorMessage };
}
