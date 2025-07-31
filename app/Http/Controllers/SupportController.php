<?php

namespace App\Http\Controllers;

use App\Models\Support;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SupportController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
            'type' => 'required|in:support,maintenance,bug_report,feature_request',
            'priority' => 'required|in:low,medium,high,urgent',
        ]);

        $support = Support::create([
            'user_id' => auth()->id(),
            'subject' => $request->subject,
            'message' => $request->message,
            'type' => $request->type,
            'priority' => $request->priority,
        ]);

        // Mail::to('ikahwinsupport@gmail.com')->send(new SupportTicketCreated($support));

        return redirect()->back()->with('success', 'Your support request has been submitted successfully. We will review it within 24 hours and respond via email.');
    }
} 