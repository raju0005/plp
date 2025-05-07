import logo from "../assets/icons/logo.svg";

import { RiSearch2Line } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";
import { IoChevronDown, IoClose, IoMenu } from "react-icons/io5";

import { GoHeart } from "react-icons/go";
import { useState } from "react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex flex-col justify-around items-center md:min-h-[25vh] p-5 container mx-auto">
      <div className="flex justify-around gap-3 w-full items-center  ">
        <div className="flex-1 items-center justify-center flex gap-3 ">
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <IoClose className="text-2xl" />
              ) : (
                <IoMenu className="text-2xl" />
              )}
            </button>
          </div>
          <img className="md:h-auto h-6" src={logo} alt="Logo" />
        </div>
        <h1 className="inter font-bold text-2xl md:text-4xl flex-1 text-center">LOGO</h1>
        <div className="flex items-center justify-center gap-6 flex-1">
          <RiSearch2Line className="text-xl text-black cursor-pointer transform hover:scale-105 transition-transform duration-200" />

          <GoHeart className="text-xl text-black cursor-pointer transform hover:scale-105 transition-transform duration-200" />

          <HiOutlineShoppingBag className="text-xl text-black cursor-pointer transform hover:scale-105 transition-transform duration-200" />

          <FaRegUser className="text-xl text-black cursor-pointer transform hover:scale-105 transition-transform duration-200 md:flex hidden" />

          <p className="text-xl inter uppercase font-semibold  items-center md:flex hidden">
            eng{" "}
            <span>
              <IoChevronDown />
            </span>
          </p>
        </div>
      </div>
      {/* Desktop Nav Links */}
      <div className="hidden w-full justify-center items-center gap-2 md:flex">
        {["shop", "skills", "stories", "about", "contact us"].map(
          (item, index) => (
            <h1
              className="uppercase inter font-semibold text-lg mx-4 cursor-pointer hover:underline "
              key={index}
            >
              {item}
            </h1>
          )
        )}
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col items-center w-full mt-4 md:hidden animate-slide-down">
          {["shop", "skills", "stories", "about", "contact us"].map(
            (item, index) => (
              <h1
                className="uppercase inter font-semibold text-sm py-2 cursor-pointer hover:underline"
                key={index}
              >
                {item}
              </h1>
            )
          )}
        </div>
      )}
    </div>
  );
};
export default Header;
