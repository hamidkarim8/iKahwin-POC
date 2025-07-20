import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Create({ onClose }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    description: "",
    address_line: "",
    city: "",
    state: "",
    postcode: "",
    price: "",
    max_participants: "",
    images: [],
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("course.store"), {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh] dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Create New Course
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                className="input"
              />
              {errors.title && (
                <div className="text-red-500 text-sm">{errors.title}</div>
              )}
            </div>

            <div>
              <label className="label">Price (RM)</label>
              <input
                type="number"
                min="0"
                value={data.price}
                onChange={(e) => setData("price", e.target.value)}
                className="input"
              />
              {errors.price && (
                <div className="text-red-500 text-sm">{errors.price}</div>
              )}
            </div>

            <div>
              <label className="label">Start Date</label>
              <input
                type="date"
                min={today}
                value={data.start_date}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  // Set the start date first
                  setData((prevData) => ({
                    ...prevData,
                    start_date: selectedDate,
                    // Auto-fill end_date only if it's empty or earlier than the new start date + 1
                    end_date:
                      !prevData.end_date ||
                      new Date(prevData.end_date) < new Date(selectedDate)
                        ? (() => {
                            const nextDay = new Date(selectedDate);
                            nextDay.setDate(nextDay.getDate() + 1);
                            return nextDay.toISOString().split("T")[0];
                          })()
                        : prevData.end_date,
                  }));
                }}
                className="input"
              />
              {errors.start_date && (
                <div className="text-red-500 text-sm">{errors.start_date}</div>
              )}
            </div>

            <div>
              <label className="label">End Date</label>
              <input
                type="date"
                min={data.start_date || today}
                value={data.end_date}
                onChange={(e) => setData("end_date", e.target.value)}
                className="input"
              />
              {errors.end_date && (
                <div className="text-red-500 text-sm">{errors.end_date}</div>
              )}
            </div>

            <div>
              <label className="label">Start Time</label>
              <input
                type="time"
                value={data.start_time}
                onChange={(e) => setData("start_time", e.target.value)}
                className="input"
              />
              {errors.start_time && (
                <div className="text-red-500 text-sm">{errors.start_time}</div>
              )}
            </div>

            <div>
              <label className="label">End Time</label>
              <input
                type="time"
                value={data.end_time}
                onChange={(e) => setData("end_time", e.target.value)}
                className="input"
              />
              {errors.end_time && (
                <div className="text-red-500 text-sm">{errors.end_time}</div>
              )}
            </div>

            <div>
              <label className="label">City</label>
              <input
                type="text"
                value={data.city}
                onChange={(e) => setData("city", e.target.value)}
                className="input"
              />
              {errors.city && (
                <div className="text-red-500 text-sm">{errors.city}</div>
              )}
            </div>

            <div>
              <label className="label">State</label>
              <input
                type="text"
                value={data.state}
                onChange={(e) => setData("state", e.target.value)}
                className="input"
              />
              {errors.state && (
                <div className="text-red-500 text-sm">{errors.state}</div>
              )}
            </div>

            <div>
              <label className="label">Postcode</label>
              <input
                type="text"
                value={data.postcode}
                onChange={(e) => setData("postcode", e.target.value)}
                className="input"
              />
              {errors.postcode && (
                <div className="text-red-500 text-sm">{errors.postcode}</div>
              )}
            </div>

            <div>
              <label className="label">Max Participants</label>
              <input
                type="number"
                min="0"
                value={data.max_participants}
                onChange={(e) => setData("max_participants", e.target.value)}
                className="input"
              />
              {errors.max_participants && (
                <div className="text-red-500 text-sm">
                  {errors.max_participants}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="label">Address Line</label>
            <input
              type="text"
              value={data.address_line}
              onChange={(e) => setData("address_line", e.target.value)}
              className="input"
            />
            {errors.address_line && (
              <div className="text-red-500 text-sm">{errors.address_line}</div>
            )}
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="input"
            />
            {errors.description && (
              <div className="text-red-500 text-sm">{errors.description}</div>
            )}
          </div>

          <div>
            <label className="label">Upload Images (min. 1)</label>
            <input
              type="file"
              multiple
              onChange={(e) => setData("images", Array.from(e.target.files))}
              className="input"
            />
            {errors.images && (
              <div className="text-red-500 text-sm">{errors.images}</div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {processing ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
