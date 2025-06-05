import { genres } from "@/app/utils/filterValuesAndFunctions";

type genereFilterProp = {
  showMoreGenres: boolean;
  isGenreActive: (id: number) => boolean;
  updateQuery: (key: string, value: string, checked: boolean) => void;
  setShowMoreGenres: React.Dispatch<React.SetStateAction<boolean>>;
};

const GenereFilter: React.FC<genereFilterProp> = ({
  showMoreGenres,
  isGenreActive,
  updateQuery,
  setShowMoreGenres,
}) => {
  return (
    <div className="w-full bg-[#212121] rounded-[30px] pt-6  px-6 pb-4 overflow-clip shadow-LightBottom">
      <div
        className={`transition-all duration-500 overflow-hidden ${
          showMoreGenres ? "max-h-[1000px]" : "max-h-[180px]"
        }`}
      >
        <ul className="text-sm text-[#E8E8E8] flex flex-col gap-2">
          {genres.map((g) => (
            <li
              key={g.id}
              className="flex items-center justify-between py-2 border-b-1 border-[#6666664D] gap-2"
            >
              <label className="cursor-pointer hover:text-white text-sm font-medium">
                {g.name}
              </label>

              <label className="relative cursor-pointer flex items-center">
                <input
                  type="checkbox"
                  checked={isGenreActive(g.id)}
                  onChange={() =>
                    updateQuery("with_genres", g.id.toString(), true)
                  }
                  className="peer appearance-none w-5 h-5 rounded-sm border-1 
                 border-[#4a4a4a] bg-transparent 
                 checked:bg-[#3dd2cd6d] checked:border-[#3dd2cdf0]
                 transition-colors duration-300 flex items-center justify-center"
                />
                <svg
                  className="absolute left-0 w-5 h-5 text-[#212121] pointer-events-none hidden peer-checked:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {genres.length > 5 && (
        <div className="flex items-center justify-center mt-4 ">
          <button
            className="text-[#666666] text-xs hover:text-white transition-color duration-300 cursor-pointer"
            onClick={() => setShowMoreGenres((prev) => !prev)}
          >
            {!showMoreGenres ? "See More" : "See Less"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GenereFilter;
