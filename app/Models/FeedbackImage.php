<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class FeedbackImage extends Model
{
    use HasFactory;

    protected $table = 'feedback_images';

    protected $fillable = [
        'feedback_id',
        'image_path',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function feedback()
    {
        return $this->belongsTo(Feedback::class, 'feedback_id');
    }
} 