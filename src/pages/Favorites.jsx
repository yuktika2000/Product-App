import { useDispatch, useSelector } from "react-redux";
import { StarHalf, Star, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../features/favorites/favoritesSlice";

/* ================= HEADER ================= */
export const Header = () => {
  return (
    <div className="bg-indigo-600 px-5 sm:px-20 py-5 shadow-md">
      <h1 className="inline-flex items-center bg-white text-indigo-800 rounded-md gap-2 p-3 text-xl font-semibold">
        <Heart className="w-6 h-6 fill-red-500 text-red-500" />
        Your Favorites
      </h1>
    </div>
  );
};

/* ================= FAVORITES ================= */
export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const handleRemove = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromFavorites(product));
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* BACK BUTTON*/}
      <Link
        to="/"
        className="inline-flex items-center gap-1 ml-2 sm:ml-20 mt-6 
             bg-indigo-50  px-3 py-1.5 rounded-full text-indigo-700 hover:text-indigo-800
             text-sm font-medium hover:bg-indigo-50 border border-indigo-400
             transition">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-20">
        {favorites.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>

            <p className="text-lg font-medium text-gray-700">
              No favorite products yet
            </p>

            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Browse products and tap the heart icon to save your favorites
              here.
            </p>
          </div>
        ) : (
          favorites.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="relative bg-white border border-gray-200 rounded-lg
                         transition-all duration-200 hover:shadow-lg hover:border-gray-300
                         flex flex-col items-center text-center"
            >
              <button
                onClick={(e) => handleRemove(e, product)}
                className="absolute top-3 left-3 z-10 bg-white rounded-full p-2
                           shadow hover:scale-110 transition"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </button>

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
