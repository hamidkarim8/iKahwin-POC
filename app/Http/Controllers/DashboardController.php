<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Models\Course;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Get current month courses count
        $currentMonthCourses = Course::where('created_by', $user->id)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        // Get last month courses count
        $lastMonthCourses = Course::where('created_by', $user->id)
            ->whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->count();

        // Calculate the difference
        $coursesDifference = $currentMonthCourses - $lastMonthCourses;
        $coursesDifferenceText = $coursesDifference >= 0 ? "+{$coursesDifference}" : "{$coursesDifference}";

        // Get total courses for display
        $totalCourses = Course::where('created_by', $user->id)->count();

        if ($user->role === 'islamicCenter') {
            return inertia(
                'IslamicCenter/Dashboard',
                [
                    'totalCourses' => $totalCourses,
                    'coursesDifference' => $coursesDifferenceText,
                ]
            );
        }
        return inertia(
            'Blank'
        );
    }
}
