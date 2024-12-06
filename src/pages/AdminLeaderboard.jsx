import React from "react";

export default function AdminLeaderboard() {
  const memoryGameData = [
    { rank: 1, name: "Alice Johnson", score: 98 },
    { rank: 2, name: "Bob Smith", score: 92 },
    { rank: 3, name: "Charlie Brown", score: 88 },
    { rank: 4, name: "Diana Prince", score: 85 },
    { rank: 5, name: "Ethan Hunt", score: 82 },
  ];

  const speedyQuizData = [
    { rank: 1, name: "Alice Johnson", score: 96 },
    { rank: 2, name: "Charlie Brown", score: 89 },
    { rank: 3, name: "Diana Prince", score: 86 },
    { rank: 4, name: "Bob Smith", score: 84 },
    { rank: 5, name: "Ethan Hunt", score: 80 },
  ];

  const handleEdit = (entry) => {
    alert(`Editing score for ${entry.name}`);
    // Add your edit logic here
  };

  const handleDelete = (entry) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${entry.name}'s entry?`);
    if (confirmDelete) {
      alert(`Deleted entry for ${entry.name}`);
      // Add your delete logic here
    }
  };

  const renderTableRows = (data) =>
    data.map((entry, index) => (
      <tr
        key={index}
        className={`${
          index % 2 === 0 ? "bg-orange-100" : "bg-orange-50"
        } dark:bg-gray-600 dark:text-white hover:bg-orange-200 dark:hover:bg-gray-500 transition`}
      >
        <td className="p-4 text-center font-semibold">{entry.rank}</td>
        <td className="p-4 font-medium">{entry.name}</td>
        <td className="p-4 text-center font-semibold">{entry.score}</td>
        <td className="p-4 flex justify-center space-x-4">
          <button
            onClick={() => handleEdit(entry)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(entry)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Admin Leaderboard</h1>

      {/* Math Memory Game Leaderboard */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-4 text-center">Math Memory Game</h2>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="p-4 text-lg font-semibold">Rank</th>
                <th className="p-4 text-lg font-semibold">Name</th>
                <th className="p-4 text-lg font-semibold">Score</th>
                <th className="p-4 text-lg font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(memoryGameData)}</tbody>
          </table>
        </div>
      </div>

      {/* Math Speedy Quiz Leaderboard */}
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-4 text-center">Math Speedy Quiz</h2>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="p-4 text-lg font-semibold">Rank</th>
                <th className="p-4 text-lg font-semibold">Name</th>
                <th className="p-4 text-lg font-semibold">Score</th>
                <th className="p-4 text-lg font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(speedyQuizData)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
