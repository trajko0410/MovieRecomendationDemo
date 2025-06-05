"use client";

import { fetchApi } from "@/app/utils/api";
import { buildQueryString } from "@/app/utils/filterValuesAndFunctions";
import { movie } from "@/app/utils/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CaretCircleLeft, CaretCircleRight } from "phosphor-react";
import SingleRowCardWrapper from "../singleRowCardWrapper";

export default function SeeMoreComponent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [mediaData, setMediaData] = useState<movie[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isMoviePage = pathname.includes("/movies");
  const endpointType = isMoviePage ? "movie" : "tv";

  useEffect(() => {
    const paramsObj: Record<string, string> = {};
    for (const key of searchParams.keys()) {
      const value = searchParams.get(key);
      if (value) {
        paramsObj[key] = value;
      }
    }
    setFilters(paramsObj);
    setPage(1);
  }, [searchParams]);

  //console.log(filters);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const filterQuery = buildQueryString(filters);

      const res = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/discover/${endpointType}?sort_by=popularity.desc&page=${page}${filterQuery}`,
      });

      setMediaData(res.results || []);
      setTotalPages(res.total_pages || 1);

      setIsLoading(false);
    };

    fetchData();
  }, [filters, endpointType, page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  //console.log(page, "curent page", totalPages, "totalPages");
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      {isLoading ? (
        <p className="text-[#E8E8E8] text-sm font-semibold text-center ">Loading...</p>
      ) : (
        <>
                  <SingleRowCardWrapper sectionTitle={`Popular ${isMoviePage ? "Movies" : "TV Shows"}`} data={mediaData} type={endpointType} />


          <div className="flex justify-center items-center gap-4 mt-8 ">
            <CaretCircleLeft
              size={36}
              onClick={handlePrev}
              className={`cursor-pointer transition-colors ${
                page === 1
                  ? "text-[#666666] opacity-30  cursor-not-allowed"
                  : "text-[#E8E8E8] hover:text-white transition-colors duration-300"
              }`}
            />

            <span className="text-[#666666] text-sm font-semibold">
              Page {page} / {totalPages}
            </span>

            <CaretCircleRight
              size={36}
              onClick={handleNext}
              className={`cursor-pointer transition-colors ${
                page === totalPages
                  ? "text-[#666666] opacity-30 cursor-not-allowed"
                  : "text-[#b5b5b5] hover:text-white transition-colors duration-300"
              }`}
            />
          </div>
        </>
      )}
    </div>
  );
}
