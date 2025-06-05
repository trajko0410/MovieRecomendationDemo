import React from "react";
import SingleCard from "./singleCard";
import { movie } from "../utils/types";

type SingleRowCardWrapperProps = {
  sectionTitle: string;
  data: movie[];
  type: string;
};

const SingleRowCardWrapper: React.FC<SingleRowCardWrapperProps> = ({
  sectionTitle,
  data,
  type,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[#E8E8E8] text-2xl font-semibold">{sectionTitle}</h3>

      {data.length !== 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {data.map((movie) => (
            <SingleCard
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              vote_average={movie.vote_average}
              title={movie.title}
              type={type}
            />
          ))}
        </div>
      ) : (
        <div className="h-[310px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-top ">
          <p className="text-sm font-semibold text-[#E8E8E8]">
            No {sectionTitle} with this filter!
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleRowCardWrapper;
