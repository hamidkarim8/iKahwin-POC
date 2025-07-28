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
        Schema::create('profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('role'); // islamic_center, vendor, etc.
            
            // General Information
            $table->string('vendor_name');
            $table->string('pic_name');
            $table->string('email');
            $table->string('phone_number');
            $table->string('bank_account');
            $table->string('bank_name');
            $table->text('bio')->nullable();
            
            // Social Media
            $table->string('instagram_handle')->nullable();
            $table->string('facebook_handle')->nullable();
            $table->string('tiktok_handle')->nullable();
            
            // Address Information
            $table->string('address_line');
            $table->string('city');
            $table->string('state');
            $table->string('country');
            $table->string('postcode');
            
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
}; 