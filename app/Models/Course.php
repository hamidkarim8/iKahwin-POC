<?php

namespace App\Models;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
        'title',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'description',
        'address_line',
        'city',
        'state',
        'postcode',
        'price',
        'max_participants',
        'is_full',
        'status',
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

    public function images()
    {
        return $this->hasMany(CourseImage::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
