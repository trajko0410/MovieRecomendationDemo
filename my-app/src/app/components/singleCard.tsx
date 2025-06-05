"use client";

import { ImageIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

type SingleCardProps = {
  id: number;
  poster: string | null;
  vote_average: number;
  title: string;
  type: string
};

const SingleCard: React.FC<SingleCardProps> = ({
  id,
  poster,
  title,
  vote_average,
  type
}) => {
  const posterd = `https://image.tmdb.org/t/p/w500/${poster}`;

  //console.log(posterd);
  return (
    <Link
      href={`/singleTitle/${type}/${id}`}
      className=" relative flex h-[310px] w-[200px] items-center justify-center shadow-LightBottom rounded-[20px] overflow-hidden  transition-transform duration-300 ease-in-out hover:scale-105"
    >
      {poster ? (
        <Image
          src={posterd}
          alt={title ?? "poster"}
          fill
          className="object-cover overflow-clip"
        ></Image>
      ) : (
        <ImageIcon size={65} />
      )}
    {vote_average > 0 && (
    <div className="absolute z-10 top-0 right-0 rounded-bl-full rounded-tr-[20px] overflow-hidden w-fit h-fit">
  <div className="flex justify-center items-center bg-[#2b2b2b6d] py-1 px-5 text-base text-white font-medium">
    ⭐ {vote_average.toFixed(1)}
  </div>
</div>
)}
    </Link>
  );
};

export default SingleCard;
