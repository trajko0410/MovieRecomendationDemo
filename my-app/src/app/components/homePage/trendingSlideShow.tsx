"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { movie } from "../../utils/types";
import { FilmSlate, Info } from "phosphor-react";

type Props = {
  trending: movie[];
  type: string
};

const TrendingSlideshow: React.FC<Props> = ({ trending, type }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % trending.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [trending.length]);

  if (trending.length === 0) {
    return <div className="hidden"></div>;
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-LightBottom">
      <div
        className="flex transition-transform duration-800 ease-in-out overflow-clip rounded-2xl"
        style={{
          transform: `translateX(-${index * 25}%)`,
          width: `${trending.length * 100}%`,
        }}
      >
        {trending.map((movie) => {
          const hasImage = movie.backdrop_path || movie.poster_path;
          const imagePath = hasImage
            ? `https://image.tmdb.org/t/p/original${
                movie.backdrop_path || movie.poster_path
              }`
            : null;

          return (
            <div
              key={movie.id}
              className="w-full h-[400px] relative  bg-black rounded-2xl overflow-clip"
            >
              {imagePath ? (
                <Image
                  src={imagePath}
                  alt={movie.title || "slideshow"}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/40">
                  <FilmSlate size={64} color="#ffffffcc" />
                </div>
              )}

              <Link
                href={`/singleTitle/${type}/${movie.id}`}
                className="absolute bottom-2 right-2 bg-[#2b2b2b6d]  backdrop-blur-sm p-4 rounded-2xl flex flex-row justify-center items-center gap-4 w-[168px] h-[55px] hover:text-black  transition-colors text-[#E8E8E8] duration-200 "
              >
                <button className="flex items-center justify-center gap-2 font-semibold text-base">
                  <span>View Details</span>
                  <Info weight="bold" size={25} />
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingSlideshow;
