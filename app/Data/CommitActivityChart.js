"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CommitActivityChart({ commitsData }) {
  // Prepare data for the chart
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Commits",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  useEffect(() => {
    const dailyCommitsCount = {};

    // Count commits for each day
    commitsData.forEach((event) => {
      if (event.type === "PushEvent") {
        const date = new Date(event.created_at).toISOString().split("T")[0];
        dailyCommitsCount[date] = (dailyCommitsCount[date] || 0) + 1;
      }
    });

    // Prepare labels and data for the chart
    const labels = Object.keys(dailyCommitsCount);
    const data = Object.values(dailyCommitsCount);

    setChartData({
      labels: labels.reverse(),
      datasets: [
        {
          label: "Commits",
          data: data.reverse(),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });
  }, [commitsData]);

  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-lg font-semibold text-center mb-4">
        Your Commit Activity
      </h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Commits",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default CommitActivityChart;
