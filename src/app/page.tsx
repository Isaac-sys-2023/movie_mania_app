import Banner from "@/components/BannerSection/Banner/Banner";
import CardContainer from "@/components/CardGroup/CardContainer/CardContainer";
import SliderContainer from "@/components/Slider/SliderContainer/SliderContainer";
import MainContext from "@/context/MasterContext";

export default function Home() {
  return (
    <MainContext>
      <Banner/>
      <SliderContainer/>
      <h2 className="text-2xl text-yellow-500 font-bold ml-16 mb-8">
        Top Rated Movies
      </h2>
      <CardContainer streamingType={"movie"} activeTab={"top_rated"} />
      {/* <main className="p-10">
        <h1 className="text-4xl font-bold text-primary">Hola Tailwind!</h1>
        <button className="btn btn-secondary mt-4">DaisyUI botón</button>
      </main> */}
    </MainContext>
  );
}
