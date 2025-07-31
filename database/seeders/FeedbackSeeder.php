<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Feedback;
use App\Models\FeedbackImage;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds. php artisan db:seed --class=FeedbackSeeder
     */
    public function run(): void
    {
        // Get or create some users for testing
        $users = User::take(3)->get();
        
        if ($users->count() < 3) {
            // Create additional users if needed
            for ($i = $users->count(); $i < 3; $i++) {
                $users->push(User::create([
                    'name' => "Test User " . ($i + 1),
                    'email' => "testuser" . ($i + 1) . "@example.com",
                    'password' => bcrypt('password'),
                ]));
            }
        }

        // Get the first user as vendor (assuming this is the authenticated user)
        $vendor = $users->first();
        
        // Create 3 sample feedbacks
        $feedbacks = [
            [
                'user_id' => $users[1]->id,
                'vendor_id' => $vendor->id,
                'comments' => 'Excellent service! The Islamic center provided a wonderful learning environment. The teachers were very knowledgeable and patient. Highly recommend for anyone looking to learn about Islam.',
                'stars' => 5,
                'status' => 'display',
                'is_anonymous' => false,
                'user_display_name' => 'Ahmad Rahman',
            ],
            [
                'user_id' => $users[2]->id,
                'vendor_id' => $vendor->id,
                'comments' => 'Good experience overall. The facilities are clean and well-maintained. The courses are well-structured and informative. Would definitely come back for more classes.',
                'stars' => 4,
                'status' => 'no_display',
                'is_anonymous' => true,
                'user_display_name' => null,
            ],
            [
                'user_id' => $users->count() > 2 ? $users[2]->id : $users[1]->id,
                'vendor_id' => $vendor->id,
                'comments' => 'The center is very welcoming and the community is friendly. However, the parking could be better and some classes were a bit crowded. Still, I learned a lot and enjoyed my time here.',
                'stars' => 3,
                'status' => 'display',
                'is_anonymous' => false,
                'user_display_name' => 'Sarah Johnson',
            ],
        ];

        foreach ($feedbacks as $index => $feedbackData) {
            $feedback = Feedback::create($feedbackData);
            
            // Add sample images for some feedbacks
            if ($index < 2) { // Add images to first 2 feedbacks
                $imageCount = $index === 0 ? 3 : 2; // First feedback gets 3 images, second gets 2
                
                for ($i = 1; $i <= $imageCount; $i++) {
                    // Download a random image from Picsum Photos
                    $imageUrl = "https://picsum.photos/800/600?random=" . ($index * 10 + $i);
                    $imageName = "feedback-{$feedback->id}-image-{$i}.jpg";
                    $imagePath = "feedbacks/feedback_images/{$imageName}";
                    
                    try {
                        // Download the image
                        $response = Http::timeout(30)->get($imageUrl);
                        
                        if ($response->successful()) {
                            // Store the image
                            Storage::disk('public')->put($imagePath, $response->body());
                            
                            // Create the database record
                            FeedbackImage::create([
                                'feedback_id' => $feedback->id,
                                'image_path' => $imagePath,
                            ]);
                            
                            $this->command->info("Downloaded and saved image: {$imagePath}");
                        } else {
                            $this->command->warn("Failed to download image {$i} for feedback {$feedback->id}");
                        }
                    } catch (\Exception $e) {
                        $this->command->warn("Error downloading image {$i} for feedback {$feedback->id}: " . $e->getMessage());
                    }
                }
            }
        }

        $this->command->info('Feedbacks seeded successfully with sample images!');
    }
} 