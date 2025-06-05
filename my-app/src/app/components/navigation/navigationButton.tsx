"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HouseIcon,
  FilmReelIcon,
  MonitorPlayIcon,
  HeartStraightIcon,
} from "@phosphor-icons/react";

type NavigationButtonProps = {
  navLink: string;
  title: string;
  icon: string;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({
  navLink,
  title,
  icon,
}) => {
  const pathname = usePathname();
  const isActive = pathname === navLink;
  const iconColor = isActive ? "#3DD2CC" : "#666666";

  const iconMap: Record<string, React.ReactNode> = {
    Home: <HouseIcon size={25} weight="bold" color={iconColor} />,
    Movies: <FilmReelIcon size={25} weight="bold" color={iconColor} />,
    TVSeries: <MonitorPlayIcon size={25} weight="bold" color={iconColor} />,
    Favorites: <HeartStraightIcon size={25} weight="bold" color={iconColor} />,
  };

  return (
    <Link
      href={navLink}
      className={`${
        pathname === navLink
          ? "bg-[#3DD2CC66] border-r-4 border-r-[#3DD2CCBF] shadow-LightBottom"
          : "bg-transparent"
      } flex  gap-5 w-full items-center px-[40px] h-16 transition-all duration-300 ease-in-out `}
    >
      {iconMap[icon] || <HouseIcon size={25} weight="bold" color={iconColor} />}

      <h2
        className={`${
          pathname === navLink ? "text-TextBlue " : "text-TextGrey"
        } text-xl font-semibold mt-0.5 transition-all duration-300 ease-in-out`}
        style={
          pathname === navLink
            ? { textShadow: "var(--shadow-LightBottom)" }
            : {}
        }
      >
        {title}
      </h2>
    </Link>
  );
};

export default NavigationButton;
