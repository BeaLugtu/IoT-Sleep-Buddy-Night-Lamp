import React from "react";

const Usage = ({
  usageData,
  archiveData,
  activeButton,
  setActiveButton,
  handleDelete,
  handleRecover,
}) => {
  return (
    <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Usage</h2>
      <div className="flex gap-4 justify-center mt-4">
        <button
          className={`py-2 px-4 rounded transition text-white ${
            activeButton === "History"
              ? "bg-[#B04AEE] hover:bg-[#9A3EDB]"
              : "bg-[#888888] hover:bg-[#777777]"
          }`}
          onClick={() => setActiveButton("History")}
        >
          History
        </button>
        <button
          className={`py-2 px-4 rounded transition text-white ${
            activeButton === "Archive"
              ? "bg-[#B04AEE] hover:bg-[#9A3EDB]"
              : "bg-[#888888] hover:bg-[#777777]"
          }`}
          onClick={() => setActiveButton("Archive")}
        >
          Archive
        </button>
      </div>

      {/* Table Section */}
      <div className="mt-6 overflow-x-auto">
        {activeButton === "History" && (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Mode</th>
                <th className="border border-gray-300 px-4 py-2">Lights On</th>
                <th className="border border-gray-300 px-4 py-2">Lights Off</th>
                <th className="border border-gray-300 px-4 py-2">Time Duration</th>
                <th className="border border-gray-300 px-4 py-2">Color</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usageData.map((row) => (
                <tr key={row.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.mode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.lightsOn}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.lightsOff}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.duration}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.color}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeButton === "Archive" && (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Mode</th>
                <th className="border border-gray-300 px-4 py-2">Lights On</th>
                <th className="border border-gray-300 px-4 py-2">Lights Off</th>
                <th className="border border-gray-300 px-4 py-2">Time Duration</th>
                <th className="border border-gray-300 px-4 py-2">Color</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {archiveData.map((row) => (
                <tr key={row.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.mode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.lightsOn}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.lightsOff}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.duration}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.color}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      onClick={() => handleRecover(row.id)}
                    >
                      Recover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Usage;