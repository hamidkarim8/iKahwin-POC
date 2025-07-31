<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\FeedbackImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FeedbackController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $feedbacks = Feedback::with('images', 'user')
            ->where('vendor_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('IslamicCenter/Feedbacks/Index', [
            'feedbacks' => $feedbacks,
            'baseUrl' => config('app.url'),
        ]);
    }

    public function show(Feedback $feedback)
    {
        // Ensure the authenticated user is the vendor of this feedback
        if ($feedback->vendor_id !== auth()->id()) {
            abort(403);
        }

        $feedback->load('images', 'user');
        
        return Inertia::render('IslamicCenter/Feedbacks/Show', [
            'feedback' => $feedback,
            'baseUrl' => config('app.url'),
        ]);
    }

    public function update(Request $request, Feedback $feedback)
    {
        // Ensure the authenticated user is the vendor of this feedback
        if ($feedback->vendor_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:display,no_display',
        ]);

        $feedback->update([
            'status' => $request->status,
        ]);

        return redirect()->route('feedback.index')->with('success', 'Feedback status updated successfully.');
    }

    public function destroy(Feedback $feedback)
    {
        // Ensure the authenticated user is the vendor of this feedback
        if ($feedback->vendor_id !== auth()->id()) {
            abort(403);
        }

        // Delete associated images
        foreach ($feedback->images as $image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        $feedback->delete();

        return redirect()->route('feedback.index')->with('success', 'Feedback deleted successfully.');
    }
} 