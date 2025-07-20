<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $courses = Course::with('images')
            ->where('created_by', $user->id)
            ->latest()
            ->get();

        return Inertia::render('IslamicCenter/Course/Index', [
            'courses' => $courses,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'start_time' => 'required',
            'end_time' => 'required',
            'description' => 'nullable|string',
            'address_line' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'postcode' => 'required|string',
            'price' => 'required|numeric',
            'max_participants' => 'required|integer|min:1',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $course = Course::create([
            'created_by' => auth()->id(),
            'title' => $request->title,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'description' => $request->description,
            'address_line' => $request->address_line,
            'city' => $request->city,
            'state' => $request->state,
            'postcode' => $request->postcode,
            'price' => $request->price,
            'max_participants' => $request->max_participants,
        ]);

        foreach ($request->file('images') as $image) {
            $path = $image->store('courses', 'public');
            CourseImage::create([
                'course_id' => $course->id,
                'image_path' => $path,
            ]);
        }

        return redirect()->route('course.index')->with('success', 'Course created successfully.');
    }

    public function update(Request $request, Course $course)
    {
        // $this->authorize('update', $course); // optional

        $request->validate([
            'description' => 'required|string',
            'address_line' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'postcode' => 'required|string',
            'status' => 'required|in:active,inactive',
            'images' => 'nullable|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $course->update([
            'description' => $request->description,
            'address_line' => $request->address_line,
            'city' => $request->city,
            'state' => $request->state,
            'postcode' => $request->postcode,
            'status' => $request->status,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('courses', 'public');
                CourseImage::create([
                    'course_id' => $course->id,
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()->route('course.index')->with('success', 'Course updated.');
    }

    public function destroy(Course $course)
    {
        if ($course->status !== 'inactive' || $course->participants_count > 0) {
            return back()->with('error', 'Course cannot be deleted.');
        }

        $course->images()->delete();
        $course->delete();

        return redirect()->route('course.index')->with('success', 'Course deleted.');
    }

    public function show(Course $course)
    {
        // $this->authorize('view', $course);

        $course->load('images');

        return Inertia::render('IslamicCenter/CourseDetail', [
            'course' => $course,
        ]);
    }
}
