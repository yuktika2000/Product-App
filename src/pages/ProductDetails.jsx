import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { StarHalf, Star, Heart, ArrowLeft } from "lucide-react";
import {
  addToFavorites,
} from "../features/favorites/favoritesSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const product = items.find((item) => item.id === parseInt(id));
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product?.id);


  useEffect(() => {
    if (!items.length) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-32 gap-3">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <span className="text-sm text-gray-500 font-medium">Loading…</span>
      </div>
    );
  if (error)
    return <p className="text-center mt-24 text-red-500">Error: {error}</p>;
  if (!product)
    return (
      <p className="text-center mt-24 text-gray-500">Product not found.</p>
    );

  return (
    <div className="bg-gray-50 min-h-screen px-24 pb-24 pt-12 px-4 sm:px-6 lg:px-0">
      <Link
        to="/"
        className="inline-flex items-center gap-1 ml-20 mb-4
             bg-indigo-50  px-3 py-1.5 rounded-full text-indigo-700 hover:text-indigo-800
             text-sm font-medium hover:bg-indigo-50 border border-indigo-400
             transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10 md:gap-16 pt-10">
        {/* IMAGE */}
        <div className="flex-1 flex justify-center w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-xs sm:max-w-md md:max-w-lg h-70 sm:h-96 md:h-[480px] object-contain rounded-lg shadow-sm"
          />
        </div>

        {/* DETAILS */}
        <div className="flex-1 flex flex-col justify-start gap-6 w-full bg-white p-10 rounded-lg shadow-sm">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-medium">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex text-yellow-400">
              {Array.from({ length: Math.floor(product.rating.rate) }).map(
                (_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-orange-400" />
                )
              )}
              {product.rating.rate % 1 !== 0 && (
                <StarHalf className="w-4 h-4 fill-orange-400" />
              )}
            </div>
            <span className="text-gray-500 text-sm font-semibold">
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-xl sm:text-2xl md:text-3xl text-indigo-600 font-medium">
            ${product.price}
          </p>

          {/* Category */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {product.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base bg-gray-50 p-4 rounded-md">
            {product.description}
          </p>

          {/* Favorites Button */}
          <button
            onClick={()=> dispatch(addToFavorites(product))}
            className="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full sm:w-max"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {isFavorite ? "Added to Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
