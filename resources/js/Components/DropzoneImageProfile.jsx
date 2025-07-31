import React, { useEffect, useRef, useState } from "react";

export default function DropzoneImageProfile({
  data,
  setData,
  errors,
  existingImages = [],
  baseUrl,
}) {
  const fileInputRef = useRef();
  const [existingPreviews, setExistingPreviews] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  // Initialize existing image previews
  useEffect(() => {
    const formatted = existingImages
      .filter((img) => !deletedImageIds.includes(img.id))
      .map((img) => ({
        url: img.image_path.startsWith("/storage")
          ? `${baseUrl}${img.image_path}`
          : `${baseUrl}/storage/${img.image_path}`,
        name: img.image_path.split("/").pop(),
        existing: true,
        id: img.id,
      }));
    setExistingPreviews(formatted);
  }, [existingImages, baseUrl, deletedImageIds]);

  // Update deleted_images in form data
  useEffect(() => {
    setData("deleted_images", deletedImageIds);
  }, [deletedImageIds, setData]);

  const handleFiles = (files) => {
    const fileList = Array.from(files);
    const currentCount = existingPreviews.length + newPreviews.length;
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

    setNewPreviews((prev) => [...prev, ...newFiles]);
    
    // Update the images in form data - ensure it's always an array
    const currentImages = data.images || [];
    setData("images", [...currentImages, ...fileList]);
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

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      // Remove from existing previews
      const updatedExisting = [...existingPreviews];
      const removed = updatedExisting.splice(index, 1)[0];
      setExistingPreviews(updatedExisting);
      setDeletedImageIds((prev) => [...prev, removed.id]);
    } else {
      // Remove from new previews
      const updatedNew = [...newPreviews];
      const removed = updatedNew.splice(index, 1)[0];
      setNewPreviews(updatedNew);
      
      // Remove from form data
      const currentImages = data.images || [];
      const updatedFiles = currentImages.filter((_, i) => i !== index);
      setData("images", updatedFiles);
    }
  };

  const allPreviews = [...existingPreviews, ...newPreviews];

  return (
    <div>
      <label className="label">Profile Images (min. 1, max. 6)</label>
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

      {allPreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {existingPreviews.map((file, index) => (
            <div key={file.id} className="relative">
              <img
                src={file.url}
                alt={`Preview ${index}`}
                className="w-full h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index, true)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
                title="Remove"
              >
                ✕
              </button>
              <p className="text-xs mt-1 text-center break-all dark:text-gray-300">
                {file.name}
              </p>
            </div>
          ))}
          {newPreviews.map((file, index) => (
            <div key={`new-${index}`} className="relative">
              <img
                src={file.url}
                alt={`Preview ${index}`}
                className="w-full h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index, false)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
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
      )}

      {allPreviews.length === 0 && (
        <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
} 