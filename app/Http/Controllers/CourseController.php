<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseImage;
use App\Models\CourseVideo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $courses = Course::with('images')->with('video')
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
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:10240', // max 10MB
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
            $path = $image->store('courses/course_images', 'public');
            CourseImage::create([
                'course_id' => $course->id,
                'image_path' => $path,
            ]);
        }

        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $path = $video->store('courses/course_videos', 'public');

            CourseVideo::create([
                'course_id' => $course->id,
                'video_path' => $path,
            ]);
        }

        return redirect()->route('course.index')->with('success', 'Course created successfully.');
    }

    public function update(Request $request, Course $course)
    {
        $hasExistingImages = $course->images()->count() > 0;

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
            'images' => $hasExistingImages ? 'nullable|array' : 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'uuid',
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:10240',
            'status' => 'required|in:active,inactive',
        ]);

        $course->update([
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
            'status' => $request->status,
        ]);


        // Delete removed images
        if ($request->filled('deleted_images')) {
            $deletedIds = $request->deleted_images;
            $imagesToDelete = CourseImage::whereIn('id', $deletedIds)->get();

            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        // Store new uploaded images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('courses/course_images', 'public');
                CourseImage::create([
                    'course_id' => $course->id,
                    'image_path' => $path,
                ]);
            }
        }


        // 🔁 Handle video deletion
        if ($request->boolean('delete_video')) {
            if ($course->video) {
                Storage::disk('public')->delete($course->video->video_path);
                $course->video->delete();
            }
        }

        // 🔁 Handle new video upload
        if ($request->hasFile('video')) {
            $path = $request->file('video')->store('courses/course_videos', 'public');

            CourseVideo::updateOrCreate(
                ['course_id' => $course->id],
                ['video_path' => $path]
            );
        }

        return redirect()->route('course.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        foreach ($course->images as $image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        if ($course->video) {
            Storage::disk('public')->delete($course->video->video_path);
            $course->video->delete();
        }

        $course->delete();

        return redirect()->route('course.index')->with('success', 'Course deleted successfully.');
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
