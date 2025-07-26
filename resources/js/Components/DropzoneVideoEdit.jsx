import React, { useEffect, useRef, useState } from "react";

export default function DropzoneVideoEdit({
  data,
  setData,
  error,
  existingVideo,
  baseUrl,
}) {
  const fileInputRef = useRef();
  const [videoPreview, setVideoPreview] = useState(null);
  const [filename, setFilename] = useState("");

  useEffect(() => {
    if (existingVideo && !data.video && !data.delete_video) {
      const videoPath = existingVideo.video_path.startsWith("/storage")
        ? `${baseUrl}${existingVideo.video_path}`
        : `${baseUrl}/storage/${existingVideo.video_path}`;
      setVideoPreview(videoPath);
      setFilename(existingVideo.video_path.split("/").pop());
    }
  }, [existingVideo, baseUrl]);

  const handleFile = (file) => {
    if (!file) return;
    setData("delete_video", false);
    setData("video", file);
    setVideoPreview(URL.createObjectURL(file));
    setFilename(file.name);
  };

  const handleBrowse = (e) => {
    if (e.target.files.length) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeVideo = () => {
    setData("video", null);
    setVideoPreview(null);
    setFilename("");
    setData("delete_video", true); // mark for deletion
  };

  return (
    <div className="mt-6">
      <label className="label">Upload Video (optional, max. 1)</label>
      <div
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
        }}
        className="cursor-pointer border-2 border-dashed border-gray-400 rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <p className="text-sm text-gray-500 dark:text-gray-200">
          Drag & drop or click to upload
        </p>
        <input
          type="file"
          ref={fileInputRef}
          accept="video/*"
          onChange={handleBrowse}
          className="hidden"
        />
      </div>

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

      {videoPreview && (
        <div className="mt-4 relative">
          <video src={videoPreview} controls className="w-full rounded mb-2" />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
            title="Remove"
          >
            ✕
          </button>
          <p className="text-sm text-center break-all dark:text-gray-300">
            {filename}
          </p>
        </div>
      )}
    </div>
  );
}
