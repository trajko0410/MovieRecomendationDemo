'use client';

import { useState } from "react";
import { movie } from "@/app/utils/types";
import { ImageIcon, PlayIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { XCircle } from "phosphor-react";

type imageSectionProps = {
  singleTitle: movie | null;
  trailerUrl: string | null;
};

// Helper function to convert YouTube URL to embed format
function convertToEmbedUrl(url: string) {
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const match = url.match(youtubeRegex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function ImageSection({ singleTitle, trailerUrl }: imageSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imagePath =
    singleTitle && (singleTitle.backdrop_path || singleTitle.poster_path)
      ? `https://image.tmdb.org/t/p/original${
          singleTitle.backdrop_path || singleTitle.poster_path
        }`
      : null;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const embedUrl = trailerUrl ? convertToEmbedUrl(trailerUrl) : null;

  return (
    <>
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

        {embedUrl && (
          <div className="z-20 relative flex flex-col items-center justify-center">
            <button
              onClick={openModal}
              className="flex items-center justify-center w-[110px] h-[110px] rounded-full bg-[#E8E8E833] border border-[#FFFFFF59] shadow-LightBottom backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-opacity-50"
            >
              <PlayIcon
                size={54}
                weight="fill"
                className="text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] transition-transform duration-300"
              />
            </button>
            <h3 className="mt-3 text-xl font-medium text-[#E8E8E8] text-center">
              Watch Trailer
            </h3>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && embedUrl && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl bg-black rounded-xl shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-[-42px] right-[-42px] text-white z-100 cursor-pointer"
            >
              <XCircle size={42}              className={`cursor-pointer transition-colors 
                  ? "text-white opacity-30  cursor-not-allowed"
                  hover:text-back duration-300"
              }`}/>
            </button>
            <div className="relative w-full pt-[56.25%]"> 
              <iframe
                src={embedUrl}
                title="Trailer"
                className="absolute top-0 left-0 w-full h-full rounded-b-xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
