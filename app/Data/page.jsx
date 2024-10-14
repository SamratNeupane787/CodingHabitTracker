"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { GitCommit, Loader2, Zap, Trophy, Calendar } from "lucide-react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CommitActivityChart({ commitsData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Commits",
        data: [],
        backgroundColor: "rgba(34, 197, 94, 0.6)", // Green color to match the theme
      },
    ],
  });

  useEffect(() => {
    const dailyCommitsCount = {};

    commitsData.forEach((event) => {
      if (event.type === "PushEvent") {
        const date = new Date(event.created_at).toISOString().split("T")[0];
        dailyCommitsCount[date] = (dailyCommitsCount[date] || 0) + 1;
      }
    });

    const labels = Object.keys(dailyCommitsCount);
    const data = Object.values(dailyCommitsCount);

    setChartData({
      labels: labels.reverse(),
      datasets: [
        {
          label: "Commits",
          data: data.reverse(),
          backgroundColor: "rgba(34, 197, 94, 0.6)", // Green color to match the theme
        },
      ],
    });
  }, [commitsData]);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <GitCommit className="h-8 w-8 mr-2 text-green-500" />
        <h2 className="text-2xl font-bold text-black">Your Commit Activity</h2>
      </div>
      <div className="w-full h-64 md:h-96">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                  color: "#374151", // Text color matching the theme
                },
                ticks: {
                  color: "#374151", // Text color matching the theme
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Commits",
                  color: "#374151", // Text color matching the theme
                },
                ticks: {
                  color: "#374151", // Text color matching the theme
                },
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "#374151", // Text color matching the theme
                },
              },
              tooltip: {
                backgroundColor: "rgba(34, 197, 94, 0.8)", // Green color to match the theme
                titleColor: "#FFFFFF",
                bodyColor: "#FFFFFF",
                displayColors: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default function Page() {
  const { user } = useUser();
  const username = user?.username;
  const [commitsData, setCommitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyCommits, setDailyCommits] = useState(0);
  const [codeCoins, setCodeCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [treeGrowth, setTreeGrowth] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const getData = async () => {
      if (!username) return;
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/events/public`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        setCommitsData(result);
        setLoading(false);

        const today = new Date().toISOString().split("T")[0];
        const todayCommits = result.filter(
          (event) =>
            event.type === "PushEvent" &&
            new Date(event.created_at).toISOString().split("T")[0] === today
        ).length;

        setDailyCommits(todayCommits);
        const newCodeCoins = todayCommits * 2; // 2 CodeCoins per commit
        setCodeCoins((prevCoins) => prevCoins + newCodeCoins);

        // Calculate streak (simplified version)
        const sortedDates = [
          ...new Set(
            result
              .filter((event) => event.type === "PushEvent")
              .map(
                (event) =>
                  new Date(event.created_at).toISOString().split("T")[0]
              )
          ),
        ].sort((a, b) => new Date(b) - new Date(a));

        let streakCount = 0;
        for (let i = 0; i < sortedDates.length; i++) {
          const date = new Date(sortedDates[i]);
          const prevDate = i > 0 ? new Date(sortedDates[i - 1]) : new Date();
          if ((prevDate.getTime() - date.getTime()) / (1000 * 3600 * 24) <= 1) {
            streakCount++;
          } else {
            break;
          }
        }
        setStreak(streakCount);

        // Update tree growth and level
        setTreeGrowth((prevGrowth) =>
          Math.min(prevGrowth + todayCommits * 5, 100)
        );
        setLevel(Math.floor(codeCoins / 100) + 1);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getData();
  }, [username, codeCoins]);

  const getTreeColor = () => {
    if (treeGrowth >= 80) return "text-green-600";
    if (treeGrowth >= 50) return "text-green-500";
    if (treeGrowth >= 20) return "text-green-400";
    return "text-green-300";
  };

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-[#F7F8FA]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">
              Your Coding Garden
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Grow your skills, nurture your habits, and watch your coding
              garden flourish!
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            <span className="ml-2 text-gray-600">
              Tending to your garden...
            </span>
          </div>
        ) : error ? (
          <div className="mt-12 text-center text-red-600 bg-red-100 p-4 rounded-md">
            <p className="font-semibold">Error: {error}</p>
            <p className="mt-2">
              We couldn't water your garden. Please try again later.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GitCommit className="h-8 w-8 mr-2 text-green-500" />
                  <h2 className="text-xl font-bold text-black">
                    Today's Growth
                  </h2>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {dailyCommits}
                </span>
              </div>
              <p className="text-gray-600">
                You've made {dailyCommits} commit{dailyCommits !== 1 ? "s" : ""}{" "}
                today. Keep coding to see your garden grow!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 mr-2 text-blue-500" />
                  <h2 className="text-xl font-bold text-black">
                    Coding Streak
                  </h2>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {streak} days
                </span>
              </div>
              <p className="text-gray-600">
                You're on a {streak}-day coding streak! Don't break the chain.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Zap className="h-8 w-8 mr-2 text-yellow-500" />
                  <h2 className="text-xl font-bold text-black">CodeCoins</h2>
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {codeCoins}
                </span>
              </div>
              <p className="text-gray-600">
                You've earned {codeCoins} CodeCoins. Use them to unlock new
                features!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Trophy className="h-8 w-8 mr-2 text-purple-500" />
                  <h2 className="text-xl font-bold text-black">Coder Level</h2>
                </div>
                <span className="text-2xl font-bold text-purple-600">
                  {level}
                </span>
              </div>
              <p className="text-gray-600">
                You're a level {level} coder. Keep growing to reach new heights!
              </p>
            </div>

            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4"></div>
              <h2 className="text-xl font-bold text-black text-center mb-2">
                Your Coding Tree
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${treeGrowth}%` }}
                ></div>
              </div>
              <p className="text-center text-gray-600">
                Your coding tree is {treeGrowth}% grown. Keep committing to help
                it flourish!
              </p>
            </div>

            <div className="md:col-span-2">
              <CommitActivityChart commitsData={commitsData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
