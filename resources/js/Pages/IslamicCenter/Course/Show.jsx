import React from "react";
import { Link } from "@inertiajs/react";
import PageMeta from "@/Components/common/PageMeta";
import PageBreadcrumb from "@/Components/common/PageBreadCrumb";
import Carousel from "@/Components/common/Carousel";
import { formatDateDMY } from "@/Components/common/dateUtils";
import { useState } from "react";

function CalendarSchedule({ schedules }) {
  if (!schedules || schedules.length === 0)
    return <div className="text-gray-500">No schedule available.</div>;
  // Get all dates in YYYY-MM-DD
  const days = schedules.map((s) => s.date);
  // Get min/max for calendar range
  const minDate = days.reduce((a, b) => (a < b ? a : b), days[0]);
  const maxDate = days.reduce((a, b) => (a > b ? a : b), days[0]);
  const start = new Date(minDate);
  const end = new Date(maxDate);
  // Helper to get schedule for a date
  const getScheduleForDate = (date) => schedules.find((s) => s.date === date);
  // Build calendar for each month in the range
  const months = [];
  let monthCursor = new Date(start.getFullYear(), start.getMonth(), 1);
  while (monthCursor <= end) {
    months.push(new Date(monthCursor));
    monthCursor.setMonth(monthCursor.getMonth() + 1);
  }
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: "" });
  return (
    <div className="flex flex-col gap-6">
      {months.map((monthDate, mIdx) => {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        const monthName = monthDate.toLocaleString("default", {
          month: "long",
        });
        // Days in this month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        // First day of week (0=Sun)
        const firstDay = new Date(year, month, 1).getDay();
        // Build grid
        const grid = [];
        for (let i = 0; i < firstDay; i++) grid.push(null);
        for (let i = 1; i <= daysInMonth; i++) {
          const dateStr = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(i).padStart(2, "0")}`;
          grid.push(dateStr);
        }
        return (
          <div key={mIdx} className="w-full max-w-md mx-auto">
            <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2 text-center">
              {monthName} {year}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2 text-xs text-gray-500">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center relative">
              {grid.map((date, idx) => {
                const sched = getScheduleForDate(date);
                return (
                  <div
                    key={idx}
                    className={
                      date && days.includes(date)
                        ? "bg-blue-500 text-white rounded font-bold cursor-pointer relative shadow"
                        : date
                        ? "text-gray-800 dark:text-gray-200"
                        : ""
                    }
                    style={{ padding: "10px 0" }}
                    onMouseEnter={
                      sched
                        ? (e) => {
                            const rect = e.target.getBoundingClientRect();
                            setTooltip({
                              show: true,
                              x: rect.left + rect.width / 2,
                              y: rect.top,
                              text: `${formatDateDMY(date)}: ${
                                sched.start_time
                              } - ${sched.end_time}`,
                            });
                          }
                        : undefined
                    }
                    onMouseLeave={
                      sched
                        ? () =>
                            setTooltip({ show: false, x: 0, y: 0, text: "" })
                        : undefined
                    }
                  >
                    {date ? parseInt(date.slice(-2), 10) : ""}
                    {/* Tooltip */}
                    {tooltip.show &&
                      tooltip.text ===
                        `${formatDateDMY(date)}: ${sched?.start_time} - ${
                          sched?.end_time
                        }` && (
                        <div
                          style={{
                            position: "fixed",
                            left: tooltip.x,
                            top: tooltip.y - 36,
                            zIndex: 9999,
                          }}
                          className="bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg pointer-events-none"
                        >
                          {tooltip.text}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* Move legend here so it only prints once */}
      <div className="flex items-center gap-2 mt-2 justify-center">
        <span className="inline-block w-4 h-4 bg-blue-500 rounded mr-1"></span>
        <span className="text-xs text-gray-700 dark:text-gray-200">
          Scheduled day
        </span>
      </div>
    </div>
  );
}

export default function Show({ course, baseUrl }) {
  // Prepare images for carousel
  const images = (course.images || []).map((img, i) => ({
    src: img.image_path.startsWith("/storage")
      ? `${baseUrl}${img.image_path}`
      : `${baseUrl}/storage/${img.image_path}`,
    alt: `Course image ${i + 1}`,
  }));

  return (
    <div>
      <PageMeta
        title={`Course: ${course.title}`}
        description={course.description || "Course details and preview"}
      />
      <Link
        href={route("course.index")}
        className="inline-block mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition"
      >
        ← Back to Courses
      </Link>
      <PageBreadcrumb pageTitle="Course Preview" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12 dark:bg-gray-900 dark:border-gray-700">
        {/* Title & Status */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
            {course.title}
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                course.status === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
              }`}
            >
              {course.status}
            </span>
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Price:{" "}
            <span className="font-semibold text-gray-700 dark:text-white">
              RM {course.price}
            </span>
          </div>
        </div>
        {/* Carousel & Schedule Side by Side */}
        <div className="mb-8 flex flex-col md:flex-row gap-8 items-start">
          {/* Schedule & Details Card */}
          <div className="w-full md:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-blue-700 px-6 py-6 relative">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="text-blue-500"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm8 4V5H6v1H4v2h12V6h-2zm2 2H4v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" />
                </svg>
                <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">
                  Schedule
                </h3>
              </div>
              {/* <CalendarSchedule schedules={course.schedules} /> */}
              <div className="mt-6">
                <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-200">
                  Schedule Details
                </h4>
                <div className="text-xs text-gray-700 dark:text-gray-200 space-y-1 mb-4">
                  {course.schedules && course.schedules.length > 0 ? (
                    course.schedules.map((sched) => (
                      <div key={sched.id || sched.date}>
                        {formatDateDMY(sched.date)}: {sched.start_time} -{" "}
                        {sched.end_time}
                      </div>
                    ))
                  ) : (
                    <div>-</div>
                  )}
                </div>
                <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-200">
                  Venue and Additional Details
                </h4>
                {/* Additional course info */}
                <div className="text-xs text-gray-700 dark:text-gray-200 space-y-1 mb-4">
                  <div>
                    <span className="font-semibold">Max Participants:</span>{" "}
                    {course.max_participants}
                  </div>
                  <div>
                    <span className="font-semibold">City:</span> {course.city}
                  </div>
                  <div>
                    <span className="font-semibold">State:</span> {course.state}
                  </div>
                  <div>
                    <span className="font-semibold">Postcode:</span>{" "}
                    {course.postcode}
                  </div>
                  <div>
                    <span className="font-semibold">Address:</span>{" "}
                    {course.address_line}
                  </div>
                  <div>
                    <span className="font-semibold">Description:</span>{" "}
                    <div className="whitespace-pre-line text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 p-2 rounded mt-1">
                      {course.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Carousel & Video */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 justify-between">
            <div className="flex-1 flex flex-col justify-center">
              <Carousel images={images} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 px-4 py-4 mt-4">
              <h3 className="font-semibold mb-2 text-lg">Video</h3>
              {course.video && course.video.video_path ? (
                <video
                  controls
                  className="w-full max-w-md rounded border shadow mx-auto"
                  src={
                    course.video.video_path.startsWith("/storage")
                      ? `${baseUrl}${course.video.video_path}`
                      : `${baseUrl}/storage/${course.video.video_path}`
                  }
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="text-gray-500">No video available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
