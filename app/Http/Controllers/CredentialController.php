<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class CredentialController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        return Inertia::render('IslamicCenter/Credential/Index', [
            'user' => $user,
            'baseUrl' => config('app.url'),
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // Check if user is trying to change password
        $isChangingPassword = $request->filled('password') && $request->filled('password_confirmation');

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'current_password' => $isChangingPassword ? 'required|string' : 'nullable|string',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        // Validate current password only if changing password
        if ($isChangingPassword) {
            if (!Hash::check($request->current_password, $user->password)) {
                return back()->withErrors([
                    'current_password' => 'The current password is incorrect.'
                ]);
            }
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Update password only if provided and current password is correct
        if ($isChangingPassword) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return redirect()->route('credential.index')->with('success', 'Credentials updated successfully.');
    }
} 