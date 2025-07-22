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
    Schema::create('courses', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
        $table->string('title');
        $table->date('start_date');
        $table->date('end_date');
        // $table->time('start_time');
        // $table->time('end_time');
        $table->text('description')->nullable();

        // Structured address fields
        $table->string('address_line');
        $table->string('city');
        $table->string('state');
        $table->string('postcode');

        $table->decimal('price', 8, 2);
        $table->unsignedInteger('max_participants');
        $table->boolean('is_full')->default(false);
        $table->enum('status', ['active', 'inactive'])->default('active');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
