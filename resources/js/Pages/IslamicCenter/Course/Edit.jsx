import React, { useEffect, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import DropzoneImageEdit from "@/Components/DropzoneImageEdit";
import DropzoneVideoEdit from "@/Components/DropzoneVideoEdit";
import Switch from "@/Components/form/switch/Switch";
import { formatDateDMY } from "@/Components/common/dateUtils";
import { showUpdateAlert } from "@/Components/common/UpdateAlert";

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

export default function EditCourseModal({ onClose, course }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "PUT",
    title: course.title || "",
    start_date: course.start_date || "",
    end_date: course.end_date || "",
    description: course.description || "",
    address_line: course.address_line || "",
    city: course.city || "",
    state: course.state || "",
    postcode: course.postcode || "",
    price: course.price || "",
    max_participants: course.max_participants || "",
    status: course.status || "active",
    images: [],
    deleted_images: [],
    video: null,
    delete_video: false,
    schedules: course.schedules
      ? course.schedules.map((s) => ({
          date: s.date ? s.date.slice(0, 10) : "", // Ensures YYYY-MM-DD
          start_time: s.start_time,
          end_time: s.end_time,
        }))
      : [],
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
    post(route("course.update", course.id), {
      onSuccess: () => {
        showUpdateAlert('course');
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh] dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit Course
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
              />
              {errors.start_date && (
                <div className="text-red-500 text-sm">{errors.start_date}</div>
              )}
            </div>

            <div>
              <label className="label">End Date</label>
              <input
                type="date"
                min={data.start_date}
                value={data.end_date}
                onChange={(e) => setData("end_date", e.target.value)}
                className="input"
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
            <label className="label">Status</label>
            <Switch
              label={data.status === "active" ? "Active" : "Inactive"}
              defaultChecked={data.status === "active"}
              onChange={(checked) =>
                setData("status", checked ? "active" : "inactive")
              }
              color="blue"
            />
            {errors.status && (
              <div className="text-red-500 text-sm">{errors.status}</div>
            )}
          </div>

          <DropzoneImageEdit
            data={data}
            setData={setData}
            errors={errors}
            existingImages={course.images}
          />

          <DropzoneVideoEdit
            data={data}
            setData={setData}
            error={errors.video}
            existingVideo={course.video}
          />

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
              {processing ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
