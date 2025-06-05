import { movie } from "@/app/utils/types";

type aboutMovieProps = {
  singleTitle: movie;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cast: any[];
  director: string | null;
  writers: string[];
};

const AboutMovieSection: React.FC<aboutMovieProps> = ({
  singleTitle,
  director,
  writers,
  cast,
}) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-wrap gap-4 flex-row justify-between items-center">
        <h3 className="text-[#E8E8E8] text-2xl font-semibold">
          {singleTitle?.original_title || singleTitle?.name || "title"}{" "}
          {singleTitle?.release_date
            ? `- ${singleTitle.release_date.slice(0, 4)}`
            : ""}
        </h3>
        <div>
          {singleTitle?.genres && singleTitle.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {singleTitle.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-transparent  border-[#E8E8E8CC] border-1 text-[#E8E8E8CC] rounded-full text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-[#E8E8E8] font-normal text-xl">
        {singleTitle?.overview ? (
          <p>{singleTitle?.overview}</p>
        ) : (
          <p>No short description available.</p>
        )}
      </div>

      <div className=" flex flex-col gap-4">
        <div className="bg-[#E8E8E840] w-full h-[1px]"></div>
        <p className="flex flex-row gap-2 text-lg font-medium text-[#E8E8E8]">
          Director:
          <span className="text-[#3DD2CC]">
            {director ? director : "No director to show."}
          </span>
        </p>
        <div className="bg-[#E8E8E840] w-full h-[1px]"></div>

        <p className="flex flex-row gap-2 text-lg font-medium text-[#E8E8E8]">
          Writers:
          <span className="text-[#3DD2CC]">
            {writers.length > 0 ? writers.join(", ") : "No writers to show."}
          </span>
        </p>
        <div className="bg-[#E8E8E840] w-full h-[1px]"></div>

        <p className="flex flex-row gap-2 text-lg font-medium text-[#E8E8E8]">
          Stars:
          <span className="text-[#3DD2CC]">
            {cast.length > 0
              ? cast
                  .slice(0, 3)
                  .map((actor) => actor.name)
                  .join(", ")
              : "No actors to show."}
          </span>
        </p>
        <div className="bg-[#E8E8E840] w-full h-[1px]"></div>
      </div>
    </div>
  );
};

export default AboutMovieSection;
