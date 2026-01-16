import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProducts } from "../features/products/productsSlice";
import {
  Search,
  StarHalf,
  Star,
  Heart,
  SearchX,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

// Header Component
export const Header = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  sort,
  setSort,
}) => {
  return (
    <div className="bg-indigo-600 px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
      {/* Left: Title */}
      <h1 className="flex items-center font-medium bg-white text-indigo-800 rounded-md gap-2 p-3 text-xl sm:text-2xl font-bold tracking-wide">
        <ShoppingBag className="w-6 h-6" />
        Shop Now
      </h1>

      {/* Middle: Search + Filters */}
      <div className="flex flex-1 sm:flex-none items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 text-sm pl-10 pr-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-700 placeholder-gray-700"
          />
        </div>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-700"
        >
          <option value="" className="text-gray-700">
            All
          </option>
          <option value="electronics" className="text-gray-700">
            Electronics
          </option>
          <option value="jewelery" className="text-gray-700">
            Jewelery
          </option>
          <option value="men's clothing" className="text-gray-700">
            Men Clothing
          </option>
          <option value="women's clothing" className="text-gray-700">
            Women Clothing
          </option>
        </select>

        {/* Sort Filter */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-sm px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-700"
        >
          <option value="" className="text-gray-700">
            Default
          </option>
          <option value="asc" className="text-gray-700">
            Price: Low to High
          </option>
          <option value="desc" className="text-gray-700">
            Price: High to Low
          </option>
        </select>
      </div>

      {/* Right: Favorites */}
      <Link
        to="/favorites"
        className="bg-white hover:bg-white p-2 rounded-lg transition-all"
      >
        <Heart className="w-5 h-5 text-red-600" />
      </Link>
    </div>
  );
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      category
        ? product.category.toLowerCase() === category.toLowerCase()
        : true
    )
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-32 gap-3">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <span className="text-sm text-gray-500 font-medium">Loading…</span>
      </div>
    );
  if (error)
    return <p className="text-center mt-20 text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white min-h-screen">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-20">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
              <SearchX className="w-10 h-10 text-indigo-500" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              We couldn’t find any matching products.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="relative bg-white border border-gray-200 rounded-lg
                     transition-all duration-200 hover:shadow-lg hover:border-gray-300
                     flex flex-col items-center text-center"
            >
              {/* CATEGORY BADGE */}
              <span className="absolute top-3 right-3 bg-white border border-indigo-600 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
                {product.category}
              </span>

              {/* IMAGE */}
              <div className="w-full h-52 bg-indigo-50 border-b border-gray-200 rounded-t-md flex items-center justify-center pt-6 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-200 hover:scale-105"
                />
              </div>

              {/* TITLE & PRICE */}
              <div className="flex flex-col gap-1 w-full p-4 bg-gray-50">
                <h3 className="font-medium text-indigo-700 leading-snug">
                  {product.title.length > 35
                    ? product.title.substring(0, 35) + "..."
                    : product.title}
                </h3>

                <p className="text-lg font-semibold text-gray-800 tracking-wide">
                  ${product.price}
                </p>

                {/* RATINGS */}
                <div className="flex items-center justify-center gap-1 mt-1">
                  {Array.from({ length: Math.floor(product.rating.rate) }).map(
                    (_, index) => (
                      <Star
                        key={index}
                        className="text-yellow-400 w-4 h-4 fill-orange-400"
                      />
                    )
                  )}
                  {product.rating.rate % 1 !== 0 && (
                    <StarHalf className="text-yellow-400 w-4 h-4 fill-orange-400" />
                  )}
                  <span className="ml-1 text-gray-500 text-xs">
                    ({product.rating.count})
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
