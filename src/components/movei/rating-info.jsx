const RatingAndInfo = ({ movie }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {movie ? (
        <>
          <h3 className="text-2xl font-semibold text-gray-800">Rating and Info</h3>
          <div className="mt-4">
            <span className="text-lg font-medium text-gray-800">IMDb Rating:</span>
            <span className="ml-2 text-lg text-yellow-500">{movie.imdb_rating}</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <div className="ml-4 w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: `${(movie.imdb_rating / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4 text-gray-700">
              <p><strong>Country:</strong> {movie.country.join(", ")}</p>
              <p><strong>Language:</strong> {movie.language.join(", ")}</p>
            </div>
          </div>
        </>
      ) : (
        // Empty state placeholders
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      )}
    </div>
  );
};

export default RatingAndInfo;
