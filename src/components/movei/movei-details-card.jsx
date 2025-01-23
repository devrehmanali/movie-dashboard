import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const MovieDetailsCard = ({ movie }) => {
  const genreData = {
    labels: movie?.genre || [], 
    datasets: [
      {
        label: "Genre Distribution",
        data: new Array(movie?.genre?.length || 0).fill(1),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const genreOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Genre Distribution",
      },
    },
    aspectRatio: 1,
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {movie ? (
        <>
          <h2 className="text-3xl font-semibold text-gray-800">{movie.title}</h2>
          <p className="mt-2 text-xl text-gray-600">
            {movie.year} • {movie.genre.join(", ")}
          </p>
          <p className="mt-4 text-gray-700">
            {movie.description || "No description available."}
          </p>

          {/* Pie Chart for Genre Distribution */}
          <div className="mt-6 w-full h-[400px]">
            <Pie data={genreData} options={genreOptions} />
          </div>
        </>
      ) : (
        // Empty state for MovieDetailsCard
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="mt-6 w-full h-[400px] bg-gray-200 rounded" />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsCard;
