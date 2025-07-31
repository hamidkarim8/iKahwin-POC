import React, { useEffect, useRef, useState } from "react";

export default function DropzoneImageEdit({
  data,
  setData,
  errors,
  existingImages = [],
  baseUrl,
}) {
  const fileInputRef = useRef();
  const [imagePreviews, setImagePreviews] = useState([]);

  // Keep track of deleted image IDs
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  useEffect(() => {
    const formatted = existingImages.map((img) => ({
      url: img.image_path.startsWith("/storage")
        ? `${baseUrl}${img.image_path}`
        : `${baseUrl}/storage/${img.image_path}`,
      name: img.image_path.split("/").pop(),
      existing: true,
      id: img.id,
    }));
    setImagePreviews(formatted);
  }, [existingImages, baseUrl]);

  useEffect(() => {
    setData("deleted_images", deletedImageIds);
  }, [deletedImageIds]);

  const handleFiles = (files) => {
    const fileList = Array.from(files);
    const currentCount = imagePreviews.length;
    const total = currentCount + fileList.length;

    if (total > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }

    const newFiles = fileList.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file,
      existing: false,
    }));

    setImagePreviews((prev) => [...prev, ...newFiles]);
    setData("images", [...data.images, ...fileList]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = (e) => {
    if (e.target.files.length) handleFiles(e.target.files);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    const removed = updatedPreviews.splice(index, 1)[0];

    if (removed.existing) {
      setDeletedImageIds((prev) => [...prev, removed.id]);
    } else {
      const updatedFiles = [...data.images];
      updatedFiles.splice(index - existingImages.length, 1);
      setData("images", updatedFiles);
    }

    setImagePreviews(updatedPreviews);
  };

  return (
    <div>
      <label className="label">Upload Images (min. 1, max. 6)</label>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer border-2 border-dashed border-gray-400 rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <p className="text-sm text-gray-500 dark:text-gray-200">
          Drag & drop or click to upload
        </p>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleBrowse}
          className="hidden"
        />
      </div>

      {errors.images && (
        <div className="text-red-500 text-sm mt-1">{errors.images}</div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-4">
        {imagePreviews.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={file.url}
              alt={`Preview ${index}`}
              className="w-full h-24 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              title="Remove"
            >
              ✕
            </button>
            <p className="text-xs mt-1 text-center break-all dark:text-gray-300">
              {file.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}