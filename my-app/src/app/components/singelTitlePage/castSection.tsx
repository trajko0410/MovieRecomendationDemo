import { ImageIcon } from "@phosphor-icons/react";
import Image from "next/image";

type CastSectionProps = {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
};

const CastSection: React.FC<CastSectionProps> = ({ cast }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[#E8E8E8] text-2xl font-semibold">Top Cast</h3>
      <div className="grid grid-cols-2 gap-y-8">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="  text-center flex justify-center items-center flex-col"
          >
            <div className="w-[140px] h-[140px] relative rounded-full overflow-clip shadow-LightBottom flex items-center justify-center">
              {actor.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  alt={actor.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <ImageIcon size={40} className="" />
              )}
            </div>

            <div className="p-2 text-[#E8E8E8]">
              <p className="font-bold">{actor.name}</p>
              <p className="text-sm text-[#AAAAAA]">as {actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;
