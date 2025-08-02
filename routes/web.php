<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\CredentialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::prefix('course')->name('course.')->group(function () {
        Route::get('/', [CourseController::class, 'index'])->name('index');
        Route::post('/', [CourseController::class, 'store'])->name('store');
        Route::get('/{course}', [CourseController::class, 'show'])->name('show');
        Route::put('/{course}', [CourseController::class, 'update'])->name('update');
        Route::delete('/{course}', [CourseController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('feedback')->name('feedback.')->group(function () {
        Route::get('/', [FeedbackController::class, 'index'])->name('index');
        Route::get('/{feedback}', [FeedbackController::class, 'show'])->name('show');
        Route::post('/{feedback}', [FeedbackController::class, 'update'])->name('update');
        Route::delete('/{feedback}', [FeedbackController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('support')->name('support.')->group(function () {
        Route::post('/', [SupportController::class, 'store'])->name('store');
    });

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'index'])->name('index');
        Route::post('/', [ProfileController::class, 'store'])->name('store');
    });

    Route::prefix('credential')->name('credential.')->group(function () {
        Route::get('/', [CredentialController::class, 'index'])->name('index');
        Route::post('/', [CredentialController::class, 'store'])->name('store');
    });

    // Route::resource('project', ProjectController::class);
    // Route::get('/task/my-tasks', [TaskController::class, 'myTasks'])
    //     ->name('task.myTasks');
    // Route::resource('task', TaskController::class);
    // Route::resource('user', UserController::class);
});

Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
