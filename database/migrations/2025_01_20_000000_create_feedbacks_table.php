<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('vendor_id')->constrained('users')->onDelete('cascade');
            $table->text('comments')->nullable();
            $table->tinyInteger('stars')->unsigned()->check('stars >= 1 AND stars <= 5');
            $table->enum('status', ['display', 'no_display'])->default('no_display');
            $table->boolean('is_anonymous')->default(false);
            $table->string('user_display_name')->nullable();
            $table->timestamps();
            //need to add a column for the booking id
           // $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedbacks');
    }
}; 