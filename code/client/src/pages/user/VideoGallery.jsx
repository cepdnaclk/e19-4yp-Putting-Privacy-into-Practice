import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function VideoGallery({ principle }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <LoadingSpinner />;
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
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <p className="text-center text-gray-500">No videos available</p>
        )}
      </div>
    </>
  );
}
