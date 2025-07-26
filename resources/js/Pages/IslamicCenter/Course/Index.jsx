import { React, useState, useEffect } from "react";
import CreateCourseModal from "./Create";
import EditCourseModal from "./Edit";
import PageBreadcrumb from "@/Components/common/PageBreadCrumb";
import PageMeta from "@/Components/common/PageMeta";
import DeleteAlert from "@/Components/common/DeleteAlert";
import { Link } from "@inertiajs/react";
import { formatDateDMY } from "@/Components/common/dateUtils";

function CalendarPopup({ schedules, show }) {
  if (!show || !schedules || schedules.length === 0) return null;
  // Get all dates in YYYY-MM-DD
  const days = schedules.map((s) => s.date);
  // Get min/max for calendar range
  const minDate = days.reduce((a, b) => (a < b ? a : b), days[0]);
  const maxDate = days.reduce((a, b) => (a > b ? a : b), days[0]);
  const start = new Date(minDate);
  const end = new Date(maxDate);
  // Build calendar days
  const calendar = [];
  let d = new Date(start);
  while (d <= end) {
    calendar.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return (
    <div className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg p-3 text-xs text-gray-800 dark:text-gray-100 min-w-[180px]">
      <div className="font-semibold mb-1 text-blue-700 dark:text-blue-300">
        Scheduled Days
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendar.map((date) => (
          <div
            key={date}
            className={
              days.includes(date)
                ? "bg-blue-500 text-white rounded font-bold"
                : "text-gray-400"
            }
            style={{ padding: "2px 0" }}
          >
            {parseInt(date.slice(-2), 10)}
          </div>
        ))}
      </div>
      <div className="mt-2 text-gray-500">
        {formatDateDMY(minDate)} - {formatDateDMY(maxDate)}
      </div>
    </div>
  );
}

function ScheduleTooltip({ schedules }) {
  const [show, setShow] = useState(false);
  const [showCal, setShowCal] = useState(false);
  if (!schedules || schedules.length === 0) return <span>-</span>;
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      tabIndex={0}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      style={{ outline: "none" }}
    >
      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold cursor-pointer border border-blue-200">
        {schedules.length} {schedules.length === 1 ? "day" : "days"}
      </span>
      {show && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-max min-w-[180px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg p-3 text-xs text-gray-800 dark:text-gray-100">
          <div className="font-semibold mb-1 text-blue-700 dark:text-blue-300">
            Schedule
          </div>
          <ul className="space-y-1">
            {schedules.map((sched) => (
              <li
                key={sched.id || sched.date}
                className="flex gap-2 items-center"
              >
                <span className="font-mono">{formatDateDMY(sched.date)}</span>
                <span className="text-gray-500">
                  {sched.start_time} - {sched.end_time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <span
        className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700"
        onMouseEnter={() => setShowCal(true)}
        onMouseLeave={() => setShowCal(false)}
        tabIndex={0}
        onFocus={() => setShowCal(true)}
        onBlur={() => setShowCal(false)}
        aria-label="Show calendar"
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm8 4V5H6v1H4v2h12V6h-2zm2 2H4v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" />
        </svg>
      </span>
      <CalendarPopup schedules={schedules} show={showCal} />
    </div>
  );
}

function CalendarModal({ schedules, open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: "" });
  if (!open || !schedules || schedules.length === 0) return null;
  // Get all dates in YYYY-MM-DD
  const days = schedules.map((s) => s.date);
  // Get min/max for calendar range
  const minDate = days.reduce((a, b) => (a < b ? a : b), days[0]);
  const maxDate = days.reduce((a, b) => (a > b ? a : b), days[0]);
  const start = new Date(minDate);
  const end = new Date(maxDate);
  // Build calendar days
  const calendar = [];
  let d = new Date(start);
  while (d <= end) {
    calendar.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  // Get month/year for header
  const month = start.toLocaleString("default", { month: "long" });
  const year = start.getFullYear();
  // Find first day of week (0=Sun)
  const firstDay = new Date(start.getFullYear(), start.getMonth(), 1).getDay();
  // Build calendar grid for the month
  const daysInMonth = new Date(
    start.getFullYear(),
    start.getMonth() + 1,
    0
  ).getDate();
  const grid = [];
  for (let i = 0; i < firstDay; i++) grid.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${start.getFullYear()}-${String(
      start.getMonth() + 1
    ).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    grid.push(dateStr);
  }
  // Helper to get schedule for a date
  const getScheduleForDate = (date) => schedules.find((s) => s.date === date);
  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 min-w-[320px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
          {month} {year}
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
                    ? "bg-blue-500 text-white rounded font-bold cursor-pointer relative"
                    : date
                    ? "text-gray-800 dark:text-gray-200"
                    : ""
                }
                style={{ padding: "4px 0" }}
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
                    ? () => setTooltip({ show: false, x: 0, y: 0, text: "" })
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
        <div className="mt-2 text-gray-500 text-xs">
          Scheduled days are highlighted
        </div>
      </div>
    </div>
  );
}

export default function Index({ courses, baseUrl}) {
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [calendarCourse, setCalendarCourse] = useState(null);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
  }, [showModal]);

  return (
    <div>
      <PageMeta title="Course Management" description="Course Management" />
      <PageBreadcrumb pageTitle="Course Management" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12 dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            All Course Sessions
          </h2>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
          >
            + Create Course
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Price (RM)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Max Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white align-top">
                    <div className="flex items-center gap-2">
                      <Link
                        href={route("course.show", course.id)}
                        className="text-blue-600 hover:underline"
                      >
                        {course.title}
                      </Link>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        title="Show calendar"
                        onClick={() => setCalendarCourse(course)}
                        type="button"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm8 4V5H6v1H4v2h12V6h-2zm2 2H4v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 align-top">
                    <div className="flex flex-col gap-1 mt-1">
                      {course.schedules && course.schedules.length > 0 ? (
                        course.schedules.map((sched) => (
                          <span
                            key={sched.id || sched.date}
                            className="block font-mono"
                          >
                            {formatDateDMY(sched.date)}: {sched.start_time} -{" "}
                            {sched.end_time}
                          </span>
                        ))
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 align-top">
                    {course.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 align-top">
                    {course.max_participants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 align-top">
                    {course.created_at ? formatDateDMY(course.created_at) : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm align-top">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        course.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white align-top">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCourse(course);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <DeleteAlert
                        routeName="course.destroy"
                        resourceId={course.id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <CreateCourseModal onClose={() => setShowModal(false)} />}
      {showEditModal && editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setShowEditModal(false)}
          baseUrl={baseUrl}
        />
      )}
      {calendarCourse && (
        <CalendarModal
          schedules={calendarCourse.schedules}
          open={!!calendarCourse}
          onClose={() => setCalendarCourse(null)}
        />
      )}
    </div>
  );
}
