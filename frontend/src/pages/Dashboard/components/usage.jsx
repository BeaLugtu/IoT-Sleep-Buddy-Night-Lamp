import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../config/axiosConfig";

const Usage = ({
  archiveData,
  activeButton,
  setActiveButton,
  handleDelete,
  handleRecover,
}) => {
  const [usageData, setUsageData] = useState([]);
  const [archivedData, setArchivedData] = useState([]);  // State for archived activities
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // To store the row to be deleted
  const [showRecoverModal, setShowRecoverModal] = useState(false); // State for recovery modal
  const [selectedRecoverRow, setSelectedRecoverRow] = useState(null); // To store the row to be recovered

  // Fetch usage data (history)
  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          console.error("User ID is not available. Redirecting to login.");
          navigate("/login");
          return;
        }

        const response = await axiosInstance.get(`/api/auth/history/${userId}`);
        const formattedData = response.data.activities.map((activity) => ({
          id: activity.id,
          mode: activity.mode === "manual" ? "Manual" : "Auto",
          lightsOn: activity.light_on_time,
          lightsOff: activity.light_off_time,
          duration: `${activity.duration} hrs`,
          color: activity.color,
        }));
        setUsageData(formattedData);
      } catch (error) {
        console.error("Error fetching usage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageData();
  }, [activeButton]);

  // Fetch archived data
  const fetchArchivedData = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("User ID is not available. Redirecting to login.");
        navigate("/login");
        return;
      }

      const response = await axiosInstance.get(`/api/auth/archived/${userId}`);
      const formattedArchivedData = response.data.archivedActivities.map((activity) => ({
        id: activity.id,
        mode: activity.mode === "manual" ? "Manual" : "Auto",
        lightsOn: activity.light_on_time,
        lightsOff: activity.light_off_time,
        duration: `${activity.duration} hrs`,
        color: activity.color,
      }));
      setArchivedData(formattedArchivedData);
    } catch (error) {
      console.error("Error fetching archived data:", error);
    }
  };

  const handleShowModal = (rowId) => {
    const row = usageData.find((r) => r.id === rowId);
    setSelectedRow(row);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setSelectedRow(null); // Clear selected row
    setShowModal(false); // Hide the modal
  };

  const confirmDelete = async () => {
    if (selectedRow) {
      try {
        // Make API call to archive the activity
        const response = await axiosInstance.put(`/api/auth/archiveActivity/${selectedRow.id}`);
        if (response.data.message === "Activity archived") {
          // Update UI: remove the row from usageData and add it to archivedData
          setUsageData((prev) => prev.filter((row) => row.id !== selectedRow.id));
          setArchivedData((prev) => [
            ...prev,
            {
              id: selectedRow.id,
              mode: selectedRow.mode,
              lightsOn: selectedRow.lightsOn,
              lightsOff: selectedRow.lightsOff,
              duration: selectedRow.duration,
              color: selectedRow.color,
            },
          ]);
          console.log("Activity successfully archived.");
        }
      } catch (error) {
        console.error("Error archiving activity:", error);
      } finally {
        setSelectedRow(null);
        setShowModal(false); // Close modal after deletion
      }
    } else {
      setShowModal(false);
    }
  };

  // Handle activity recovery (unarchive)
  const handleRecoverModal = (rowId) => {
    const row = archivedData.find((r) => r.id === rowId);
    setSelectedRecoverRow(row);
    setShowRecoverModal(true);
  };

  const cancelRecover = () => {
    setSelectedRecoverRow(null); // Clear selected row
    setShowRecoverModal(false); // Hide the modal
  };

  const confirmRecover = async () => {
    if (selectedRecoverRow) {
      try {
        // Make API call to unarchive (recover) the activity
        const response = await axiosInstance.put(`/api/auth/unarchiveActivity/${selectedRecoverRow.id}`);
        if (response.data.message === "Activity restored to history") {
          // Update UI: remove the row from archivedData and add it to usageData
          setArchivedData((prev) => prev.filter((row) => row.id !== selectedRecoverRow.id));
          setUsageData((prev) => [
            ...prev,
            {
              id: selectedRecoverRow.id,
              mode: selectedRecoverRow.mode,
              lightsOn: selectedRecoverRow.lightsOn,
              lightsOff: selectedRecoverRow.lightsOff,
              duration: selectedRecoverRow.duration,
              color: selectedRecoverRow.color,
            },
          ]);
          console.log("Activity successfully recovered.");
        }
      } catch (error) {
        console.error("Error recovering activity:", error);
      } finally {
        setSelectedRecoverRow(null);
        setShowRecoverModal(false); // Close modal after recovery
      }
    } else {
      setShowRecoverModal(false);
    }
  };

  // Fetch archived data when the Archive button is clicked
  useEffect(() => {
    if (activeButton === "Archive") {
      fetchArchivedData();
    }
  }, [activeButton]);

  if (loading) {
    return <p>Loading usage data...</p>;
  }

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
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.mode}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.lightsOn}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.lightsOff}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.duration}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.color}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleShowModal(row.id)}
                    >
                      Archive
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
              {archivedData.map((row) => (
                <tr key={row.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.mode}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.lightsOn}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.lightsOff}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.duration}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.color}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      onClick={() => handleRecoverModal(row.id)}
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

      {/* Modal for Deletion Confirmation */}
      {showModal && (
        <div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={(e) =>
            e.target.className.includes("modal-overlay") && cancelDelete()
          }
        >
          <div className="modal-content bg-white rounded p-6 w-1/3">
            <div className="modal-header flex justify-between items-center">
              <h3 className="text-lg font-bold">Confirm Deletion</h3>
              <button
                className="text-red-500 font-bold"
                onClick={cancelDelete}
              >
                X
              </button>
            </div>
            <div className="modal-body my-4">
              <p>Are you sure you want to delete this activity?</p>
            </div>
            <div className="modal-footer flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Recovery Confirmation */}
      {showRecoverModal && (
        <div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={(e) =>
            e.target.className.includes("modal-overlay") && cancelRecover()
          }
        >
          <div className="modal-content bg-white rounded p-6 w-1/3">
            <div className="modal-header flex justify-between items-center">
              <h3 className="text-lg font-bold">Confirm Recovery</h3>
              <button
                className="text-red-500 font-bold"
                onClick={cancelRecover}
              >
                X
              </button>
            </div>
            <div className="modal-body my-4">
              <p>Are you sure you want to recover this activity?</p>
            </div>
            <div className="modal-footer flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={cancelRecover}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={confirmRecover}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usage;
