import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(setWatchedMovie);

  // Getting Movie from Local Storage
  function setWatchedMovie() {
    const localMovie = localStorage.getItem(key);
    return localStorage ? JSON.parse(localMovie) : initialState;
  }

  // Setting Movie to Local Stroage
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
