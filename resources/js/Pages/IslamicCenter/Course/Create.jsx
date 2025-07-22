import { useForm } from "@inertiajs/react";
import DropzoneImage from "@/Components/DropzoneImage";
import DropzoneVideo from "@/Components/DropzoneVideo";
import { useState, useMemo } from "react";
import { formatDateDMY } from "@/Components/common/dateUtils";
import { showCreateAlert } from "@/Components/common/CreateAlert";

function getDatesInRange(start, end) {
  const dates = [];
  let current = new Date(start);
  const endDate = new Date(end);
  while (current <= endDate) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export default function Create({ onClose }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    start_date: "",
    end_date: "",
    description: "",
    address_line: "",
    city: "",
    state: "",
    postcode: "",
    price: "",
    max_participants: "",
    images: [],
    video: null,
    schedules: [],
  });

  const today = new Date().toISOString().split("T")[0];

  // Compute the list of dates between start_date and end_date
  const scheduleDates = useMemo(() => {
    if (!data.start_date || !data.end_date) return [];
    if (new Date(data.end_date) < new Date(data.start_date)) return [];
    return getDatesInRange(data.start_date, data.end_date);
  }, [data.start_date, data.end_date]);

  // Ensure schedules array matches the date range
  const schedules = useMemo(() => {
    return scheduleDates.map((date) => {
      const found = data.schedules.find((s) => s.date === date);
      return {
        date,
        start_time: found ? found.start_time : "",
        end_time: found ? found.end_time : "",
      };
    });
  }, [scheduleDates, data.schedules]);

  const handleScheduleChange = (date, field, value) => {
    setData((prev) => ({
      ...prev,
      schedules: schedules.map((s) =>
        s.date === date ? { ...s, [field]: value } : s
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, schedules }));
    post(route("course.store"), {
      onSuccess: () => {
        showCreateAlert('course');
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
                placeholder="Enter course title"
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
                placeholder="Enter price"
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
                  setData((prevData) => ({
                    ...prevData,
                    start_date: selectedDate,
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
                placeholder="Select start date"
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
                placeholder="Select end date"
              />
              {errors.end_date && (
                <div className="text-red-500 text-sm">{errors.end_date}</div>
              )}
            </div>

            <div>
              <label className="label">City</label>
              <input
                type="text"
                value={data.city}
                onChange={(e) => setData("city", e.target.value)}
                className="input"
                placeholder="Enter city"
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
                placeholder="Enter state"
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
                placeholder="Enter postcode"
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
                placeholder="Enter max participants"
              />
              {errors.max_participants && (
                <div className="text-red-500 text-sm">
                  {errors.max_participants}
                </div>
              )}
            </div>
          </div>

          {/* Schedule Section */}
          {scheduleDates.length > 0 && (
            <div className="mb-4">
              <label className="label font-semibold">Schedule</label>
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 border">Date</th>
                      <th className="px-2 py-1 border">Start Time</th>
                      <th className="px-2 py-1 border">End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map((sched, idx) => (
                      <tr key={sched.date}>
                        <td className="px-2 py-1 border text-center">
                          {formatDateDMY(sched.date)}
                        </td>
                        <td className="px-2 py-1 border">
                          <input
                            type="time"
                            value={sched.start_time}
                            onChange={(e) =>
                              handleScheduleChange(sched.date, "start_time", e.target.value)
                            }
                            className="input"
                            placeholder="Start time"
                          />
                          {errors[`schedules.${idx}.start_time`] && (
                            <div className="text-red-500 text-xs">
                              {errors[`schedules.${idx}.start_time`]}
                            </div>
                          )}
                        </td>
                        <td className="px-2 py-1 border">
                          <input
                            type="time"
                            value={sched.end_time}
                            onChange={(e) =>
                              handleScheduleChange(sched.date, "end_time", e.target.value)
                            }
                            className="input"
                            placeholder="End time"
                          />
                          {errors[`schedules.${idx}.end_time`] && (
                            <div className="text-red-500 text-xs">
                              {errors[`schedules.${idx}.end_time`]}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {errors.schedules && typeof errors.schedules === 'string' && (
                  <div className="text-red-500 text-sm mt-1">{errors.schedules}</div>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="label">Address Line</label>
            <input
              type="text"
              value={data.address_line}
              onChange={(e) => setData("address_line", e.target.value)}
              className="input"
              placeholder="Enter address line"
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
              placeholder="Enter course description"
            />
            {errors.description && (
              <div className="text-red-500 text-sm">{errors.description}</div>
            )}
          </div>

          <DropzoneImage data={data} setData={setData} errors={errors} />
          <DropzoneVideo data={data} setData={setData} errors={errors} />

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
