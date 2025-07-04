import { useState, useEffect } from "react";
import ConfirmModal from "../../../components/ConfirmModal";

export default function VideoGallery({ principle }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchVideos = async () => {
    try {
      let url = "/api/resources";
      if (principle) {
        url += `?principle=${encodeURIComponent(principle)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch videos");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [principle]);

  const confirmDelete = (id) => {
    setDeleteTarget(id);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/resources/${deleteTarget}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Video deleted successfully!");
        fetchVideos();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to delete video.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting video");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (loading)
    return <p className="text-center text-blue-600">Loading videos...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <div className="p-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <video
              controls
              src={video.videoUrl}
              className="w-full aspect-video object-cover rounded-t-xl"
            />
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.principle}</p>
              </div>
              <button
                onClick={() => confirmDelete(video.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <p className="text-center text-gray-500">No videos available</p>
        )}
      </div>

      {deleteTarget && (
        <ConfirmModal
          message={
            isDeleting
              ? "Deleting video, please wait..."
              : "Are you sure you want to delete this video?"
          }
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
