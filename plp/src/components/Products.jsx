import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { GoChevronDown } from "react-icons/go";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Products = () => {
  const filterOptions = [
    "RECOMMENDED",
    "NEWEST FIRST",
    "POPULAR",
    "PRICE : HIGH TO LOW",
    "PRICE : LOW TO HIGH",
  ];

  const additionalFilters = {
    Segment: ["Casual", "Formal", "Sports"],
    RawMaterials: ["Cotton", "Polyester", "Wool"],
    SuitableFor: ["Summer", "Winter", "All Seasons"],
    Pattern: ["Solid", "Striped", "Checked"],
    Occasion: ["Party", "Office", "Wedding", "Casual"],
    Work: ["Embroidered", "Printed", "Woven"],
    Fabrics: ["Denim", "Silk", "Linen", "Rayon"],
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("RECOMMENDED");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [customizable, setCustomizable] = useState(false);
  const [selectedIdealFor, setSelectedIdealFor] = useState([]);
  const [selectedAdvancedFilters, setSelectedAdvancedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({
    "Ideal For": true,
    ...Object.keys(additionalFilters).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {}),
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const sortProducts = (products, filter) => {
    switch (filter) {
      case "PRICE : HIGH TO LOW":
        return [...products].sort((a, b) => b.price - a.price);
      case "PRICE : LOW TO HIGH":
        return [...products].sort((a, b) => a.price - b.price);
      case "POPULAR":
        return [...products].sort((a, b) => b.rating?.rate - a.rating?.rate);
      default:
        return products;
    }
  };

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleIdealForChange = (value) => {
    setSelectedIdealFor((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleAdvancedFilterChange = (filter, option) => {
    setSelectedAdvancedFilters((prev) => {
      const updated = { ...prev };
      if (!updated[filter]) updated[filter] = [];
      if (updated[filter].includes(option)) {
        updated[filter] = updated[filter].filter((o) => o !== option);
        if (updated[filter].length === 0) delete updated[filter];
      } else {
        updated[filter].push(option);
      }
      return updated;
    });
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const applyAdvancedFilters = (products) => {
    if (Object.keys(selectedAdvancedFilters).length === 0) return products;
    return products.filter((product) =>
      Object.entries(selectedAdvancedFilters).every(([key, values]) =>
        values.some((v) =>
          product.title.toLowerCase().includes(v.toLowerCase())
        )
      )
    );
  };

  const applyIdealForFilter = (products) => {
    if (selectedIdealFor.length === 0) return products;
    return products.filter((product) =>
      selectedIdealFor.includes(product.category)
    );
  };

  const filteredProducts = sortProducts(
    customizable
      ? applyAdvancedFilters(applyIdealForFilter(products))
      : applyAdvancedFilters(products),
    selectedFilter
  );
  return (
    <div>
      <div className="flex w-full justify-around md:justify-between p-7 items-center">
        <div className=" items-center gap-7 md:flex hidden">
          <p className="font-bold text-md uppercase">
            {" "}
            {filteredProducts.length} ITEMS
          </p>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="text-gray-500 underline text-md flex items-center gap-4 cursor-pointer"
          >
            <span className="md:block hidden">
              {showFilter ? <FaChevronLeft /> : <FaChevronRight />}
            </span>
            {showFilter ? "HIDE FILTER" : "SHOW FILTER"}
          </button>
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="font-bold text-md flex items-center gap-4 cursor-pointer md:hidden"
        >
          FILTER
        </button>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="font-bold text-md uppercase flex items-center gap-3 cursor-pointer relative"
        >
          {selectedFilter}{" "}
          <span>
            <FaChevronDown />
          </span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedFilter(option);
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  selectedFilter === option
                    ? "font-bold text-black"
                    : "text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <hr className="w-full text-center text-gray-300" />
      <div className="flex flex-col lg:flex-row min-h-screen">
        {showFilter && (
          <div className="w-full md:w-72 bg-white p-4 overflow-auto shadow-lg z-20 gap-3">
            <div className="mb-4">
              <input
                type="checkbox"
                id="customizable"
                className="mr-2"
                checked={customizable}
                onChange={() => setCustomizable(!customizable)}
              />
              <label htmlFor="customizable" className="font-semibold">
                CUSTOMIZABLE
              </label>
            </div>

            <div className="mb-4 border-y border-gray-400 py-2">
              <div className="flex flex-col gap-3 ">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("Ideal For")}
                >
                  <span className="font-semibold">IDEAL FOR</span>
                  <GoChevronDown
                    className={`transition-transform duration-200 ${
                      openSections["Ideal For"] ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <p>All</p>
              </div>

              {openSections["Ideal For"] && (
                <div className="mt-2">
                  <p
                    className="text-sm text-blue-500 cursor-pointer"
                    onClick={() => setSelectedIdealFor([])}
                  >
                    Unselect all
                  </p>
                  <div className="mt-2 space-y-2">
                    {[
                      "men's clothing",
                      "women's clothing",
                      "jewelery",
                      "electronics",
                    ].map((option) => (
                      <div className="flex items-center" key={option}>
                        <input
                          type="checkbox"
                          id={option}
                          className="mr-2"
                          checked={selectedIdealFor.includes(option)}
                          onChange={() => handleIdealForChange(option)}
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {Object.entries(additionalFilters).map(([key, options]) => (
              <div key={key} className="mb-4 border-b border-gray-400 py-3">
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection(key)}
                  >
                    <span className="font-semibold">{key}</span>
                    <GoChevronDown
                      className={`transition-transform duration-200 ${
                        openSections[key] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <p>All</p>
                </div>
                {openSections[key] && (
                  <div className="mt-2 space-y-2">
                    {options.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={
                            selectedAdvancedFilters[key]?.includes(option) ||
                            false
                          }
                          onChange={() =>
                            handleAdvancedFilterChange(key, option)
                          }
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div
          className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 ${
            showFilter ? "lg:grid-cols-3" : "lg:grid-cols-4"
          } gap-6 p-4 flex-1`}
        >
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm relative hover:shadow-md transition w-full p-4 flex flex-col justify-between border-gray-200 border"
              >
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute bottom-3 right-3 text-xl"
                >
                  {likedItems.includes(product.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-4"
                />

                <div className="font-semibold text-gray-800 line-clamp-2">
                  {product.title}
                </div>
                <div className="mt-2 text-lg font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Products;
