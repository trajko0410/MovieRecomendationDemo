"use client";

import { useEffect, useState } from "react";
import {  HeartStraightIcon,  ShareNetworkIcon } from "@phosphor-icons/react";
import { movie } from "@/app/utils/types";
import { useParams } from "next/navigation";


type MetaSectionProps = {
  singleTitle: movie
};

export default function MetaSection({ singleTitle }: MetaSectionProps) {
    const [isLiked, setIsLiked] = useState(false);
     const params = useParams();
  const type = typeof params?.type === "string" ? params.type : "";

   useEffect(() => {
  if (!singleTitle?.id) return; 

  try {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]");
    const isAlreadyLiked = likedMovies.some((m: movie) => m.id === singleTitle.id);
    setIsLiked(isAlreadyLiked);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
}, [singleTitle]);

    const toggleLike = () => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]");

    if (isLiked) {
      // Remove from liked movies
      const updatedLikes = likedMovies.filter((m: movie) => m.id !== singleTitle.id);
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikes));
      setIsLiked(false);
    } else {
      // Add to liked movies
      const movieWithType = {
        ...singleTitle,
        type: type || "movie", 
      };
      localStorage.setItem("likedMovies", JSON.stringify([...likedMovies, movieWithType]));
      setIsLiked(true);
    
    }
  };



  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-end gap-4  text-[#E8E8E8]">
        <button
        onClick={toggleLike}
        className="flex items-center gap-2 text-sm hover:scale-105 transition-transform"
      >
        <HeartStraightIcon size={35} color={isLiked ? "red" : "#E8E8E8CC"} />
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 text-sm hover:scale-105 transition-transform"
      >
        <ShareNetworkIcon size={35} color="#E8E8E8CC"  />
      </button>

      <div className="text-3xl">  ⭐ {singleTitle?.vote_average ? singleTitle.vote_average.toFixed(1) : 0}</div>
    </div>
  );
}
