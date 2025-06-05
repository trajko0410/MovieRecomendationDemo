"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchApi } from "@/app/utils/api";
import SingleCard from "../singleCard";
import { MagnifyingGlass, X } from "phosphor-react";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type: "movie" | "tv";
  vote_average: number;
}

export default function SearchBarWithResults() {
  const pathname = usePathname();
  const isSingleTitlePage = pathname.startsWith("/singleTitle/");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (query.trim().length > 2) {
      setLoading(true);
      const timeout = setTimeout(async () => {
        try {
          const data = await fetchApi({
            url: `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
              query
            )}`,
          });

          const filtered = data.results.filter(
            (item: SearchResult) =>
              (item.media_type === "movie" || item.media_type === "tv") &&
              item.poster_path
          );

          setResults(filtered);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }, 400); // debounce

      return () => {
        clearTimeout(timeout);
        controller.abort();
      };
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isSingleTitlePage) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 z-50 w-[85%] ml-[15%] px-8 mt-8 scrollbar-hide"
    >
      <div className="relative w-full">
        <div className="relative h-[65px]">
          <MagnifyingGlass
            size={26}
            color="#666666"
            className="absolute left-6 top-1/2 -translate-y-1/2 pb-[1px] pointer-events-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#666666]"
            >
              <X size={22} />
            </button>
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies or TV shows..."
          className="w-full h-full rounded-[30px] pl-16 pr-10 bg-[#212121] text-[#666666] text-2xl font-semibold shadow-LightBottom 
             focus:outline-none focus:text-[#666666] focus:ring-2 focus:ring-[#666666]"
          />
        </div>

        {query.length > 2 && (
          <div className="mt-4 inline-block bg-[#212121] rounded-xl shadow-LightBottom p-8 z-40 max-h-[70vh] overflow-y-auto scrollbar-hide max-w-full">
            {loading ? (
              <p className="text-[#666666] text-2xl font-semibold ">
                Searching...
              </p>
            ) : results.length === 0 ? (
              <p className="text-[#666666] text-2xl font-semibold">
                No results found.
              </p>
            ) : (
              <div className="grid grid-cols-6 gap-8 ">
                {results.map((item) => (
                  <SingleCard
                    key={`${item.media_type}-${item.id}`}
                    id={item.id}
                    poster={item.poster_path}
                    vote_average={item.vote_average}
                    title={item.name ?? item.title ?? "Title"}
                    type={item.media_type}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
