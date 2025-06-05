"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchApi } from "../../utils/api";
import { movie } from "../../utils/types";
import SingleRowCardWrapper from "../singleRowCardWrapper";
import TrendingSlideshow from "./trendingSlideShow";
import { buildQueryString } from "@/app/utils/filterValuesAndFunctions";

const HomePageList = () => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Record<string, string>>({});

  const [trendingMovie, setTrendingMovie] = useState<movie[]>([]);
  const [upcomingMovie, setUpcomingMovie] = useState<movie[]>([]);
  const [discoverTV, setDiscoverTV] = useState<movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<movie[]>([]);
  const [trendingTV, setTrendingTV] = useState<movie[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Kad se promeni URL, izvuci sve query parametre u jedan objekt
  useEffect(() => {
    const paramsObj: Record<string, string> = {};
    for (const key of searchParams.keys()) {
      const value = searchParams.get(key);
      if (value) {
        paramsObj[key] = value;
      }
    }
    setFilters(paramsObj);
  }, [searchParams]);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Kreiraj query string za filtere
      const filterQuery = buildQueryString(filters);

      // Primer: trending movie (ovde nema filtera)
      const trendingMovieRes = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/day?language=en-US`,
      });
      setTrendingMovie(trendingMovieRes.results.slice(0, 4) || []);

      // Računaj datume za upcoming movie (primer)
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);

      const todayStr = today.toISOString().split("T")[0];
      const lastMonthStr = lastMonth.toISOString().split("T")[0];

      // Ovde dodajemo date filter u URL i ostale filtere iz query parametara
      const upcomingResMovie = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?language=en-US&page=1&sort_by=release_date.desc&release_date.gte=${lastMonthStr}&release_date.lte=${todayStr}${filterQuery}`,
      });
      setUpcomingMovie(upcomingResMovie.results.slice(0, 4) || []);

      // Discover TV sa svim filterima
      const discoverTvRes = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc${filterQuery}`,
      });
      setDiscoverTV(discoverTvRes.results.slice(0, 4) || []);

      // Popular movies sa filterima
      const popularMovieRes = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?language=en-US&page=1&sort_by=popularity.desc${filterQuery}`,
      });
      setPopularMovies(popularMovieRes.results.slice(0, 4) || []);

      // Trending TV (ovde bez filtera)
      const trendingTvRes = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/trending/tv/day?language=en-US`,
      });
      setTrendingTV(trendingTvRes.results.slice(0, 4) || []);

      setIsLoading(false);
    };

    fetchData();
  }, [filters]);

  return (
   
      <div className="flex flex-col gap-8">
        {isLoading ? (
                    <p className="text-[#E8E8E8] text-sm font-semibold text-center ">Loading...</p>

        ) : (
          <div className="flex flex-col justify-center items-center gap-8">
            <TrendingSlideshow trending={trendingMovie} type="movie" />
            <SingleRowCardWrapper
              sectionTitle="Trending Movie"
              data={trendingMovie}
              type="movie"
            />
            <SingleRowCardWrapper
              sectionTitle="Movies Released Last Month"
              data={upcomingMovie}
              type="movie"
            />
            <SingleRowCardWrapper
              sectionTitle="Discover TV Shows"
              data={discoverTV}
              type="tv"
            />
            <SingleRowCardWrapper
              sectionTitle="Popular Movies"
              data={popularMovies}
              type="movie"
            />
            <SingleRowCardWrapper
              sectionTitle="Trending TV Shows"
              data={trendingTV}
              type="tv"
            />
          </div>
        )}
      </div>
  );
};

export default HomePageList;
