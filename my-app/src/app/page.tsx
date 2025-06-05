import MainContainer from "./components/mainContainer";
import HomePageList from "./components/homePage/homePageList";

export default async function Home() {

  //console.log(movies);

  return <MainContainer>
    <HomePageList/>
  </MainContainer>;
}
