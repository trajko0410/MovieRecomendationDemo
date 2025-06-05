"use client";

import { movie } from "@/app/utils/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SingleRowCardWrapper from "../singleRowCardWrapper";

const FavoriteTitles = () => {
  const [likedMovies, setLikedMovies] = useState<movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const filterMovies = (movies: movie[]) => {
    const genresParam = searchParams.get("with_genres");
    const minVoteParam = searchParams.get("vote_average.gte");
    const dateFrom = searchParams.get("primary_release_date.gte");
    const dateTo = searchParams.get("primary_release_date.lte");
    const languageParam = searchParams.get("with_original_language");

    const selectedGenres = genresParam
      ? genresParam.split(",").map((id) => Number(id))
      : [];

    return movies.filter((movie) => {
      const movieGenres = movie.genres?.map((g) => g.id) || [];
      const movieVote = movie.vote_average || 0;
      const movieDate = movie.release_date ? new Date(movie.release_date) : null;
      const movieLang = movie.original_language;

      const matchGenres =
        selectedGenres.length === 0 ||
        selectedGenres.some((g) => movieGenres.includes(g));

      const matchVote =
        !minVoteParam || movieVote >= parseFloat(minVoteParam);

      const matchDateFrom =
        !dateFrom || (movieDate && movieDate >= new Date(dateFrom));

      const matchDateTo =
        !dateTo || (movieDate && movieDate <= new Date(dateTo));

      const matchLang =
        !languageParam || movieLang === languageParam;

      return (
        matchGenres &&
        matchVote &&
        matchDateFrom &&
        matchDateTo &&
        matchLang
      );
    });
  };

  // Učitavanje omiljenih filmova iz localStorage
  useEffect(() => {
    setIsLoading(true);
    const stored = localStorage.getItem("likedMovies");
    if (stored) {
      try {
        const parsedMovies: movie[] = JSON.parse(stored);
        setLikedMovies(parsedMovies);
        setFilteredMovies(filterMovies(parsedMovies));
      } catch (err) {
        console.error("Greška pri učitavanju omiljenih filmova:", err);
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refilter kada se promeni query
  useEffect(() => {
    setFilteredMovies(filterMovies(likedMovies));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, likedMovies]);

  return (
    <div className="flex flex-col gap-6 justify-around items-center">
      {isLoading ? (
        <p className="text-[#E8E8E8] text-sm font-semibold text-center ">Loading...</p>
      ) : filteredMovies.length === 0 && isLoading ? (
        <p className="text-gray-400 text-center">
          No liked movies match your filters.
        </p>
      ) : (
        <SingleRowCardWrapper sectionTitle="Liked Movies" data={likedMovies} type="movie" />
      )}
    </div>
  );
};

export default FavoriteTitles;
