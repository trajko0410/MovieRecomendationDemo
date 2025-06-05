import { movie } from "@/app/utils/types";
import { ImageIcon,  PlayIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

type imageSectionProps = {
  singleTitle: movie | null;
  trailerUrl: string | null;
};

export default function ImageSection({ singleTitle, trailerUrl }: imageSectionProps) {
  const imagePath =
    singleTitle && (singleTitle.backdrop_path || singleTitle.poster_path)
      ? `https://image.tmdb.org/t/p/original${
          singleTitle.backdrop_path || singleTitle.poster_path
        }`
      : null;

 

  return (
    <div className="w-full h-[400px] relative rounded-2xl shadow-LightBottom overflow-clip group flex items-center justify-center">
      {imagePath ? (
        <Image
          src={imagePath}
          alt={"Movie poster"}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white rounded-2xl shadow-LightBottom">
          <ImageIcon size={80} />
        </div>
      )}

      {trailerUrl && (
      <div className="z-20 relative flex flex-col items-center justify-center">
  <div className="flex items-center justify-center w-[110px] h-[110px] rounded-full bg-[#E8E8E833] border border-[#FFFFFF59] shadow-LightBottom backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-opacity-50">
    <Link
      href={trailerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full h-full"
    >
      <PlayIcon
        size={54}
        weight="fill"
        className="text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] transition-transform duration-300"
      />
    </Link>
  </div>
  <h3 className="mt-3 text-xl font-medium text-[#E8E8E8] text-center">
    Watch Trailer
  </h3>
</div>
      )}
    </div>
  );
}
