import { useState } from "react";

export default function AddResourceModal({ onCloseForm, defaultPrinciple }) {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoTitle.trim()) {
      setError("Please enter a video title.");
      return;
    }

    if (!videoFile) {
      setError("Please select a video file to upload.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("title", videoTitle);
    formData.append("principle", defaultPrinciple);

    try {
      const res = await fetch("/api/resources/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Video uploaded successfully!");
        onCloseForm();
      } else {
        const errorData = await res.json();
        console.log("Upload error:", errorData);
        alert("Failed to upload video.");
      }
    } catch (error) {
      console.log("Error uploading video:", error);
      alert("Error uploading video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add Teaching Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Video Title</label>
            <input
              type="text"
              className="border w-full rounded p-2"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {isUploading && <p className="text-blue-600">Please wait...</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-200 px-4 py-2 rounded"
              onClick={onCloseForm}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
