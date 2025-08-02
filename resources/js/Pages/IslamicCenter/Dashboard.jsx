import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import ReactApexChart from "react-apexcharts";
import { 
  Calendar, 
  Download, 
  Filter, 
  TrendingUp, 
  Users, 
  Star,
  Banknote,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { format, subMonths, startOfMonth, endOfMonth, eachMonthOfInterval } from "date-fns";
import PageBreadcrumb from "@/Components/common/PageBreadCrumb";
import PageMeta from "@/Components/common/PageMeta";

export default function Dashboard({ auth, totalCourses, totalFeedbacks = 0, coursesDifference = "+0" }) {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  // Full dataset for filtering
  const fullRevenueData = [
    { month: "Jan", revenue: 12000, bookings: 45, year: 2025 },
    { month: "Feb", revenue: 15000, bookings: 52, year: 2025 },
    { month: "Mar", revenue: 18000, bookings: 68, year: 2025 },
    { month: "Apr", revenue: 22000, bookings: 75, year: 2025 },
    { month: "May", revenue: 25000, bookings: 82, year: 2025 },
    { month: "Jun", revenue: 28000, bookings: 90, year: 2025 },
    { month: "Jul", revenue: 32000, bookings: 95, year: 2025 },
    { month: "Aug", revenue: 35000, bookings: 105, year: 2025 },
    { month: "Sep", revenue: 38000, bookings: 112, year: 2025 },
    { month: "Oct", revenue: 42000, bookings: 125, year: 2025 },
    { month: "Nov", revenue: 45000, bookings: 135, year: 2025 },
    { month: "Dec", revenue: 48000, bookings: 145, year: 2025 },

    { month: "Jan", revenue: 12000, bookings: 45, year: 2024 },
    { month: "Feb", revenue: 15000, bookings: 52, year: 2024 },
    { month: "Mar", revenue: 18000, bookings: 68, year: 2024 },
    { month: "Apr", revenue: 22000, bookings: 75, year: 2024 },
    { month: "May", revenue: 25000, bookings: 82, year: 2024 },
    { month: "Jun", revenue: 28000, bookings: 90, year: 2024 },
    { month: "Jul", revenue: 32000, bookings: 95, year: 2024 },
    { month: "Aug", revenue: 35000, bookings: 105, year: 2024 },
    { month: "Sep", revenue: 38000, bookings: 112, year: 2024 },
    { month: "Oct", revenue: 42000, bookings: 125, year: 2024 },
    { month: "Nov", revenue: 45000, bookings: 135, year: 2024 },
    { month: "Dec", revenue: 48000, bookings: 145, year: 2024 },
    // Previous year data
    { month: "Jan", revenue: 10000, bookings: 35, year: 2023 },
    { month: "Feb", revenue: 12000, bookings: 42, year: 2023 },
    { month: "Mar", revenue: 15000, bookings: 58, year: 2023 },
    { month: "Apr", revenue: 18000, bookings: 65, year: 2023 },
    { month: "May", revenue: 20000, bookings: 72, year: 2023 },
    { month: "Jun", revenue: 22000, bookings: 80, year: 2023 },
    { month: "Jul", revenue: 25000, bookings: 85, year: 2023 },
    { month: "Aug", revenue: 28000, bookings: 95, year: 2023 },
    { month: "Sep", revenue: 30000, bookings: 102, year: 2023 },
    { month: "Oct", revenue: 32000, bookings: 115, year: 2023 },
    { month: "Nov", revenue: 35000, bookings: 125, year: 2023 },
    { month: "Dec", revenue: 38000, bookings: 135, year: 2023 },
  ];

  // Filter data based on selected filters
  const getFilteredRevenueData = () => {
    let filteredData = fullRevenueData;

    // Filter by year
    if (selectedYear) {
      filteredData = filteredData.filter(item => item.year === parseInt(selectedYear));
    }

    // Filter by period
    if (selectedPeriod === "6months") {
      const currentMonth = new Date().getMonth();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const last6Months = months.slice(Math.max(0, currentMonth - 5), currentMonth + 1);
      filteredData = filteredData.filter(item => last6Months.includes(item.month));
    } else if (selectedPeriod === "12months") {
      // Show all months for current year
      filteredData = filteredData.filter(item => item.year === parseInt(selectedYear));
    } else if (selectedPeriod === "year") {
      // Show current year data
      filteredData = filteredData.filter(item => item.year === new Date().getFullYear());
    } else if (selectedPeriod === "custom") {
      // Custom date range filtering
      if (customStartDate && customEndDate) {
        const startDate = new Date(customStartDate);
        const endDate = new Date(customEndDate);
        
        filteredData = filteredData.filter(item => {
          const itemDate = new Date(item.year, getMonthIndex(item.month), 1);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
    }

    // Filter by specific month if selected
    if (selectedMonth !== "") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const selectedMonthName = months[parseInt(selectedMonth)];
      filteredData = filteredData.filter(item => item.month === selectedMonthName);
    }

    return filteredData;
  };

  // Helper function to get month index
  const getMonthIndex = (monthName) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.indexOf(monthName);
  };

  const revenueData = getFilteredRevenueData();

  // Update booking data based on filters
  const getFilteredBookingData = () => {
    const totalBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0);
    const completed = Math.floor(totalBookings * 0.65);
    const pending = Math.floor(totalBookings * 0.25);
    const cancelled = totalBookings - completed - pending;
    
    return [
      { name: "Completed", value: completed, color: "#10B981" },
      { name: "Pending", value: pending, color: "#F59E0B" },
      { name: "Cancelled", value: cancelled, color: "#EF4444" },
    ];
  };

  const bookingData = getFilteredBookingData();

  // ApexCharts configuration for Revenue Chart
  const revenueChartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      }
    },
    series: [{
      name: 'Revenue (RM)',
      data: revenueData.map(item => item.revenue)
    }],
    xaxis: {
      categories: revenueData.map(item => item.month),
      labels: {
        style: {
          colors: '#9CA3AF'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return 'RM ' + value.toLocaleString();
        },
        style: {
          colors: '#9CA3AF'
        }
      }
    },
    colors: ['#10B981'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 6,
      colors: ['#10B981'],
      strokeColors: '#ffffff',
      strokeWidth: 2
    },
    grid: {
      borderColor: '#374151',
      strokeDashArray: 3
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function(value) {
          return 'RM ' + value.toLocaleString();
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 250
        }
      }
    }]
  };

  // ApexCharts configuration for Booking Chart
  const bookingChartOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: true,
        tools: {
          download: true,
        }
      }
    },
    series: bookingData.map(item => item.value),
    labels: bookingData.map(item => item.name),
    colors: bookingData.map(item => item.color),
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function(value) {
          return value + ' bookings';
        }
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: '#9CA3AF'
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 250
        }
      }
    }]
  };

  const feedbackData = [
    { id: 1, user: "Ahmad Ali", rating: 5, comment: "Excellent course! Very informative and well-structured.", date: "2024-01-15" },
    { id: 2, user: "Sara Mohamed", rating: 4, comment: "Great content and knowledgeable instructor.", date: "2024-01-14" },
    { id: 3, user: "Omar Hassan", rating: 5, comment: "Highly recommended for anyone interested in Islamic studies.", date: "2024-01-13" },
    { id: 4, user: "Fatima Zahra", rating: 4, comment: "The course exceeded my expectations. Very practical.", date: "2024-01-12" },
    { id: 5, user: "Yusuf Ibrahim", rating: 5, comment: "Amazing experience! Will definitely enroll in more courses.", date: "2024-01-11" },
  ];

  const recentCourses = [
    { id: 1, title: "Advanced Islamic Finance", participants: 25, status: "Active", revenue: 12500 },
    { id: 2, title: "Quranic Studies", participants: 18, status: "Active", revenue: 9000 },
    { id: 3, title: "Islamic History", participants: 32, status: "Active", revenue: 16000 },
    { id: 4, title: "Arabic Language", participants: 15, status: "Upcoming", revenue: 7500 },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div>
      <PageMeta title="Dashboard" description="Islamic Center Dashboard" />
      <PageBreadcrumb pageTitle="Dashboard" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12 dark:bg-gray-900 dark:border-gray-700">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {auth?.user?.name || "Admin"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor your courses, bookings, revenue, and feedback at a glance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Courses */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold">{totalCourses || 0}</p>
                <p className="text-blue-100 text-sm mt-1">{coursesDifference} from last month</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          {/* Total Bookings */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold">1,247</p>
                <p className="text-green-100 text-sm mt-1">+15% from last month</p>
              </div>
              <Users className="w-12 h-12 text-green-200" />
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold">RM 48,500</p>
                <p className="text-purple-100 text-sm mt-1">+8% from last month</p>
              </div>
              <Banknote className="w-12 h-12 text-purple-200" />
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Avg Rating</p>
                <p className="text-3xl font-bold">4.8</p>
                <p className="text-yellow-100 text-sm mt-1">+0.2 from last month</p>
              </div>
              <Star className="w-12 h-12 text-yellow-200 fill-current" />
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
                              {showFilters && (
                  <div className="flex flex-wrap items-center gap-4">
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="min-w-[180px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
                    >
                      <option value="6months">Last 6 Months</option>
                      <option value="12months">Last 12 Months</option>
                      <option value="year">This Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                    
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="min-w-[120px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
                    >
                      {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="min-w-[140px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
                    >
                      <option value="">All Months</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>
                          {new Date(2024, i).toLocaleDateString('en-US', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                    
                    {selectedPeriod === "custom" && (
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={customStartDate}
                          onChange={(e) => setCustomStartDate(e.target.value)}
                          className="min-w-[140px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
                          placeholder="Start Date"
                        />
                        <span className="text-gray-500 dark:text-gray-400 text-sm">to</span>
                        <input
                          type="date"
                          value={customEndDate}
                          onChange={(e) => setCustomEndDate(e.target.value)}
                          className="min-w-[140px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
                          placeholder="End Date"
                        />
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Monthly revenue trends</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <ReactApexChart 
              options={revenueChartOptions} 
              series={revenueChartOptions.series} 
              type="line" 
              height={350}
            />
          </div>

          {/* Bookings Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Booking Status</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Distribution of bookings</p>
              </div>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <ReactApexChart 
              options={bookingChartOptions} 
              series={bookingChartOptions.series} 
              type="donut" 
              height={350}
            />
          </div>
        </div>

        {/* Recent Courses and Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Courses</h3>
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {course.participants} participants
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {course.status}
                    </span>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                      RM {course.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Reviews */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Feedback</h3>
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {feedbackData.map((feedback) => (
                <div key={feedback.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{feedback.user}</h4>
                    <div className="flex items-center gap-1">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {feedback.comment}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {format(new Date(feedback.date), "MMM dd, yyyy")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
