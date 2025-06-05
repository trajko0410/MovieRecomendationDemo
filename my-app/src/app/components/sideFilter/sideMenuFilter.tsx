"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

import {
  ratings,
  decades,
  languages,
  getCombinedDateRange,
} from "../../utils/filterValuesAndFunctions";
import ResetPathnameButton from "./resetPathnameButton";
import GenereFilter from "./genreFilter";
import FilterGeneralComponent from "./FilterGeneralComponent";

export default function SideMenuFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSingleTitlePage = pathname.startsWith("/singleTitle/");

  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [showMoreGenres, setShowMoreGenres] = useState(false);

  const genresParam = searchParams.get("with_genres");
  const selectedGenres = genresParam ? genresParam.split(",") : [];

  const ratingParam = searchParams.get("vote_average.gte");

  const decadesParam = searchParams.get("decade");
  const selectedDecades = useMemo(
    () => (decadesParam ? decadesParam.split(",") : []),
    [decadesParam]
  );

  const languageParam = searchParams.get("with_original_language");

  //na promenu buttona stavlja odgovarajuce decenije
  useEffect(() => {
    const dateRange = getCombinedDateRange(selectedDecades);
    const params = new URLSearchParams(searchParams.toString());

    if (dateRange) {
      params.set("primary_release_date.gte", dateRange.gte);
      params.set("primary_release_date.lte", dateRange.lte);
    } else {
      params.delete("primary_release_date.gte");
      params.delete("primary_release_date.lte");
    }

    // router.replace da ne pravi novu istoriju na svaki update
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams, selectedDecades]);

  if (isSingleTitlePage) return null;

  const toggleFilter = (name: string) => {
    setOpenFilter((prev) => (prev === name ? null : name));
  };

  // Funkcija za update query parametara
  const updateQuery = (key: string, value: string, multi = false) => {
    const params = new URLSearchParams(searchParams.toString());

    if (multi) {
      const current = params.get(key)?.split(",") || [];
      const exists = current.includes(value);
      const updated = exists
        ? current.filter((v) => v !== value)
        : [...current, value];

      if (updated.length > 0) {
        params.set(key, updated.join(","));
      } else {
        params.delete(key);
      }
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const isGenreActive = (id: number) => selectedGenres.includes(id.toString());

  const isOpen = (name: string) => openFilter === name;

  return (
 <aside className="fixed pt-34 pb-8 right-0 z-40 h-screen w-[20%] flex flex-col items-start px-8  gap-4 text-white rounded-tl-[45px] rounded-bl-[45px] overflow-y-auto scrollbar-hide">

      <div className="flex flex-row justify-between w-full items-center ">
        <h3 className="text-xl font-medium text-[#E8E8E8] ">Filters</h3>
        <ResetPathnameButton buttonText={"Reset All Filters"} />
      </div>

      <GenereFilter
        showMoreGenres={showMoreGenres}
        isGenreActive={isGenreActive}
        updateQuery={updateQuery}
        setShowMoreGenres={setShowMoreGenres}
      />

      <FilterGeneralComponent
        title="Rating"
        isOpen={isOpen("rating")}
        onToggle={() => toggleFilter("rating")}
        maxHeight="300px"
        options={ratings.map((r) => {
          const value = r.replace("+", ""); // "8+" → "8"
          return {
            key: value,
            label: r,
            checked: ratingParam === value,
          };
        })}
        onOptionToggle={(value) =>
          updateQuery(
            "vote_average.gte",
            ratingParam === String(value) ? "" : String(value)
          )
        }
      />

      <FilterGeneralComponent
        title="Decade"
        isOpen={isOpen("decade")}
        onToggle={() => toggleFilter("decade")}
        maxHeight="350px"
        options={decades.map((d) => ({
          key: d,
          label: `${d}-te`,
          checked: selectedDecades.includes(d),
        }))}
        onOptionToggle={(d) => updateQuery("decade", d.toString(), true)}
      />

      <FilterGeneralComponent
        title="Language"
        maxHeight="400px"
        isOpen={isOpen("language")}
        onToggle={() => toggleFilter("language")}
        options={languages.map((l) => ({
          key: l.code,
          label: l.name,
          checked: languageParam === l.code,
        }))}
        onOptionToggle={(code) =>
          updateQuery(
            "with_original_language",
            languageParam === code ? "" : String(code)
          )
        }
      />
    </aside>
  );
}
