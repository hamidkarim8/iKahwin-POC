<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HandleIISMethodOverride
{
    public function handle(Request $request, Closure $next)
    {
        // Check if this is a DELETE request that IIS might have converted
        if ($request->method() === 'POST' && $request->has('_method')) {
            $request->setMethod($request->input('_method'));
        }
        
        // Also check for X-HTTP-Method-Override header
        if ($request->header('X-HTTP-Method-Override')) {
            $request->setMethod($request->header('X-HTTP-Method-Override'));
        }
        
        return $next($request);
    }
} 