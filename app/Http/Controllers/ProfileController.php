<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\ProfileImage;
use App\Models\ProfileVideo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $role = $request->query('role', 'islamic_center'); // Default role

        $profile = Profile::with('images')->with('video')
            ->where('user_id', $user->id)
            ->where('role', $role)
            ->first();

        return Inertia::render('IslamicCenter/Profile/Index', [
            'profile' => $profile,
            'role' => $role,
            'baseUrl' => config('app.url'),
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $role = $request->role;

        // Check if profile already exists and has images
        $existingProfile = Profile::where('user_id', $user->id)
            ->where('role', $role)
            ->first();
        
        $hasExistingImages = $existingProfile ? $existingProfile->images()->count() > 0 : false;

        // Calculate how many images will remain after deletion
        $remainingImages = 0;
        if ($hasExistingImages && $request->filled('deleted_images')) {
            $totalExistingImages = $existingProfile->images()->count();
            $deletedCount = count($request->deleted_images);
            $remainingImages = $totalExistingImages - $deletedCount;
        } elseif ($hasExistingImages) {
            $remainingImages = $existingProfile->images()->count();
        }

        // Debug: Log what's being sent
        Log::info('Profile Store Request', [
            'hasExistingProfile' => $existingProfile ? true : false,
            'hasExistingImages' => $hasExistingImages,
            'remainingImages' => $remainingImages,
            'deleted_images' => $request->deleted_images,
            'images' => $request->has('images') ? count($request->file('images', [])) : 'not set',
            'hasFiles' => $request->hasFile('images'),
        ]);

        $request->validate([
            'role' => 'required|string',
            'vendor_name' => 'required|string|max:255',
            'pic_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone_number' => 'required|string|max:20',
            'bank_account' => 'required|string|max:255',
            'bank_name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'instagram_handle' => 'nullable|string|max:255',
            'facebook_handle' => 'nullable|string|max:255',
            'tiktok_handle' => 'nullable|string|max:255',
            'address_line' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'postcode' => 'required|string|max:20',
            'images' => ($remainingImages > 0 || $request->hasFile('images')) ? 'nullable|array' : 'required|array|min:1',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'uuid',
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:10240',
            'delete_video' => 'nullable|boolean',
        ]);

        // Use updateOrCreate to handle both create and update
        $profile = Profile::updateOrCreate(
            [
                'user_id' => $user->id,
                'role' => $role,
            ],
            [
                'vendor_name' => $request->vendor_name,
                'pic_name' => $request->pic_name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'bank_account' => $request->bank_account,
                'bank_name' => $request->bank_name,
                'bio' => $request->bio,
                'instagram_handle' => $request->instagram_handle,
                'facebook_handle' => $request->facebook_handle,
                'tiktok_handle' => $request->tiktok_handle,
                'address_line' => $request->address_line,
                'city' => $request->city,
                'state' => $request->state,
                'country' => $request->country,
                'postcode' => $request->postcode,
            ]
        );

        // Handle deleted images
        if ($request->filled('deleted_images')) {
            $deletedIds = $request->deleted_images;
            $imagesToDelete = ProfileImage::whereIn('id', $deletedIds)->get();

            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        // Handle new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('profiles/profile_images', 'public');
                ProfileImage::create([
                    'profile_id' => $profile->id,
                    'image_path' => $path,
                ]);
            }
        }

        // Handle video deletion
        if ($request->boolean('delete_video')) {
            if ($profile->video) {
                Storage::disk('public')->delete($profile->video->video_path);
                $profile->video->delete();
            }
        }

        // Handle new video upload
        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $path = $video->store('profiles/profile_videos', 'public');

            // Delete existing video if any
            if ($profile->video) {
                Storage::disk('public')->delete($profile->video->video_path);
                $profile->video->delete();
            }

            ProfileVideo::create([
                'profile_id' => $profile->id,
                'video_path' => $path,
            ]);
        }

        return redirect()->route('profile.index')->with('success', 'Profile saved successfully.');
    }

    public function update(Request $request, Profile $profile)
    {
        $hasExistingImages = $profile->images()->count() > 0;

        // Debug: Log what's being sent
        Log::info('Profile Update Request', [
            'hasExistingImages' => $hasExistingImages,
            'images' => $request->has('images') ? count($request->file('images', [])) : 'not set',
            'deleted_images' => $request->deleted_images,
            'hasFiles' => $request->hasFile('images'),
        ]);

        // Custom validation for images based on existing images and request data
        $imageValidation = 'nullable|array';
        if (!$hasExistingImages) {
            $imageValidation = 'required|array|min:1';
        }

        $request->validate([
            'vendor_name' => 'required|string|max:255',
            'pic_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone_number' => 'required|string|max:20',
            'bank_account' => 'required|string|max:255',
            'bank_name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'instagram_handle' => 'nullable|string|max:255',
            'facebook_handle' => 'nullable|string|max:255',
            'tiktok_handle' => 'nullable|string|max:255',
            'address_line' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'postcode' => 'required|string|max:20',
            'images' => $imageValidation,
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'uuid',
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:10240',
            'delete_video' => 'nullable|boolean',
        ]);

        $profile->update([
            'vendor_name' => $request->vendor_name,
            'pic_name' => $request->pic_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'bank_account' => $request->bank_account,
            'bank_name' => $request->bank_name,
            'bio' => $request->bio,
            'instagram_handle' => $request->instagram_handle,
            'facebook_handle' => $request->facebook_handle,
            'tiktok_handle' => $request->tiktok_handle,
            'address_line' => $request->address_line,
            'city' => $request->city,
            'state' => $request->state,
            'country' => $request->country,
            'postcode' => $request->postcode,
        ]);

        // Delete removed images
        if ($request->filled('deleted_images')) {
            $deletedIds = $request->deleted_images;
            $imagesToDelete = ProfileImage::whereIn('id', $deletedIds)->get();

            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        // Handle new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('profiles/profile_images', 'public');
                ProfileImage::create([
                    'profile_id' => $profile->id,
                    'image_path' => $path,
                ]);
            }
        }

        // Handle video deletion
        if ($request->boolean('delete_video')) {
            if ($profile->video) {
                Storage::disk('public')->delete($profile->video->video_path);
                $profile->video->delete();
            }
        }

        // Handle new video upload
        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $path = $video->store('profiles/profile_videos', 'public');

            ProfileVideo::create([
                'profile_id' => $profile->id,
                'video_path' => $path,
            ]);
        }

        return redirect()->route('profile.index', ['role' => $profile->role])->with('success', 'Profile updated successfully.');
    }

    public function show(Profile $profile)
    {
        $profile->load(['images', 'video']);

        return Inertia::render('IslamicCenter/Profile/Show', [
            'profile' => $profile,
            'baseUrl' => config('app.url'),
        ]);
    }
}
