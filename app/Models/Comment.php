<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'comment';
    protected $fillable = [
        'id_comment',
        'id_activity',
        'activity_type',
        'comment_des',
        'comment_datetime'

    ];
    public $timestamps = false;
}