import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./components/Products";

const App = () => {
  return (
    <>
      <div className="bg-black w-full h-7 flex justify-around items-center ">
        <p className="text-pink-800 text-sm inter font-light">
          Lorem ipsum dolor
        </p>
        <p className="text-pink-800 text-sm inter font-light">
          Lorem ipsum dolor
        </p>
        <p className="text-pink-800 text-sm inter font-light">
          Lorem ipsum dolor
        </p>
      </div>
      <Header />
      <hr className="w-full text-gray-300" />
      <div className="w-full flex flex-col justify-center items-center gap-5 mx-auto h-[40vh] py-10">
        <h1 className="montserrat uppercase text-6xl">Discover our products</h1>
        <p className="line-clamp-2 md:w-1/2 tracking-wider text-center">
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
          scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
          dolor.
        </p>
      </div>
      <hr className="w-full text-center text-gray-300" />
      <Products />
      <hr className="w-full text-center text-gray-300" />
      <Footer />
    </>
  );
};
export default App;
