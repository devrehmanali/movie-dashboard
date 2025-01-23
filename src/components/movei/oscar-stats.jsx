import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend
);

const OscarStats = ({ movie }) => {
  const totalNominations = movie?.oscar_nominations || 0;
  const totalWins = movie?.oscar_winning || 0;
  const totalLosses = totalNominations - totalWins;

  const barChartData = {
    labels: ["Nominations", "Wins"],
    datasets: [
      {
        label: "Oscar Stats",
        data: [totalNominations, totalWins],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 159, 64, 0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Oscar Nominations vs Wins",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  };

  const pieChartData = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        data: [totalWins, totalLosses],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 159, 64, 0.5)"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Proportion of Wins vs Losses",
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {movie ? (
        <>
          <h3 className="text-2xl font-semibold text-gray-800">Oscar Statistics</h3>

          {/* Bar Chart: Nominations vs Wins */}
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-800">Oscar Nominations vs Wins</h4>
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Pie Chart: Wins vs Losses */}
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-800">Proportion of Wins vs Losses</h4>
            <div className="mt-6 w-full h-64">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </>
      ) : (
        // Empty state placeholders for both Bar and Pie charts
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-56 bg-gray-200 rounded w-full" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-64 bg-gray-200 rounded w-full" />
        </div>
      )}
    </div>
  );
};

export default OscarStats;
