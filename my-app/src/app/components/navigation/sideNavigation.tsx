import Image from "next/image";
import LogoImage from "../../../../public/Vector.png";
import NavigationButton from "./navigationButton";

export default function SideNavigation() {
  return (
    <aside className="flex fixed top-0  rounded-tr-[45px] rounded-br-[45px] left-0 z-40  h-screen w-[15%] flex-col items-center gap-2 bg-[#212121]   shadow-[0_0_8px_rgba(0,0,0,0.25)]">
      <Image
        className="pt-[40px] pb-[40px]"
        src={LogoImage}
        alt="logo"
        width={118}
        height={42}
      ></Image>
      <NavigationButton icon="Home" title="Home" navLink="/" />

      <NavigationButton icon="Movies" title="Movies" navLink="/movies" />
      <NavigationButton icon="TVSeries" title="TV Series" navLink="/tv" />

      <NavigationButton
        icon="Favorites"
        title="Favorites"
        navLink="/favorites"
      />
    </aside>
  );
}
