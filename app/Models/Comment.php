<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'comment';
    protected $fillable = [
        'comment_id',
        'unix_time_start',
        'unix_time_stop',
        'comment_data',
        'datetime'

    ];
    public $timestamps = false;
}