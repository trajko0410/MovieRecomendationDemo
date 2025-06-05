/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "../../utils/api";
import { useParams } from "next/navigation";

import ImageSection from "./imageSection";
import AboutMovieSection from "./AboutMovieSection";
import SingleRowCardWrapper from "../singleRowCardWrapper";
import CastSection from "./castSection";
import MetaSection from "./metaSection";
import { movie } from "@/app/utils/types";

export default function SingleTitlePageComponent() {
  const params = useParams();
  const id = params.id; // ako je ruta [id]
  const type = typeof params.type === "string" ? params.type : "";

  const [loading, setIsLoading] = useState(false);
  const [singleTitle, setSingleTitle] = useState<movie | null>(null);

  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState<string | null>(null);
   
  const [writers, setWriters] = useState<any>([]);
  const [similarTitles, setSimilarTitles] = useState<movie[] >([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  


      type Video = {
        site: string;
        type: string;
        official?: boolean;
        key: string;
      };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const singletitle = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${id}`,
      });
      setSingleTitle(singletitle);

      // 2. Cast & crew
      const credits = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${id}/credits`,
      });

      setCast(credits.cast?.slice(0, 4) || []);

      const directorObj = credits.crew?.find(
        (person: any) => person.job === "Director"
      );
      setDirector(directorObj?.name || null);

      const writersArr = credits.crew?.filter(
        (person: any) => person.job === "Writer" || person.job === "Screenplay"
      );
      const writerNames = writersArr?.map((w: any) => w.name) || [];
      setWriters(writerNames);

      // Similar movies
      const similar = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${id}/similar`,
      });
      setSimilarTitles(similar.results?.slice(0, 4) || []);

      // fetching viedo
      const videos = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${id}/videos`,
      });

 

      const trailer =
        videos.results?.find(
          (vid: Video) =>
            vid.site === "YouTube" &&
            vid.type === "Trailer" &&
            vid.official === true
        ) ||
        videos.results?.find(
          (vid: Video) => vid.site === "YouTube" && vid.type === "Trailer"
        );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
      } else {
        setTrailerUrl(null);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id, type]);


  if (loading && singleTitle===null) {
  return (
    <div className="w-full flex items-center justify-center text-[#E8E8E8] text-xl">
<p className="text-[#E8E8E8] text-sm font-semibold text-center ">Loading...</p>    </div>
  );
}

if (!loading && !singleTitle) {
  return (
    <div className="w-full flex items-center justify-center text-[#E8E8E8] text-xl">
      <p className="text-[#E8E8E8] text-sm font-semibold text-center ">Cant find anything at this point...</p>   
    </div>
  );
}
  return (
    <div className="flex flex-col gap-6">
      <ImageSection singleTitle={singleTitle} trailerUrl={trailerUrl} />
      <div className="flex flex-row w-full gap-6 ">
        <div className="w-[60%] flex flex-col gap-8">
          {singleTitle && (
            <AboutMovieSection
              singleTitle={singleTitle}
              director={director}
              cast={cast}
              writers={writers}
            />
          )}
          <SingleRowCardWrapper
            data={similarTitles}
            type={type}
            sectionTitle="Similar to this title"
          />
        </div>
        <div className="w-[40%] flex flex-col gap-6 ">
          {singleTitle && <MetaSection singleTitle={singleTitle} />}
          <CastSection cast={cast} />
        </div>
      </div>
    </div>
  );
}
