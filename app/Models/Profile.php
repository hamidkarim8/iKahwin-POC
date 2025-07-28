<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'role',
        'vendor_name',
        'pic_name',
        'email',
        'phone_number',
        'bank_account',
        'bank_name',
        'bio',
        'instagram_handle',
        'facebook_handle',
        'tiktok_handle',
        'address_line',
        'city',
        'state',
        'country',
        'postcode',
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(ProfileImage::class);
    }

    public function video()
    {
        return $this->hasOne(ProfileVideo::class);
    }

    // Scope for different roles
    public function scopeByRole($query, $role)
    {
        return $query->where('role', $role);
    }
} 