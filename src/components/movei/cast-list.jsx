const CastList = ({ movie }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {movie && movie.cast.length > 0 ? (
        <>
          <h3 className="text-2xl font-semibold text-gray-800">Cast</h3>
          <ul className="mt-4 space-y-3">
            {movie.cast.map((actor, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex justify-center items-center">
                  <span className="text-lg font-semibold text-gray-700">
                    {actor[0]}
                  </span>
                </div>
                <span className="text-gray-800">{actor}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      )}
    </div>
  );
};

export default CastList;
